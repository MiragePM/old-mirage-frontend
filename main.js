const fastify = require('fastify')();
const fs = require('fs');

const fastifySession = require('@fastify/session');
const fastifyCookie = require('@fastify/cookie');


const path = require('node:path');
const crypto = require('node:crypto');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const packagesRouter = require('./routes/packages');

const PORT = process.env.PORT || 5000;
const secret = crypto.randomBytes(20).toString('hex');

{
    fastify.register(require('@fastify/formbody'));

    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        secret: secret,
        cookie: {
            secure: true,
        },
        expires: 1800000
    });

    fastify.register(require('@fastify/static'), {
        root: path.join(__dirname, 'static'),
        prefix: '/static/', // optional: default '/'
    });

    fastify.decorateReply('locals', null)

    fastify.addHook('preHandler', function(req, reply, next) {
        reply.locals = {}
        reply.locals.session = req.session;
        console.log(req.session.id, req.session.nick, req.session.node_url);
        next();
    }); 

    fastify.register(require("@fastify/view"), {
        engine: {
            eta: require("eta"),
        },
        root: path.join(__dirname, 'templates'),
        viewExt: "html",
    });
}

fastify.get("/", indexRouter.indexRoute);
fastify.get("/profile", profileRouter.profileRoute);

fastify.get("/packages", packagesRouter.getUserPackagesRouter);
fastify.post("/packages", packagesRouter.postCreateRoute);

fastify.get("/login", authRouter.loginRoute);
fastify.get("/registration", authRouter.registrationRoute);

fastify.post("/registration", authRouter.registerPostRoute);
fastify.post("/login", authRouter.loginPostRoute);

fastify.get('/start-on-unix.sh', (req, res) => {
    const buffer = fs.readFileSync('./installation');
    res.type('text/plain');
    res.send(buffer);
});


const start = async () => {
    try {
        console.log(`Now, we're running on the :${PORT} port;`);

        await fastify.listen({
            host: "0.0.0.0",
            port: PORT
        });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();