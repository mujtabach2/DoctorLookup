const mongoose = require('mongoose');


async function pushToMongo(doctors)
{
  const uri = 'mongodb+srv://mujtabawaqas:bbFp4gPHC.pKQvH@cluster0.gtm2zmr.mongodb.net/DoctorSite?retryWrites=true&w=majority';
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully!');

    // Define the schema for doctors
    const doctorSchema = new mongoose.Schema({
      name: String,
      address: String,
      phone: String,
      specialty: String,
      star: String,
      imgUrl: String,
      city: String,
      reviews: [
        {
          rating: Number,
          comment: String,
          date: Date
        }
      ],
    });
    

    // Create the Doctor model
    const Doctor = mongoose.model('Doctor', doctorSchema);

    // Create an array of doctors
  
    // Insert doctors into the collection
    Doctor.insertMany(doctors)
      .then((result) => {
        console.log('Inserted doctors:', result);
        mongoose.disconnect();
      })
      .catch((error) => {
        console.error('Error inserting doctors:', error);
        mongoose.disconnect();
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
  // at the end to delete duplicate items we are going to do this 
//   const filter = { itemId: data.itemId }; // Specify the unique identifier field

// // Delete all documents with the same itemId
//   await collection.deleteMany(filter);

} 
module.exports = pushToMongo;