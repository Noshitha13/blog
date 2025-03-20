const bcrypt = require("bcryptjs");
const models = require("../models");

async function signup(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    models.User.create({ name, email, password: hashedPassword })
        .then(() => res.redirect("/login"))
        .catch(() => res.status(500).send("Error creating user"));
}

async function login(req, res) {
    const user = await models.User.findOne({ where: { email: req.body.email } });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).send("Invalid Credentials");
    }

    req.session.user = user;
    res.redirect("/posts");
}

function logout(req, res) {
    req.session.destroy(() => res.redirect("/login"));
}

module.exports = { signup, login, logout };
