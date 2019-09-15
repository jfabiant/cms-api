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

        // log.info("##### EXECUTE QUERY #####");
        // const resQuery = await pool.query('INSERT INTO persona SET ?', [new_person]);
        // console.log(resQuery);

        // if (resQuery[0]) {
        //     values = {
        //         "codRes": "00",
        //         "description": "Persona agregada satisfactoriamente"
        //     }
        // } else {
        //     values = {
        //         "codRes": "01",
        //         "description": "Error al agregar a la persona"
        //     }
        // }

        values = {
            message: "Post created"
        }


        res.json(values);

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

exports.postLogin = async (req, res) => {
    try {

        let values = null;

        log.info("### HEADERS ###")
        console.log(req.headers);

        log.info("### BODY ###")
        console.log(req.body);

        const user = {
            usuario: req.body.user,
            password: req.body.password
        }

        // JWT

        jwt.sign({ user: user }, 'secretKey', (err, token) => {
            if (err) throw err;
            values = {
                token
            }
            res.json(values)
        });

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};

exports.postProfile = async (req, res) => {
    try {

        const bearerHeader = req.headers['authorization'];

        if (typeof (bearerHeader) !== undefined) {

            // GET BEARER FROM HEADERS
            const bearer = bearerHeader.split(' ');

            // GET TOKEN FROM ARRAY
            const bearerToken = bearer[1];

            // SET THE TOKEN
            jwt.verify(bearerToken, 'secretKey', { expiresIn: '2 days' }, (err, authData) => {
                if (err) {
                    res.status(403).send("Forbidden");
                } else {
                    res.json({ message: "post created", authData });
                }
            })


        } else {
            //forbidden
            res.status(403).send("Forbidden");

        }

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
