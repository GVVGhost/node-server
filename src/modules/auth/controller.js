const {createUser, hasUser, userCheck} = require("@storage/dbUsers");
const {HttpStatusCode} = require("axios");

module.exports = {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            if (!(email?.trim().length > 0 && password?.trim().length > 0)) {
                res.status(HttpStatusCode.BadRequest).send('Incorrect credentials');
                return;
            }
            if (!hasUser(email)) {
                res.status(HttpStatusCode.NotFound).send('User not found');
                return;
            }
            const usr = await userCheck({email, password})
            if (usr) {
                res.send(usr);
            } else {
                res.status(HttpStatusCode.Forbidden).send('Invalid password');
            }
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },

    async register(req, res) {
        try {
            const {name, email, password} = req.body;
            if (!(name?.trim().length > 0 && email?.trim().length > 0 && password?.trim().length > 0)) {
                res.status(HttpStatusCode.BadRequest).send('Incorrect credentials');
                return;
            }
            if (!hasUser(email)) {
                const user = await createUser({name, email, password});
                res.send(user);
            } else {
                res.status(HttpStatusCode.Conflict).send('User already exists');
            }
        } catch (err) {
            console.error(err);
            res.status(HttpStatusCode.InternalServerError).send('Internal Server Error');
        }
    },
}
