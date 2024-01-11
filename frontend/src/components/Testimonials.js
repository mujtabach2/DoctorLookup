import React, {useState} from "react";
import siteUserPfp from './siteUserPfp.jpeg'
import doctorTestPfp from './doctorTestPfp.jpeg'
import userPfp from './userpfp.png'
import right from './right1.png'
import left from './left1.png'
import Rectangle from './Rectangle1.png'
import epllipse from './Ellipse.png'


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
        <div className="row" style={{ textAlign: 'center' }}>
            <div className="Group9" style={{ width: 950, height: 680, position: 'relative', textAlign: 'center' }}>
                <div className="Rectangle2" style={{ width: 900, height: 620, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(142deg, rgba(253.51, 247.56, 255, 0.21) 0%, rgba(253.51, 247.56, 255, 0) 100%)', borderRadius: 46.92, border: '19px white solid', backdropFilter: 'blur(151.39px)' }} />
                <img className="Rectangle" style={{ width: 870, height: 620, left: 0, top: 0, position: 'absolute', borderRadius: 50 }} src={Rectangle} />
                <div className="column" style={{ width: 84, height: 89, left: 240, top: 180, position: 'absolute', textAlign: 'center' }}>
                 <div className="Content" style={{ width: 500, textAlign: 'center', color: 'black', fontSize: 15, fontFamily: 'arial', fontStyle: 'italic', fontWeight: 400, lineHeight: 2, letterSpacing: 0.6, overflowWrap: 'break-word' }}>
                        {currentTestimonial.content}
                    </div>
                    <div style={{marginLeft: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                        <img className="Ellipse9" style={{ width: 80, height: 80, borderRadius: '9999px', border: '3px solid rgb(255, 168, 0)', marginBottom: 10 }} src={currentTestimonial.image} />
                        <div className="Name" style={{ color: 'black', fontSize: 13, fontFamily: 'arial', fontWeight: 500, textTransform: 'uppercase', whiteSpace: 'nowrap', marginBottom: 5 }}>
                            {currentTestimonial.name}
                        </div>
                        <div className="Role" style={{ color: 'gray', fontSize: 10, fontFamily: 'arial', whiteSpace: 'nowrap', fontWeight: 300 }}>
                            {currentTestimonial.role}
                        </div>
                    </div>

                </div>

                <div style={{ width: 51, height: 38, left: 128, top: 121, position: 'absolute', }}>
                    <img src={epllipse} />
                </div>
                
                <div className="Group7" style={{ width: 40, height: 14, left: 730, top: 410, position: 'absolute' }}>
                    <button onClick={handleReverseClick} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                        <img src={left} style={{ height: 30 }} alt="Left Arrow" />
                    </button>
                </div>
                <div className="Group8" style={{ width: 40, height: 14, left: 140, top: 410, position: 'absolute' }}>
                    <button onClick={handleForwardClick} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                        <img src={right} style={{ height: 30 }} alt="Right Arrow" />
                    </button>
                </div>

            </div>
        </div>

    );

}

export default Testimonials;