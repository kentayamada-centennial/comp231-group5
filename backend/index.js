const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }
}

main();
