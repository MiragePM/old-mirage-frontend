const {sequelize, Pages} = require('../database');


async function indexRoute(req, res) {
    let pageInfo = await Pages.findOne({where: {Name: "index"}});
    await res.view("index.eta", { title: pageInfo.Title });
}

module.exports = { indexRoute: indexRoute };
