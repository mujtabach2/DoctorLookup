# Doctor Lookup

![Doctor Lookup](doctor_lookup.jpg)

## Description
fix review ,
fix backend login reach
Doctor Lookup is a web application that allows users to search for doctors and view their information. The application uses web scraping with Selenium to gather doctor data from various websites, and the information is then stored in a MongoDB database. The frontend is built using React with HTML/CSS and Bootstrap for styling. The application includes a map feature using the Google Maps API to display the locations of doctors. Users can also log in, and user authentication is implemented using Node.js Passport.
## Website Link : https://healthconnect-8bm6.onrender.com/
## Features

- Web scraping with Selenium to gather doctor information
- MongoDB database for storing doctor data
- Frontend built with React, HTML/CSS, and Bootstrap for a responsive design
- Map feature using Google Maps API to visualize doctor locations
- Ability to add reviews for doctors
- User authentication with Node.js Passport for secure access
- MERN stack (MongoDB, Express, React, Node.js) for a full-stack application

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/doctor-lookup.git
```

2. Install the required dependencies for the frontend and backend:
```
cd doctor-lookup
cd frontend
npm install
cd ../backend
npm install
```


3. Set up MongoDB and create a `.env` file with the following variables:
```
MONGODB_URI=your-mongodb-connection-string
SECRET=your-session-secret
```


4. Start the backend server:
```
cd backend
npm start
```


5. Start the frontend development server:
```
cd frontend
npm start
```


6. Open your web browser and navigate to `http://localhost:3000` to access the Doctor Lookup application.

## Usage

1. On the home page, users can search for doctors using the search bar and view the list of doctors.

2. Clicking on a doctor's name will display their detailed information, including location on the map.

3. Users can log in to access additional features, such as adding reviews for doctors.


## Acknowledgments

- [Selenium](https://www.selenium.dev/) for web scraping doctor information.
- [MongoDB](https://www.mongodb.com/) for the database.
- [React](https://reactjs.org/) for building the frontend interface.
- [Bootstrap](https://getbootstrap.com/) for responsive styling.
- [Google Maps API](https://developers.google.com/maps) for displaying doctor locations on the map.
- [Passport](http://www.passportjs.org/) for user authentication.

