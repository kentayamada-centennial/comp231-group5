const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);  // Updated MongoClient instantiation

app.use(cors());
app.use(express.json());
// abcd
// Assuming userRoutes.js handles all user-related endpoints
const userRoutes = require('./routes/userRoutes');  // Ensure this path matches the location of your routing file

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        
        app.use('/api', userRoutes); // Mounting user-related routes

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
        app.status(500).send('Server error');
    }
}

main();
