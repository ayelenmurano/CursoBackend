const model = require('../models/sessions.js');

const log4js = require('../config/logger/log4jsConfig');
const loggs = log4js.getLogger('utils');

const readByUsername = (username) => {

    try {
        let user = model.findOne({username: username});
        loggs.debug(`user.js ${user}`);
        return user 
    } catch (error) {   
        loggs.error(`Se produjo un error al buscar el usuario con username ${username}. Error: ${error}`)
    }
    
}


module.exports = { readByUsername }

