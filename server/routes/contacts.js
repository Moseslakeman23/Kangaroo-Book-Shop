const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /contacts
// @desc    Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /contacts
// @desc    Add a new contact
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({ name, email, phone });
    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /contacts/:id
// @desc    Update a contact
router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /contacts/:id
// @desc    Delete a contact
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contact deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;