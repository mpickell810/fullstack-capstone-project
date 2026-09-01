/*jshint esversion: 9 */
const express = require('express');
const router = express.Router();
const connectToDatabase = require("../models/db");
const logger = require('../logger');
const { ObjectId } = require('mongodb');

// Get all gifts
router.get('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        logger.error('Error fetching gifts:', e);
        next(e);
    }
});

// Get a single Gift by ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        const gift = await collection.findOne({ id: id});

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);
    } catch (e) {
        logger.error('Error fetching gift:', e);
        next(e);
    }
});

// Add a new gift
router.post('/', async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);

        const created = result.ops ? result.ops[0] : { _id: result.insertID, ...req.body };

        res.status(201).json(created);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
