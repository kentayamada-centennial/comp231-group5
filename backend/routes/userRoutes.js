const express = require('express');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const energyData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i + 1, 0).toLocaleString('en', { month: 'long' }),
        kWh: Math.floor(Math.random() * 1000 + 100)
    }));

    try {
        await client.connect();
        const usersCollection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
        const result = await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword,
            energyData
        });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering the user.");
    } finally {
        await client.close();
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      await client.connect();
      const usersCollection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
      const user = await usersCollection.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ isAdmin: user.email === 'admin@powercan.com', name: user.name });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error logging in the user.");
    } finally {
      await client.close();
    }
  });

// User Management APIs - UT
router.get('/users', async (req, res) => {
    try {
        await client.connect();
        const collection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
        const users = await collection.find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

router.get('/users/:name', async (req, res) => {
    try {
        const name = req.params.name;
        await client.connect();
        const collection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
        const user = await collection.findOne({ name: name });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.connect();
        const collection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await client.connect();
        const collection = client.db("EnergyMetricsDB").collection("UserEnergyStats");
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, email } }
        );
        if (result.matchedCount === 1) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.close();
    }
});

// User Management APIs - UT

module.exports = router;
