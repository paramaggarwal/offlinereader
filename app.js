var express = require('express');
var offline = require('connect-offline');

var manifestConfig = {
  manifest_path: "/cache.manifest",
  files: [
    {
      dir: '/public/css',
      prefix: '/css/'
    }, {
      dir: '/public/js',
      prefix: '/js/'
    }, {
      dir: '/public/images',
      prefix: '/images/'
    }
  ],
  use_fs_watch: true //for debugging without caching
}

var app = express();
app.set('view engine', 'html');
app.set('layout', 'layout');
//app.enable('view cache');
app.engine('html', require('hogan-express'));

app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(offline(manifestConfig));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static('public'));
app.use(express.errorHandler());

app.get('/', function(request, response) {
  response.render('index');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
