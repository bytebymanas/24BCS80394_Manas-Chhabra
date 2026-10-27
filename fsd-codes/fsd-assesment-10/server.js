require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const registrationRoutes = require('./routes/registrationRoutes');

app.use(express.json());
app.use('/api', registrationRoutes);

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
    console.log('MONGO_URI is missing in .env');
    process.exit(1);
}

mongoose.connect(mongoUrl)
    .then(function () {
        console.log('Connection successful to MongoDB');

        app.listen(port, function () {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(function (error) {
        console.log('DB connection error:', error);
        process.exit(1);
    });
