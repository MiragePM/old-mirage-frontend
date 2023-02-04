const axios = require("axios");
const {
    getRightUrl
} = require("./auth");


async function getUserPackagesRouter(req, res) {
    if (!req.session.id && !req.session.node_url)
        await res.redirect("/login");
    else {
        let getInformationUrl = getRightUrl(req.session.node_url, "packages/get");
        const information = await axios.post(getInformationUrl, {
            type: "all",
            id: req.session.id,
        }).then(async (response) => {
            res.view("packages", {
                title: `${req.session.nick} packages`,
                data: response.data,
            });
        });
    }
}

async function postCreateRoute(req, res) {
    if (!req.body)
        return null;
    else {
        let addPackageUrl = getRightUrl(req.session.node_url, "packages");
        axios.post(addPackageUrl, {
            type: "new_package",
            name: req.body[0],
            description: req.body[1],
            git_url: req.body[2],
            author_id: req.session.id,
        });
    }
}


module.exports = {
    getUserPackagesRouter: getUserPackagesRouter,
    postCreateRoute: postCreateRoute,
};