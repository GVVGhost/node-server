const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/get_task', controller.getTask);
router.post('/create_task', controller.createTask);
router.put('/update_task', controller.updateTask);
router.get('/get_list_of_task', controller.getListOfTask);
router.delete('/delete_task', controller.deleteTask);

module.exports = router;
