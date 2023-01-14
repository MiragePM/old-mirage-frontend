async function indexRoute(req, res) {
    await res.view("index.eta", { title: "Mirage - Blazingly fast package manager" });
}

module.exports = { indexRoute: indexRoute };
