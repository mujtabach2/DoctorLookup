// in this file we will get user input from the user and with that in mind it will be send to doctor
const canadaCities = [
    { province: 'ab', city: 'calgary' },
    // { province: 'ab', city: 'edmonton' },
    { province: 'bc', city: 'vancouver' },
    { province: 'on', city: 'toronto' },
    // { province: 'on', city: 'ottawa' },
    // { province: 'qc', city: 'montreal' },
    // { province: 'qc', city: 'quebec city' },
    // { province: 'mb', city: 'winnipeg' },
    // { province: 'sk', city: 'regina' },
    // { province: 'ns', city: 'halifax' },
  ];

  const specialties = [
    "dermatologist",
   // "family-doctor-gp",
    "gynecologist-obgyn",
    //"ophthalmologist",
    "orthopedics-sports",
    "pediatrician",
    "psychiatrist",
    "psychologist",
    "radiologist",
    "urologist"
  ];
  
  
module.exports = { specialties, canadaCities };