const fs = require('fs')
const fastify = require('fastify')({
    trustProxy: true,
    logger: false,
});





const log = true;
const port = 3000;





fastify.register(require('@fastify/cors'))


fastify.addHook('preHandler', (req, res, next) => {
    if(log){
        fs.appendFile('./logs', `[${new Date().toLocaleString()}] ${req.ip}: ${req.method} => ${req.originalUrl}`, (err) => {
            if(err) console.error(err)
        })
    }
    console.log(`[${new Date().toLocaleString()}] ${req.ip}: ${req.method} => ${req.originalUrl}`)
    next()
})

fastify.get('/api', (request, reply) => {
    const ip = request.ip;
    return reply.send(ip)
})


fastify.get('/text', {
    preHandler: (request, reply) => {
    
    },
    handler: (request, reply) => {
        return request.ip;
    }
})

fastify.get('/json', (request, reply) => {
    const ip = request.ip
    return reply.send({ ip })
})

fastify.get('/ips', (request, reply) => {
    return request.ips;
})


fastify.get('/ip', (request, reply) => {
    return request.ip
})


fastify.get('/json/:id', (request, reply) => {
    const id = request.params.id;
    const ip = request.ip;
    const res = {}
    res[id] = ip
    reply.send(res)
})


process.on('uncaughtException', (error) => {
    console.error(error)
    fastify.close();
    process.exit(1)
})

fastify.listen({ port }, (err, addr) => {
    if(err){
        console.error(err);
        process.exit(1)
    }
    console.log('fastify-ip is listening on port', port)
})

if(log && !fs.existsSync('./logs')) fs.writeFileSync('./logs', '', 'utf-8')
