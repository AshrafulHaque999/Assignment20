const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Static uploads
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
);


// Routes
app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/blogs', blogRoutes);


// Home
app.get('/', (req, res) => {
    res.send('Welcome to Blog Management System API');
});


module.exports = app;