import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('src/app/data.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
