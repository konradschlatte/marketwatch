const express = require('express');
const router = express.Router();
const Asset = require('../models/assetData');
// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    Asset.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });

    });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Asset.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Asset.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
    let asset = new Asset();

    const { id, stock, period, ma1, ma2 } = req.body;
    asset.id = id;
    asset.stock = stock;
    asset.period = period;
    asset.ma1 = ma1;
    asset.ma2 = ma2;
    asset.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;
