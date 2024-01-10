import React, {useState} from "react";
import siteUserPfp from './siteUserPfp.jpeg'
import doctorTestPfp from './doctorTestPfp.jpeg'
import userPfp from './userPfp.png'

const Testimonials = () => {

    const testimonialsData = [
        {
          name: 'Emily Johnson',
          role: 'Patient',
          content: "I recently used the site to find a doctor, and I couldn't be happier with the service. The platform made it incredibly easy to search for doctors based on my specific needs. I was able to find a doctor who was a perfect fit for me and my family. I highly recommend this site to anyone looking for a doctor.",
          image: userPfp,
        },
        {
          name: 'Dr. Michael Rodriguez',
          role: 'Cardiologist',
          content: "Joining this platform was a game-changer for my practice. The increased visibility allowed me to connect with a broader audience, and as a result, I've seen a significant influx of new patients. The review system is transparent and fair, helping me build trust with my patients. I'm grateful for the opportunities this platform has provided, and I look forward to continuing to serve my community through this excellent resource.",
          image: doctorTestPfp,
        },
        {
          name: 'Jason Turner',
          role: 'Site User',
          content: "I've been using this site to find doctors for my family, and it has been a lifesaver. The detailed information about each doctor, along with patient reviews, helped me make informed decisions about our healthcare. The platform's user-friendly interface and comprehensive search features make it stand out. Kudos to the team behind this initiative for making the process of finding and reviewing doctors so efficient and reliable.",
          image: siteUserPfp,
        },
      ];
      
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleForwardClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
    };
  
    const handleReverseClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
    };
  
    const currentTestimonial = testimonialsData[currentIndex];

    return (
        <div className="row">
              <div className="Group9" style={{width: 870, height: 620, position: 'relative'}}>
                <div className="Rectangle2" style={{width: 870, height: 620, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(142deg, rgba(253.51, 247.56, 255, 0.21) 0%, rgba(253.51, 247.56, 255, 0) 100%)', borderRadius: 46.92, border: '19px white solid', backdropFilter: 'blur(151.39px)'}} />
                <img className="Rectangle" style={{width: 870, height: 620, left: 0, top: 0, position: 'absolute', borderRadius: 50}} src="https://via.placeholder.com/870x620" />
                <div className="Content" style={{width: 670, left: 100, top: 151, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 20, fontFamily: 'Prompt', fontStyle: 'italic', fontWeight: '400', lineHeight: 38, letterSpacing: 0.60, wordWrap: 'break-word'}}>{currentTestimonial.content}</div>
                <div className="Group5" style={{width: 84, height: 89, left: 393, top: 373, position: 'absolute'}}>
                  <img className="Ellipse9" style={{width: 80, height: 80, left: 2, top: 0, position: 'absolute', borderRadius: 9999, border: '3px #FFA800 solid'}} src={currentTestimonial.image} />
                </div>
                <div style={{width: 51, height: 38, left: 110, top: 101, position: 'absolute', background: 'radial-gradient(55.76% 55.76% at 44.21% 49.07%, #FFA800 0%, #FF4D00 100%)'}}></div>
                <div className="Name" style={{left: 374, top: 470, position: 'absolute', textAlign: 'center', color: '#E0E0E0', fontSize: 19, fontFamily: 'Prompt', fontWeight: '500', textTransform: 'uppercase', lineHeight: 32, letterSpacing: 0.95, wordWrap: 'break-word'}}>{currentTestimonial.name}</div>
                <div className="Role" style={{left: 279, top: 502, position: 'absolute', textAlign: 'center', color: '#B6BCCC', fontSize: 18, fontFamily: 'Prompt', fontWeight: '300', lineHeight: 32, wordWrap: 'break-word'}}>{currentTestimonial.role}</div>
                <div className="Group7" style={{width: 40, height: 14, left: 730, top: 410, position: 'absolute'}}>
                    <button onClick={handleReverseClick}>
                        <div className="Vector" style={{width: 40, height: 0, left: 40, top: 7, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '2px #EBECF1 solid'}}></div>
                        <div className="Vector" style={{width: 7, height: 14, left: 40, top: 14, position: 'absolute', transform: 'rotate(-180deg)', transformOrigin: '0 0', border: '2px #EBECF1 solid'}}></div>
                    </button>
                </div>
                <div className="Group8" style={{width: 40, height: 14, left: 140, top: 410, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0'}}>
                    <button onClick={handleForwardClick}>
                        <div className="Vector" style={{width: 40, height: 0, left: -40, top: 7, position: 'absolute', border: '2px #80859F solid'}}></div>
                        <div className="Vector" style={{width: 7, height: 14, left: -40, top: 14, position: 'absolute', border: '2px #80859F solid'}}></div>
                    </button>
                </div>
              </div>
            </div>
    );

}

export default Testimonials;