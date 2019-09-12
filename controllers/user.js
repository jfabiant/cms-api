const pool = require('../utils/database');
const log = require('../utils/logger');

exports.postSignUpUser = async (req, res) => {
    try {

        let values = null;

        log.info("### HEADERS ###")
        console.log(req.headers);
        
        log.info("### BODY ###")
        console.log(req.body);

        const new_user = {
            login: req.body.login,
            password: req.body.password
        }

        // console.log("##### EXECUTE QUERY #####");
        // const resQuery = await pool.query('INSERT INTO users SET ?', [new_user]);
        // console.log(resQuery);

        // if (resQuery[0]) {
        //     values = {
        //         "codRes": "00",
        //         "description": "User added successfully"
        //     }
        // } else {
        //     values = {
        //         "codRes": "01",
        //         "description": "Error adding user"
        //     }
        // }

        // console.log("##### RES JSON #####");
        res.json({msg: "all ok"});

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};