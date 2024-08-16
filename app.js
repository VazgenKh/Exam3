const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');


const app = express();


app.use(bodyParser.json());


app.set('view engine', 'ejs');


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/comments', require('./routes/comment'));

const express = require('express');
const router = express.Router();


router.post('/register', (req, res) => {
    res.send('User registered');
});

module.exports = router;



sequelize.sync().then(() => {
    app.listen(3006, () => {
        console.log(`server run on http: localhost:3006`)
    });
});
