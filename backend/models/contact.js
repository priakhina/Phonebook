const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'The name has to be at least 3 characters long.'],
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);
