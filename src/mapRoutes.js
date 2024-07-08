const auth = require('@modules/auth/route');
// const agreements = require('@modules/agreements/route');
// const dispositions = require('@modules/dispositions/route');
// const messages = require('@modules/messages/route');

module.exports = (app) => {
    app.use(auth);
    // app.use(agreements);
    // app.use(dispositions);
    // app.use(messages);
}
