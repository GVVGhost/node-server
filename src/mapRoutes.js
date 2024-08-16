const auth = require('@modules/auth/route');

module.exports = (app) => {
    app.use(auth);
}
