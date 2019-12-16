const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();

const router = jsonServer.router(require('./db.js')());


const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789';

const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Check if the user exists in database and password is correct
function isAuthenticated({ email, password }) {
  return userdb.findIndex(user => user.email === email && user.password === password) !== -1;
}

function getUser({ email, password }) {
  const index = userdb.findIndex(user => user.email === email && user.password === password);
  if (index > -1) {
    return userdb[index];
  }
  return null;
}

function userExist(email) {
  return userdb.findIndex(user => user.email === email) !== -1;
}

function paginate(payload, array) {
  const clonedArray = Array.from(array);
  const numberOfPages = Math.ceil(clonedArray.length / payload.pageSize);
  const chunks = [];
  for (let i = 0; i < numberOfPages; i++) {
    chunks.push(clonedArray.slice(0, payload.pageSize));
    clonedArray.splice(0, payload.pageSize);
  }
  return chunks[payload.page];
}

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = getUser({ email, password });
  if (!user) {
    const status = 401;
    const message = 'Incorrect email or password';
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token, ...user });
});

server.post('/auth/recover', (req, res) => {
  const { email } = req.body;
  if (userExist(email)) {
    res.status(200).json({ msg: 'Solicitud enviada' });
    return;
  }
  res.status(404).json({ msg: `No existe ningún usuario con ${email}` });
});

server.post('/auth/reset', (req, res) => {
  const user = req.body.loginusuario;
  if (userExist(user)) {
    res.status(200).json();
    return;
  }
  res.status(404).json({ msg: `No existe ningún usuario con ${user}` });
});

/*
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined) {
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});
*/
server.use(/^(?!\/auth).*$/,function (req, res, next) {
  if (req.headers.authorization === undefined) {
    if (req.method === 'GET') {
      next();
      return;
    }
    const status = 401;
    const message = 'Error in authorization format';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error access_token is revoked';
    res.status(status).json({ status, message });
  }
});

server.use('/api', router);

server.listen(3000, () => {
  console.log('Run Auth API Server');
});
