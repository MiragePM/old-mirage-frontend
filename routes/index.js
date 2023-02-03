async function indexRoute(req, res) {
    await res.view("index.eta", { title: "Mirage - Lightweight and efficient package manager" });
}

module.exports = { indexRoute: indexRoute };
