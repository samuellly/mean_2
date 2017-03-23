var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// var uuid = require('uuid'); // https://github.com/defunctzombie/node-uuid
// var multiparty = require('multiparty'); // https://github.com/andrewrk/node-multiparty
// var s3 = require('s3');

require('./server/config/mongoose.js');


mongoose.Promise = global.Promise;
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

require('./server/config/routes.js')(app);

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json())




app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
