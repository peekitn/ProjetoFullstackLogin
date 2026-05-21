const Hapi = require('@hapi/hapi');
const authRoutes = require('./routes/auth.routes');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',

    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(authRoutes);

  await server.start();

  console.log(`Servidor rodando em ${server.info.uri}`);
};

init();