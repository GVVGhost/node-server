const {HttpStatusCode} = require("axios");
const {createTask, updateTask, getTask, getManyTasks, deleteTask} = require("@storage/dbTasks");

module.exports = {
    async getTaskById(req, res) {
        try {
            const queryFilter = JSON.parse(req.query.filter);
            const uuid = queryFilter.uuid;
            if (!uuid) {
                res.status(HttpStatusCode.BadRequest).send('No task UUID provided');
            } else {
                const task = getTask((task) => task.uuid === uuid);
                res.send({
                    createdAt: task.createdAt,
                    description: task.description,
                    owner: task.owner,
                    tasks: task.tasks,
                    title: task.title,
                    updatedAt: task.updatedAt,
                    uuid: task.uuid,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async getTasks(req, res) {
        try {
            const queryFilter = JSON.parse(req.query.filter);
            const id = queryFilter.id;
            if (!id) {
                res.status(HttpStatusCode.BadRequest).send('No user ID provided');
            } else {
                const tasks = getManyTasks((task) => id === task.owner.id)
                    .map(task => ({
                        createdAt: task.createdAt,
                        description: task.description,
                        owner: task.owner,
                        tasks: task.tasks,
                        title: task.title,
                        updatedAt: task.updatedAt,
                        uuid: task.uuid,
                    }));
                res.send(tasks);
            }
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async createTask(req, res) {
        try {
            const task = createTask(req.body);
            res.send({
                createdAt: task.createdAt,
                description: task.description,
                owner: task.owner,
                tasks: task.tasks,
                title: task.title,
                updatedAt: task.updatedAt,
                uuid: task.uuid,
            });
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async updateTask(req, res) {
        try {
            const task = updateTask(req.body);
            res.send({
                createdAt: task.createdAt,
                description: task.description,
                owner: task.owner,
                tasks: task.tasks,
                title: task.title,
                updatedAt: task.updatedAt,
                uuid: task.uuid,
            });
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async deleteTask(req, res) {
        try {
            const queryFilter = JSON.parse(req.query.filter);
            const uuid = queryFilter.uuid;
            const tasks = deleteTask(uuid).map(task => task.uuid);
            res.send(tasks);
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

}
