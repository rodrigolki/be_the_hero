const crypto = require("crypto");
const connection = require("../database/connection.js");

module.exports ={

    async list(req, res){
        const ong_id = req.headers.authorization;
    
        const ongs = await connection('incidents').where('ong_id', ong_id).select('*');
    
        return res.status(200).json(ongs);
    }
}

