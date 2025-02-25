const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const path = require('path');
app.use('/', express.static(path.join(__dirname + '../../ccangular/dist/ccangular')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use('/user', require('./routes/user.router'));
app.use('/income', require('./routes/income.router'));
app.use('/expense', require('./routes/expense.router'));
app.use('/savinggoal', require('./routes/savinggoal.router'));
app.use('/saving', require('./routes/saving.router'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
})
