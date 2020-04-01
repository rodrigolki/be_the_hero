const crypto = require("crypto");
const connection = require("../database/connection.js");

module.exports ={
    async create(req, res){
        const {nome, email, whatsapp, city, uf} = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id, nome, email, whatsapp, city, uf
        })

        return res.status(200).json({id});
    },

    async list(req, res){
    
        const ongs = await connection('ongs').select('*')
    
        return res.status(200).json(ongs);
    }
}

