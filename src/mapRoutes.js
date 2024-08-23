const auth = require('@modules/auth/route');
const userTasks = require('@modules/userTasks/route');

module.exports = (app) => {
    app.use(auth);
    app.use(userTasks);
}
