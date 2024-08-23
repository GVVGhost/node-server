const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get_task_by_id', controller.getTaskById);
router.get('/get_tasks', controller.getTasks);
router.post('/create_task', controller.createTask);
router.put('/update_task', controller.updateTask);
router.delete('/delete_task', controller.deleteTask);

module.exports = router;
