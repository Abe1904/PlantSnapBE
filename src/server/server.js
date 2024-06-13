const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const JWT_SECRET = 'your_jwt_secret_key'; // Ganti dengan secret key Anda

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Atur rute dari file routes.js
  server.route(routes);

  // Mulai server
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
