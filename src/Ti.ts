import { Main } from './Main';

const server: Main = new Main();

server.app.listen(server.config.express.port, server.config.express.address, () => {
    console.log('App', 'Started on port 3000');
});
