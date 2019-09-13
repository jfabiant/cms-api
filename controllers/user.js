const pool = require('../utils/database');
const log = require('../utils/logger');
const jwt = require('jsonwebtoken');

exports.postSignUpUser = async (req, res) => {
    try {

        let values = null;

        log.info("### HEADERS ###")
        console.log(req.headers);
        
        log.info("### BODY ###")
        console.log(req.body);

        const new_person = {
            nombres: req.body.names,
            paterno: req.body.paternal,
            materno: req.body.maternal,
            edad: req.body.age,
            direccion: req.body.address,
            fecha_nacimiento: req.body.birthdate,
            email: req.body.email,
            usuario: req.body.user,
            password: req.body.password
        }

        log.info("##### EXECUTE QUERY #####");
        const resQuery = await pool.query('INSERT INTO persona SET ?', [new_person]);
        console.log(resQuery);

        if (resQuery[0]) {
            values = {
                "codRes": "00",
                "description": "Persona agregada satisfactoriamente"
            }
        } else {
            values = {
                "codRes": "01",
                "description": "Error al agregar a la persona"
            }
        }

        
        res.json(values);

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};