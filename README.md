# ip-express
Basic IP API using node.js and fastify
### Dependencies
- `fastify`
- `@fastify/cors`
- `node:fs`
### Endpoints
/ip => ip as text<br>
/ips => ips as json ["0.0.0.0", "127.0.0.1"]<br>
/text => ip as text<br>
/json => ip as json: `{ "ip": "0.0.0.0" }`<br>
/json/:id => ip as json: ` { "$id": "0.0.0.0" }`

### Configuration
log: whether to save the requests to a text file. default is `true`



port: the http port to start the webserver and listen on. default is `3000`

### License
ip-fastify is licensed under MIT.
