const SHA384 = require('crypto-js/sha384');
const axios = require("axios");


function getRightUrl(url, adding) {
    if (url[url.length - 1] == "/")
        return query_url = url + adding
    else
        return query_url = url + "/" + adding
}

async function loginRoute(req, res) {
    await res.view("login", {
        "title": "Login to Mirage"
    });
};

async function registrationRoute(req, res) {
    await res.view("registration", {
        "title": "Registration to Mirage"
    });
};

async function loginPostRoute(req, res) {
    let data = req.body;
    var query_url = "";
    var node_url = "";

    query_url = getRightUrl(data.node_url, "users/auth");
    node_url = data.node_url

    if (Array.isArray(data.node_url)) {
        query_url = getRightUrl(data.node_url[1], "users/auth");
        node_url = data.node_url[1]
    }

    console.log(query_url, node_url);

    axios.post(query_url, {
        type: "login",
        nick: data.nick, 
        email: data.email,
        password: SHA384(data.password).toString(),
    }).then(function(response) {
        if (response.data.ID > 0 && response.data.nick.length > 0) {
            req.session.node_url = node_url;
            req.session.id = response.data.ID;
            req.session.nick = response.data.nick;
            req.session.email = response.data.email;
            req.session.save();
        }
    });

    res.redirect("/");
};

async function registerPostRoute(req, res) {
    if (req.body.node_url) {
        let data = req.body;
        var query_url = "";
        var node_url = "";
        
        query_url = getRightUrl(data.node_url, "users/auth");
        node_url = data.node_url;
    
        if (Array.isArray(data.node_url)) {
            query_url = getRightUrl(data.node_url[1], "users/auth");
            node_url = data.node_url[1];
        }
    
        axios.post(query_url, {
            type: "registration",
            nick: data.nick,
            email: data.email,
            password: SHA384(data.password).toString(),
        });

        res.redirect("/login");
    } else {
        res.redirect("/");
    }
};

module.exports = {
    loginRoute: loginRoute,
    registrationRoute: registrationRoute,
    loginPostRoute: loginPostRoute,
    registerPostRoute: registerPostRoute,
    getRightUrl: getRightUrl,
};