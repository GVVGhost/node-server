const SimplDB = require('simpl.db');
const db = new SimplDB();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const Users = db.createCollection('users');

const createUser = async ({name, email, password}) => {
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = Users.create({name, email, encryptedPassword});
    return {
        token: generateToken({id: user.__id}),
        id: user.__id,
        name: user.name,
        email: user.email,
    };
}

const deleteUser = (name) => {
    Users.remove(user => name === user?.name)
}

const hasUser = (email) => {
    return Users.has(user => email === user?.email);
}

const userCheck = async ({email, password}) => {
    const user = Users.get(user => email === user?.email)
    const isEqual = await bcrypt.compare(password, user.encryptedPassword)
    if (isEqual) {
        return {
            token: generateToken({id: user.__id}),
            id: user.__id,
            name: user.name,
            email: user.email
        };
    }
    return null;
}

const generateToken = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_PRIVATE_KEY,
        {expiresIn: '360h'} // 360h = 15d
    );
};

module.exports = {createUser, deleteUser, hasUser, userCheck};
