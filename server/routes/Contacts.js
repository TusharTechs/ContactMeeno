const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Create a new contact
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, status } = req.body;
    const contact = new Contact({ firstName, lastName, status });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a contact by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.findByIdAndRemove(id);
    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a contact by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, status } = req.body;

    // Find the contact by ID and update its properties
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { firstName, lastName, status },
      { new: true } // returns the updated document
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
