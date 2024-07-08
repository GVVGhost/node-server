const SimplDB = require('simpl.db');
const db = new SimplDB();

const Users = db.createCollection('users');

const createUser = ({name, email, password}) => {
    let user = Users.create({name, email, password});
    delete user.password;
    return user;
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
        user = Users.get(user => email === user?.email);
        delete user.password;
    }
    return user;
}

module.exports = {createUser, deleteUser, hasUser, userCheck};

//
//
// Users.create({name: 'Peter', age: 19});
// Users.create({name: 'John', age: 19});
//
//
// Users.update(
//     user => user.age = 20,
//     target => target.name === 'Peter'
// );
// // or (simpl.db@2.11.0+)
// const user = Users.get(target => target.name === 'Peter');
// user.age = 20;
// user.save();
//
//
// Users.get(user => user.name === 'Peter'); // { name: 'Peter', age: 20 }
// Users.getMany(user => user.age > 18); // [{ name: 'Peter', age: 20 }, { name: 'John', age: 19 }]
