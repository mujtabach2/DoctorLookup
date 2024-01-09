let doctors
export default class DoctorsDAO {

  static async injectDB(client) {
    try {
      if (this.doctors) {
        return; // If the collection is already assigned, exit the method
      }

      const db = client.db(process.env.DOCTORS_NS);
      this.doctors = db.collection("doctors");
    } catch (e) {
      console.error(`Unable to establish a connection handle in DoctorsDAO: ${e}`);
    }
  }

  static async getDoctors({ filters = null, page = 0, doctorsPerPage = 20 } = {}) {
    if (!this.doctors) {
      console.error("The doctors collection is not initialized.");
      return { doctorsList: [], totalNumDoctors: 0 };
    }
  
    let query = {};
  
    if (filters) {
      if ("city" in filters) {
        query["city"] = { $eq: filters.city };
      }
      if ("specialty" in filters) {
        query["specialty"] = { $eq: filters.specialty };
      }
    }
  
    try {
      const cursor = this.doctors.find(query);
      const totalNumDoctors = await this.doctors.countDocuments(query);
  
      const displayCursor = cursor.limit(doctorsPerPage).skip(doctorsPerPage * page);
      const doctorsList = await displayCursor.toArray();
  
      return { doctorsList, totalNumDoctors };
    } catch (e) {
      console.error(`Unable to retrieve doctors: ${e}`);
      return { doctorsList: [], totalNumDoctors: 0 };
    }
  }
  
  

  static async getDoctorByCity(city) {
    try {
      const pipeline = [
        {
          $match: {
            city: city,
          },
        },
      ];
      return await doctors.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getDoctorByCity: ${e}`);
      throw e;
    }
  }

  static async getDoctorByType(specialty) {
    try{
      const pipeline = [
        {
          $match: {
            specialty: specialty,
          },
        },
      ];
      return await doctors.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getDoctorByType: ${e}`);
      throw e;
        }
      
    }
    static async getDoctorByName(name) {
      try{
        const pipeline = [
          {
            $match: {
              name: name,
            },
          },
        ];
        return await doctors.aggregate(pipeline).next();
        } catch (e) {
          console.error(`Something went wrong in getDoctorByName: ${e}`);
          throw e;
            }
          
        }
      static async getDoctorByAddress(address) {
        try{
          const pipeline = [
            {
              $match: {
                address: address,
              },
            },
          ];
          return await doctors.aggregate(pipeline).next();
          } catch (e) {
            console.error(`Something went wrong in getDoctorByAddress: ${e}`);
            throw e;
            
          }
        }
    
    }

   

