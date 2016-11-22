const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/about', mid.requiresSecure, mid.requiresLogout, controllers.Account.aboutPage);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/about2', mid.requiresLogin, controllers.Display.aboutPage);
  app.get('/display', mid.requiresLogin, controllers.Display.displayPage);
  app.post('/display', mid.requiresLogin, controllers.Display.edit);
  app.get('/game', mid.requiresLogin, controllers.Display.gamePage);
  app.post('/game', mid.requiresLogin, controllers.Display.updateScore);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
