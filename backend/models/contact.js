const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name has to be at least 3 characters long.'],
    required: [true, 'Name is required.'],
  },
  number: {
    type: String,
    minLength: [
      9,
      'Phone number has to have at least 8 digits and consist of two parts separated by a hyphen (e.g., 12-345678).',
    ], // setting minLength to 9 to account for the hyphen character ('-')
    validate: {
      validator: (value) => {
        const pattern_1 = /^\d{2}-\d{6,}$/;
        const pattern_2 = /^\d{3}-\d{5,}$/;
        return pattern_1.test(value) || pattern_2.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone number must have one of the following formats: xx-xxxxxx or xxx-xxxxx.`,
    },
    required: [true, 'Phone number is required.'],
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
