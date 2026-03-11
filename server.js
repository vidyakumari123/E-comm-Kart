import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('src/app/data.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

server.use(middlewares);

// Allow the custom Localtunnel bypass header for CORS preflight
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Bypass-Tunnel-Reminder');
  next();
});

server.use(router);

server.listen(port, '0.0.0.0', () => {
    console.log(`JSON Server is running on port ${port} across all network interfaces`);
});
