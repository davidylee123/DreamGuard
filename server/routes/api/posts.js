const express = require('express');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const router = express.Router();

let dbConnection; // Variable to store the MongoDB connection

// Initialize MongoDB Connection
async function initializeDbConnection() {
    if (!dbConnection) {
        try {
            // Connect to the MongoDB client without any deprecated options
            const client = await mongodb.MongoClient.connect('mongodb+srv://dyl30:TkVrXw5WdGDs4Nb@atlascluster.to34cec.mongodb.net/');
            dbConnection = client.db('vue_express').collection('posts');
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            process.exit(1); // Exit if the database connection fails
        }
    }
    return dbConnection;
}

// Get Posts
router.get('/', async (req, res) => {
    try {
        const posts = await initializeDbConnection();
        res.send(await posts.find({}).toArray());
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        res.status(500).send({ message: "Failed to get posts due to an internal error" });
    }
});

// Add Post
router.post('/', async (req, res) => {
    try {
        const posts = await initializeDbConnection();
        await posts.insertOne({
            text: req.body.text,
            createdAt: new Date()
        });
        res.status(201).send();
    } catch (error) {
        console.error("Failed to add post:", error);
        res.status(500).send({ message: "Failed to add post due to an internal error" });
    }
});

// Delete Post
router.delete('/:id', async (req, res) => {
    try {
        const posts = await initializeDbConnection();
        const result = await posts.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No post found with the specified ID" });
        }

        res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Failed to delete post:", error);
        res.status(500).send({ message: "Failed to delete post due to an internal error" });
    }
});

module.exports = router;
