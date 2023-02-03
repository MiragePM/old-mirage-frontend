const axios = require("axios");
const {
    getRightUrl
} = require("./auth");


async function profileRoute(req, res) {
    console.log(req.session.ID)
    if (!req.session.ID && !req.session.node_url) {
        res.redirect("/login");
    } else {
        await res.view("profile", {
            title: "Profile",
        });
    }
}


module.exports = {
    profileRoute: profileRoute
};