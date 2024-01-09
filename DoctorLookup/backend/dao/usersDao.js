import { ObjectId } from "mongodb";


let user;

export default class UsersDAO {
  static async injectDB(conn) {
    if (user) {
      return;
    }
    try {
        user = await conn.db(process.env.DOCTORS_NS).collection("users");
    } catch (e) {
      console.error(`Unable to establish a connection handle in UsersDAO: ${e}`);
    }
  }

  static async getUserByEmail(email) {
    try {
    console.log('Getting user by email:', email); 
      if (!user) {
        throw new Error("User collection is undefined");
      }
      const pipeline = [
        {
          $match: {
            email: email,
          },
        },
      ];
      return await user.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Unable to retrieve user: ${e}`);
      return { error: e };
    }
  }

  static async getUserById(id) {
    try {
        console.log('Getting user by ID:', id)
      if (!user) {
        throw new Error("User collection is undefined");
      }
      const pipeline = [
        {
          $match: {
            id: id,
          },
        },
      ];
      return await user.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Unable to retrieve user: ${e}`);
      return { error: e };
    }
  }
  static async updateUser(id, updatedUser) {
    try {
      console.log('Updating user:', id);
      if (!user) {
        throw new Error("User collection is undefined");
      }

      // Update the user document in the collection based on the user's ID
      await user.updateOne(
        { _id: ObjectId(id) }, // Assuming you are using ObjectId for the user's ID
        { $set: updatedUser }
      );

      return { success: true };
    } catch (e) {
      console.error(`Unable to update user: ${e}`);
      return { error: e };
    }
  }
  static async updateUserRating(userId, doctorId, rating) {
    try {
      // Find the user by ID and update the rating for the specified doctor
      const updatedUser = await user.findOneAndUpdate(
        { _id: userId, 'ratings.doctorId': doctorId },
        { $set: { 'ratings.$.rating': rating } },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating user rating:', error);
      throw error;
    }
  }
  static async addRatingToUser(userId, doctorId, ratingValue){
    console.log('Adding rating to user:', userId);
    try {
      const result = await user.updateOne(
        { _id: new ObjectId(userId) , },
        { $push: { ratings: { doctorId, ratingValue } } }
      );
      
      console.log("Rating added to user:", result);
      return result;
    } catch (error) {
      console.error("Error adding rating to user:", error);
      throw error;
    }
  };

}
