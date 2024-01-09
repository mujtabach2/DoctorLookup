import { ObjectId } from 'mongodb';

let users;
let doctors;
let reviews;

export default class ReviewsDAO {
static async injectDB(conn) {
  if (users && doctors && reviews) {
    return;
  }
  try {
    const db = await conn.db(process.env.DOCTORS_NS);
    users = db.collection("user");
    doctors = db.collection("doctors");
    reviews = db.collection("reviews");
    console.log("Successfully connected to the database.");
  } catch (e) {
    console.error(`Unable to establish a connection handle in ReviewsDAO: ${e}`);
    throw e; // Throw the error to indicate the failure to establish the connection
  }
}

static async addReview(doctorId, review, user, date) {
  try {
    const reviewDoc = {
      name: user.name,
      user_id: user._id,
      date: date,
      text: review,
      doctor_id: doctorId, 
      rating: user.rating// Use 'new' keyword here
    };

    const insertedReview = await reviews.insertOne(reviewDoc);

    if (insertedReview.acknowledged) {
      // Insertion was successful
      await doctors.updateOne(
        { _id: new ObjectId(doctorId) },
        { $push: { reviews: insertedReview.insertedId } }
      );

      await users.updateOne(
        { _id: new ObjectId(user._id) },
        { $push: { reviews: insertedReview.insertedId } }
      );

      return insertedReview;
    } else {
      // Insertion failed
      console.error('Failed to insert review:', insertedReview);
      return { error: 'Failed to insert review' };
    }
  } catch (e) {
    console.error(`Unable to post review: ${e}`);
    return { error: e };
  }
}


  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: userId, _id: new ObjectId(reviewId) }, // Use 'new' keyword here
        { $set: { text: text, date: date } }
      );

      if (updateResponse.modifiedCount !== 1) {
        console.error('Failed to update review:', updateResponse);
        return { error: 'Failed to update review' };
      }

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId), // Use 'new' keyword here
        user_id: userId,
      });

      if (deleteResponse.deletedCount !== 1) {
        console.error('Failed to delete review:', deleteResponse);
        return { error: 'Failed to delete review' };
      }

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
  static async getReviewsByDoctorId(doctorId) {
    try {
    
      const doctorReviews = await reviews.find({ doctor_id: doctorId }).toArray();
      console.log(doctorReviews);
  
      if (!doctorReviews || doctorReviews.length === 0) {
        // If no reviews are found for the specified doctor, return null or an empty array
        return null;
      }
  
      return doctorReviews;
    } catch (e) {
      console.error(`Error fetching reviews for doctor ${doctorId}: ${e}`);
      throw e;
    }
  }
}
