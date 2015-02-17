var express =       require('express');
var passport =      require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose =      require('mongoose');
var UsersVar =      require('./models/users'); 
var LoginToken =    require('./models/loginToken'); 
var path =          require('path');
var cookieParser =  require('cookie-parser');
var errorHandler =  require('errorhandler');
var bodyParser   =  require('body-parser');
var session      =  require('express-session');
var morgan       =  require('morgan');
var flash    =      require('connect-flash');
var app =           express();
var server;


// DATA BASE CONNECT
mongoose.connect('mongodb://localhost:27017/LoginSystem', function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BD');
});

// USE
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'loginservice',
    name: 'loginservice',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(errorHandler())
app.use(express.static(__dirname + '/public'));

// OTHER CONFIGURATIONS
passport.serializeUser(function(user, done) {
  console.log('Trying to login %d',user.id); 
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// GET
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/loginFailure', function(req, res, next) { 
  res.send('Failed to authenticate');
});
 
app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

app.get("/api/users/username/:username", function(req,res){
    var username = req.params.username;
    if(username!==''){
      UsersVar.findOne({
        'username': username, 
      }, function(err, user) {

        if (err) {res.status(500).json({"msg":"Error"});}
        if (!user) {res.status(200).json({"msg":"notExist"});}
        else{res.status(200).json({"msg":"Exist"});}

      });
    }else{
        res.status(500).json({"msg":"Error"});
    }
});

app.get("/api/users/email/:email", function(req,res){
    var email = req.params.email;
    if(email!==''){
      UsersVar.findOne({
        'email': email, 
      }, function(err, user) {
        if (err) {res.status(500).json({"msg":"Error"});}
        if (!user) {res.status(200).json({"msg":"notExist"});}
        else{res.status(200).json({"msg":"Exist"});}
      });
    }else{
        res.status(500).json({"msg":"Error"});
    }
});

app.get("/api/users/email/:email/:secondEmail", function(req,res){
    var firstEmail = req.params.email;
    var secondEmail = req.params.secondEmail;

    if(email!=='' && secondEmail !== '' && firstEmail === secondEmail){
        res.status(200).json({"msg":"OK"});
    }else{
        res.status(500).json({"msg":"Error"});
    }
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    UsersVar.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {return done(err);}
      if (!user) {return done(null, false, { message: 'Unknown user ' + username });}
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    });
  });
}));

// POST
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.post('/signup', function(request, response){
  var user = new UsersVar(request.body);

  user.save(function(err) {
    if (err) {
      console.log(err.message);
      return done(err);
    }
    //response.redirect('/login');
  });
});

// LISTEN
server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

