import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('src/app/data.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

// Allow CORS from any origin so Vercel can fetch the data
// MUST be before jsonServer.defaults() so it intercepts OPTIONS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Bypass-Tunnel-Reminder');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

server.use(middlewares);

server.use(router);

server.listen(port, '0.0.0.0', () => {
    console.log(`JSON Server is running on port ${port} across all network interfaces`);
});
