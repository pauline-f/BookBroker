const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.trade.getAll((err, allTrades) => {
    if (err) return res.status(204).json('error');
    res.status(200).json(allTrades);
  });
});

router.get('/:id', (req, res) => {
  db.trade.getById(req.params.id, (err, trade) => {
    if (err) return res.status(204).json('error');
    res.status(200).json(trade);
  });
});

router.put('/:id', (req, res) => {
  const { trade_description, book_condition, owner_id } = req.body;
  // if (req.user.id === ownerId) {
  db.trade.updateById(trade_description, book_condition, owner_id, req.params.id, (err, success) => {
    if (err) return res.status(204).json(false);
    res.status(204).json(success);
  });
  // } else {
  // return res.status(401).json(false);
  // }
});

router.delete('/:id', (req, res) => {
  db.trade.deleteById(req.params.id, (err, success) => {
    if (err) return res.status(204).json(false);
    res.status(204).json(success);
  });
});

router.patch('/:id', (req, res) => {
  db.trade.completeById(req.params.id, (err, success) => {
    if (err) return res.status(204).json(false);
    res.status(204).json(success);
  });
});

router.post('/', async (req, res) => {
  const trade = req.body;
  db.trade.add(trade, (result) => {
    res.status(201).json({ result });
  });
});

module.exports = router;
