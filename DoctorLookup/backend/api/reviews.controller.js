import ReviewsDAO from "../dao/reviewsDAO.js";
import UsersDAO from "../dao/usersDao.js";

export default class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      const { doctorId, review, user, date } = req.body;
      const insertedReview = await ReviewsDAO.addReview(doctorId, review, user, date);
      res.json(insertedReview);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetReviewsByDoctorId(req, res) {
    try {
      const { doctorId } = req.params;
      const reviews = await ReviewsDAO.getReviewsByDoctorId(doctorId);
      console.log('reviews:', reviews);
  
      if (!reviews) {
        // If no reviews are found for the specified doctor, return a 404 status code
        return res.status(404).json({ error: 'No reviews found for the doctor' });
      }
  
      res.json(reviews);
    } catch (e) {
      console.error('Error fetching doctor reviews:', e);
      res.status(500).json({ error: 'Failed to fetch doctor reviews' });
    }
  }
  
  static async apiUpdateReview(req, res) {
    try {
      const { reviewId, userId, text, date } = req.body;
      const updateResponse = await ReviewsDAO.updateReview(reviewId, userId, text, date);
      res.json(updateResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const { reviewId, userId } = req.params;
      const deleteResponse = await ReviewsDAO.deleteReview(reviewId, userId);
      res.json(deleteResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }


  static async apiUpdateUserRating(req, res) {
    try {
      const { userId, doctorId, rating } = req.body;
      
      // Find the user in the database by userId
      const user = await UsersDAO.getUserById(userId);

      // Find the doctor in the user's rating array by doctorId
      const userRating = user.rating.find((rate) => rate.doctorId.toString() === doctorId);

      // If userRating is found, update the rating; otherwise, create a new entry in the rating array
      if (userRating) {
        userRating.rating = rating;
      } else {
        user.rating.push({ doctorId, rating });
      }

      // Save the updated user object to the database
      await UsersDAO.updateUser(userId, user);

      res.json({ message: 'User rating updated successfully' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

   static async apiAddUserRating(req, res){
    const { userId, doctorId, ratingValue } = req.body;
  
    try {
      // Call the DAO to add the rating to the user document
      await UsersDAO.addRatingToUser(userId, doctorId, ratingValue);
      res.status(200).json({ message: 'Rating added to user successfully.' });
    } catch (error) {
      console.error('Error in addUserRating:', error);
      res.status(500).json({ error: 'Error adding rating to user.' });
    }
  };
}

