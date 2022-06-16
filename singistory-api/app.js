require('dotenv').config();
require('./config/passport')
const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const singerRoute = require('./routes/singerRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const awardRoute = require('./routes/awardRoute');
const followRoute = require('./routes/followRoute');
const albumRoute = require('./routes/albumRoute');
const songRoute = require('./routes/songRoute');
const genreRoute = require('./routes/genreRoute');
const eventRoute = require('./routes/eventRoute');
const interestRoute = require('./routes/interestRoute');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRoute);
app.use('/singers', singerRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/award', awardRoute);
app.use('/follow', followRoute);
app.use('/album', albumRoute);
app.use('/song', songRoute);
app.use('/genre', genreRoute);
app.use('/event', eventRoute);
app.use('/interest', interestRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.massage });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on port ${port}`))