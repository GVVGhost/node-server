const {createUser, hasUser, userCheck} = require("@storage/dbHelper");

module.exports = {
    async login(req, res) {
        try {
            const {email, password} = req.body;
            if (!(email?.length > 0 && password?.length > 0)) {
                res.status(400).send('Incorrect credentials');
                return;
            }
            if (!hasUser(email)) {
                res.status(404).send('User not found');
                return;
            }
            const usr = userCheck({email, password})
            if (usr) {
                res.send(usr);
            } else {
                res.status(403).send('Invalid password');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Proxy Server Error');
        }
    },

    async register(req, res) {
        try {
            const {name, email, password} = req.body;
            if (!(name?.length > 0 && email?.length > 0 && password?.length > 0)) {
                res.status(400).send('Incorrect credentials');
                return;
            }
            if (!hasUser(email)) {
                let user = createUser({name, email, password});
                res.send(user);
            } else {
                res.status(409).send('User already exists');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Proxy Server Error');
        }
    },
}
