const mongoose= require('mongoose');

const sessionsCollection = 'sessions';

const SessionsSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true}
});

const sessions = mongoose.model(sessionsCollection, SessionsSchema);

module.exports = sessions