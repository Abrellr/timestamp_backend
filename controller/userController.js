
exports.getOne =  (req, res, next) => {
    const { id } = req.params;
    client
        .query("SELECT * FROM users WHERE id=$1", [id])
        .then((data) => res.json(data.rows))
        
};

