const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' });
};

const handleUserAction = async (action, email, password, res) => {
    try {
        const user = await User[action](email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        console.error(`Error ${action} user:`, error);
        res.status(400).json({ error: 'Invalid credentials' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    await handleUserAction('login', email, password, res);
};

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    await handleUserAction('signup', email, password, res);
};

module.exports = { loginUser, signupUser };