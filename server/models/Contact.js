const mongoose = require('mongoose');

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], // Allow only 'active' or 'inactive' status values
    default: 'active' // Default status is 'active'
  },
});

// Create a model using the contact schema
module.exports = mongoose.model('Contact', contactSchema);