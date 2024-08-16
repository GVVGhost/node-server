const {createUser, hasUser, userCheck} = require("@storage/dbUsers");
const {HttpStatusCode} = require("axios");

module.exports = {
    async getTask(req, res) {
        try {
            res.status(HttpStatusCode.NotImplemented).send('Not available yet');
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async createTask(req, res) {
        try {
            res.status(HttpStatusCode.NotImplemented).send('Not available yet');
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async updateTask(req, res) {
        try {
            res.status(HttpStatusCode.NotImplemented).send('Not available yet');
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async getListOfTask(req, res) {
        try {
            res.status(HttpStatusCode.NotImplemented).send('Not available yet');
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async deleteTask(req, res) {
        try {
            res.status(HttpStatusCode.NotImplemented).send('Not available yet');
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

}
