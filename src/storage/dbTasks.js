const SimplDB = require('simpl.db');
const db = new SimplDB();

const Tasks = db.createCollection('tasks');

const createTask = (task) => Tasks.create(task)

const updateTask = (task) => Tasks.update(
    element => {
        element.createdAt = task.createdAt;
        element.description = task.description;
        element.owner = task.owner;
        element.tasks = task.tasks;
        element.title = task.title;
        element.updatedAt = task.updatedAt;
        element.uuid = task.uuid;
    },
    t => t.uuid === task.uuid
);

const deleteTask = (uuid) => Tasks.remove(task => task.uuid === uuid)

const getTask = (filter) => Tasks.get(filter)

const getManyTasks = (filter) => Tasks.getMany(filter)


module.exports = {createTask, deleteTask, getTask, getManyTasks, updateTask}
