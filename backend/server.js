const http = require('http');
const app = require('./app');
const db = require('./models');
const { Users } = require('./models');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '.env' });

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8800');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

function createAdmin() {
  Users.create({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    isAdmin: 1,
  });
}

// Lors du 1er démarrage du serveur, décommenter { force: true } et createAdmin();
// { force: true } c'est pour effacer si les tables existent et les recréer
// createAdmin(); créer l'administrateur par défaut lors du 1er lancement

const server = http.createServer(app);
db.sequelize.sync(/*{ force: true }*/).then(() => {
  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind =
      typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
    // createAdmin();
  });
  server.listen(port);
});
