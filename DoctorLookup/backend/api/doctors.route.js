import express from "express";
import DoctorsController from "./doctors.controller.js";
import ReviewsController from "./reviews.controller.js";


const router = express.Router();

router.route("/doc").get(DoctorsController.apiGetDoctors);
router.route("/id/:id").get(DoctorsController.apiGetDoctorById);
router.route("/city").get(DoctorsController.apiGetDoctorCities);
router.route("/type").get(DoctorsController.apiGetDoctorTypes);
router.route("/name").get(DoctorsController.apiGetDoctorName);
router.route("/address").get(DoctorsController.apiGetDoctorByAddress);
router.route("/rating/:doctorId").post(ReviewsController.apiUpdateUserRating);
router.route("/user/addRating").post(ReviewsController.apiAddUserRating);
router.route("/review/:doctorId").get(ReviewsController.apiGetReviewsByDoctorId);
router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
