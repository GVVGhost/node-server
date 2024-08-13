const SimplDB = require('simpl.db');
const db = new SimplDB();

const Users = db.createCollection('users');

const createUser = ({name, email, password}) => {
    let user = Users.create({name, email, password});
    return {
        id: user.__id,
        name: user.name,
        email: user.email
    };
}

const deleteUser = (name) => {
    Users.remove(user => name === user?.name)
}

const hasUser = (email) => {
    return Users.has(user => email === user?.email);
}

const userCheck = ({email, password}) => {
    let user = null;
    const isValid = Users.has(user => email === user?.email && password === user?.password);
    if (isValid) {
        const u = Users.get(user => email === user?.email);
        user = {
            id: u.__id,
            name: u.name,
            email: u.email
        };
    }
    return user;
}

module.exports = {createUser, deleteUser, hasUser, userCheck};
