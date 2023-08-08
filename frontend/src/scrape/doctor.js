const { Builder, By, until } = require('selenium-webdriver');
const GoogleSearchResults = require('google-search-results-nodejs');
const mongoose = require('mongoose');
// cant define function with {}
const pushToMongo  = require('./mongoPush.js')
const { specialties, canadaCities } = require('./data.js');

const review = {
  user:"",
  rating: "",
  comment: "",
  date: "",
};


async function searchDoctorPhoneNumber(doctor) {
  const driver = await new Builder().forBrowser('chrome').build();
  const searchQuery = `${doctor.name} `;
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

  try {
    await driver.get(searchUrl);
    await driver.sleep(2000);
    // Wait for the knowledge panel to appear

    const details = [doctor.phoneNumber,doctor.address]
    // Get the phone number from the knowledge panel

    const phoneNumberElement = await driver.findElement(By.css('.Z1hOCe .LrzXr.zdqRlf.kno-fv span'));
    details[0] = await phoneNumberElement.getAttribute('textContent');

    if(details[1] = '')
    {
      const addressElements = await driver.findElement(By.css('.LrzXr'))
      details[1] = await addressElements.getAttribute('textContent');
    } 
    await driver.sleep(2000);
    return details;
  } catch (error) {
    console.error('Error occurred during search:', error);
    return null;
  } finally {
    await driver.quit();
  }
}

// async function searchDoctorPhoneNumber(doctor) {
//   const searchQuery = `${doctor.name} `;
//   const searchUrl = `https://web.archive.org/save/${encodeURIComponent(searchQuery)}`;

//   try {
//     const response = await fetch(searchUrl);
//     const archiveUrl = response.headers.get('Content-Location');
//     const driver = await new Builder().forBrowser('chrome').build();
//     await driver.get(archiveUrl);

//     // Wait for the archived page to load
//     await driver.sleep(2000);

//     // Perform scraping on the archived page
//     const phoneNumberElement = await driver.findElement(By.css('.Z1hOCe .LrzXr.zdqRlf.kno-fv span'));
//     const phoneNumber = await phoneNumberElement.getAttribute('textContent');

//     // ... other scraping logic on the archived page

//     await driver.quit();

//     return phoneNumber; // Return the scraped phone number from the archived page
//   } catch (error) {
//     console.error('Error occurred during search:', error);
//     return null;
//   }
// }



async function scrape(province,city,type) {
    const doctors = [];
    let driver = await new Builder()
      .forBrowser('chrome')
      .build();
      const MAX_SCRAPE = 10
      let doctorCount = 0
    try {
      let url = `https://www.ratemds.com/best-doctors/${province}/${city}/${type}/`
      console.log(url)
      await driver.get(url);
      let currentPage = 1;
      const totalPages = 3;
  
      while (currentPage <= totalPages && doctorCount < MAX_SCRAPE ) {
        let doctorElements = await driver.findElements(By.css('.search-item-doctor-name'));
        let addressElements = await driver.findElements(By.css('.doctor-address'))
        let starElements = await driver.findElements(By.css('.reviews'))
        let imageElements = await driver.findElements(By.css('.search-item-image'))
    
        
        for (let i = 0; i < doctorElements.length; i++) {
          let doctor = {
            name: "",
            address: "",
            phone: "",
            reviews: [review],
            specialty: type,
            star: "",
            imgUrl: "",
            city: city,

          };
          
          doctorElements = await driver.findElements(By.css('.search-item-doctor-name')); // Re-find the elements inside the loop
          addressElements = await driver.findElements(By.css('.doctor-address'))
          doctor.name = await doctorElements[i].getAttribute('textContent');
          starElements = await driver.findElements(By.css('.reviews'))
          doctor.star = await starElements[i].getAttribute('textContent')
          console.log(doctor.star)
          imageElements = await driver.findElements(By.css('.search-item-image'))
          doctor.imgUrl = await imageElements[i].getAttribute('src')
          console.log(doctor.imgUrl)
  
          let address = 'Unknown';
          if (addressElements.length > i) {
            doctor.address = await addressElements[i].getAttribute('textContent');
          }

          doctors.push(doctor);
          
          if(doctorCount >= MAX_SCRAPE){
            break
          }
          await driver.sleep(2000);
        }
  
        if (currentPage < totalPages) {
          let paginationNav = await driver.findElement(By.css('nav[data-reactid=".0.6"]'));
          let nextPageLink = await paginationNav.findElement(By.css('a[rel="next"]'));
          let nextPageUrl = await nextPageLink.getAttribute('href');
          await driver.sleep(2000);
          await driver.get(nextPageUrl);
          await driver.sleep(6000);
  
          currentPage++;
          
        }
      }
  
    } catch (error) {
      console.error('Error occurred during scraping:', error);
    } finally {
      await driver.quit();
      
    // Run searchDoctorPhoneNumber for each doctor
    for (let i = 0; i < doctors.length; i++) {
      const details = await searchDoctorPhoneNumber(doctors[i]);
      let phoneNumber = '';
      let address = '';
    
      if (details && details.length > 0) {
        phoneNumber = details[0] || '';
        address = details[1] || '';
      }
    
      if (doctors[i].phone === '') {
        doctors[i].phone = phoneNumber || 'Phone number not found.';
      }
    
      if (doctors[i].address === '') {
        doctors[i].address = address || 'Address not found.';
      }
    }
    
    // Print the scraped doctor information
    for (let i = 0; i < doctors.length; i++) {
      console.log(`Doctor: ${doctors[i].name}\nAddress: ${doctors[i].address}\nPhone: ${doctors[i].phone}\nSpecialty: ${doctors[i].specialty}\nStars: ${doctors[i].star}\nImage: ${doctors[i].imgUrl}\n`);
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    pushToMongo(doctors)
  }
}


// async function runScraping() {
//   const driver = await new Builder().forBrowser('chrome').build();

//   try {
//     for (let i = 0; i < specialties.length; i++) {
//       for (let x = 0; x < canadaCities.length; x++) {
//         await scrape(canadaCities[x].province, canadaCities[x].city, specialties[i]);
//       }
//     }
//   } catch (error) {
//     console.error('Error occurred during scraping:', error);
//   } finally {
//     await driver.quit();
//   }
//   pushToMongo(doctors)
// }

// runScraping(); // Run the scraping function
async function runScraping() {
  try {
    // Dermatologist
    // await scrape('bc', 'vancouver', 'dermatologist');

    // Family Doctor (GP)
    // await scrape('on', 'toronto', 'family-doctor-gp');
    // await scrape('bc', 'vancouver', 'family-doctor-gp');
    // await scrape('ab', 'calgary', 'family-doctor-gp');

    
    await scrape('on', 'toronto', 'gynecologist-obgyn');
    await scrape('bc', 'vancouver', 'gynecologist-obgyn');
    await scrape('ab', 'calgary', 'gynecologist-obgyn');

    // Ophthalmologist
    await scrape('bc', 'vancouver', 'ophthalmologist');
    await scrape('on', 'toronto', 'ophthalmologist');
    await scrape('ab', 'calgary', 'ophthalmologist');

    // Orthopedic Surgeon / Bone Specialist
    await scrape('on', 'toronto', 'orthopedic-surgeon-bone-specialist');
    await scrape('bc', 'vancouver', 'orthopedic-surgeon-bone-specialist');
    await scrape('ab', 'calgary', 'orthopedic-surgeon-bone-specialist');

    // Pediatrician
    await scrape('on', 'toronto', 'pediatrician');
    await scrape('bc', 'vancouver', 'pediatrician');
    await scrape('ab', 'calgary', 'pediatrician');

    // Psychiatrist
    await scrape('on', 'toronto', 'psychiatrist');
    await scrape('bc', 'vancouver', 'psychiatrist');
    await scrape('ab', 'calgary', 'psychiatrist');

    // Psychologist
    await scrape('on', 'toronto', 'psychologist');
    await scrape('bc', 'vancouver', 'psychologist');
    await scrape('ab', 'calgary', 'psychologist');

    // Radiologist
    await scrape('on', 'toronto', 'radiologist');
    await scrape('bc', 'vancouver', 'radiologist');
    await scrape('ab', 'calgary', 'radiologist');

    // Urologist
    await scrape('on', 'toronto', 'urologist');
    await scrape('bc', 'vancouver', 'urologist');
    await scrape('ab', 'calgary', 'urologist');
  } catch (error) {
    console.error('Error occurred during scraping:', error);
  }
}

// Call the function to start the scraping process
runScraping();


// const


// Connect to MongoDB Atlas

//
