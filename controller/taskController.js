const client = require("../database/client");

//get all tasks
exports.getAll = (req, res) => {
  const sqlQuery = `
  SELECT task_name,  
  start_time,
  end_time, 
  AGE(end_time, start_time) AS total_time
  FROM tasks;
`;

  client
    .query(sqlQuery)
    .then((data) => res.json(data.rows))
    .catch((e) => console.log(e));
};

//get one task by task_id
exports.getOne = (req, res, next) => {
  const { task_id } = req.params;
  client
    .query("SELECT * FROM tasks WHERE task_id=$1", [task_id])
    .then((data) => res.json(data.rows))
    .catch((e) => console.log(e));
};

//get all tasks from one specific project_id
exports.innerJoinTask = (req, res, next) => {
  console.log("hey ho");
  const { project_id } = req.params;

  const sqlQuery = `
  SELECT 
  p.project_id, 
  p.project_name,
  p.project_create_at,
  t.task_id,
  t.task_name,
  t.start_time, 
  t.end_time,
  t.total_time,
  AGE(t.end_time, t.start_time) AS total_time 
  FROM projects p
  INNER JOIN tasks t
  ON p.project_id = t.project_id
  WHERE t.project_id=$1
  ORDER BY t.start_time;
    `;

  const parameters = [project_id];
  if (project_id) {
    client
      .query(sqlQuery, parameters)
      .then((data) => res.send(data.rows))
      .catch((e) => console.log(e.message));
  }
};

//create one task
exports.createTask = (req, res, next) => {
  const { project_id, task_name, start_time, end_time, total_time } = req.body;

  const sqlQuery = `
    INSERT INTO tasks(project_id, task_name,  start_time, end_time, total_time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const values = [project_id, task_name, start_time, end_time, total_time];
  client
    .query(sqlQuery, values)
    .then((data) => res.json(data.rows))
    .catch((err) => console.log(err));
};

//update user
exports.updateTask = (req, res, next) => {
  const { task_id } = req.params;
  const {
    project_id,
    task_name,
    start_time,
    end_time,
    break_time,
    total_time,
  } = req.body;

  if (
    !project_id ||
    !task_name ||
    !start_time ||
    !end_time ||
    !break_time ||
    !total_time
  )
    return res.send("update task controller gone bad");

  const sqlQuery = `
    UPDATE tasks
    SET project_id=$1,
    task_name=$2,
    start_time=$3,
    end_time=$4,
    break_time=$5,
    total_time=$6
    WHERE task_id=$7
    RETURNING *
    `;

  const values = [
    project_id,
    task_name,
    start_time,
    end_time,
    total_time,
    task_id,
  ];

  client
    .query(sqlQuery, values)
    .then((data) => res.json(data.rows))
    .catch((err) => {
      res.sendStatus("cannot update task");
    });
};

//delete one task
exports.deleteTask = (req, res, next) => {
  const { task_id } = req.params;
  const sqlQuery = `
    DELETE FROM tasks
    WHERE task_id=$1
    RETURNING *
    `;

  client
    .query(sqlQuery, [task_id])
    .then((data) => res.json(data.rows))
    .catch((err) => {
      res.sendStatus(500);
      console.log("delete not successful");
    });
};
