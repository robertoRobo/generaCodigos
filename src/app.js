express  = require('express');
morgan = require('morgan');
bodyParser = require('body-parser');


app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
require('./routes/codigosRoutes')(app);

app.set('port',process.env.PORT || 3000);
    
app.listen(app.get('port'),() => {
	console.log('server on port '+app.get('port'));
	}
);