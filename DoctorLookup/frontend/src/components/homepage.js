import React from "react";
import { useNavigate } from 'react-router-dom';


function Homepage() {
    const navigate = useNavigate();

    const handleClicked = () => {
       navigate("/formbar");
    }
  return (
    <div>
    <div className="container">
      <div className="container">
        <div className="col">
        <div className="row">
          <div className="col">
            <h1>Doctor Lookup</h1>
            <p>Find the best doctors in your area </p>
            <div
              style={{
                width: 213,
                height: 56,
                paddingLeft: 28,
                paddingRight: 28,
                paddingTop: 16,
                paddingBottom: 16,
                background:
                  'linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)',
                boxShadow: '0px 8px 23px rgba(65, 132, 247, 0.24)',
                borderRadius: 100,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 10,
                display: 'inline-flex'
              }}
            >
              <div
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 8,
                  display: 'flex'
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      position: 'relative',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      display: 'flex'
                    }}
                  >
                    <div style={{ width: 1.59, height: 3.83, background: 'white' }}></div>
                    <div style={{ width: 1.59, height: 3.83, background: 'white' }}></div>
                    <div style={{ width: 13.29, height: 11.61, background: 'white' }}></div>
                    <div style={{ width: 10.66, height: 12.07, background: 'white' }}></div>
                    <div style={{ width: 5, height: 5, background: 'white' }}></div>
                  </div>
                </div>
                <button
                  type='button'
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Sora',
                    fontWeight: '600',
                    wordWrap: 'break-word'
                  }}
                    onClick={handleClicked}
                >
                  Search Now
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="Object" style={{width: 487.12, height: 612.71, position: 'relative'}}>
                <div className="Group9415" style={{width: 487.12, height: 612.71, left: 0, top: 0, position: 'absolute'}}>
                    <div className="Group9413" style={{width: 473, height: 570.77, left: 0, top: 0, position: 'absolute'}}>
                    <div className="Group9410" style={{width: 436.40, height: 436.40, left: 20.65, top: 108.03, position: 'absolute', opacity: 0.20}}>
                        <div className="Ellipse3" style={{width: 436.40, height: 436.40, left: 0, top: 0, position: 'absolute', opacity: 0.10, background: '#5466F8', borderRadius: 9999}} />
                        <div className="Ellipse2" style={{width: 285.56, height: 285.56, left: 75.42, top: 75.42, position: 'absolute', opacity: 0.50, background: '#5466F8', borderRadius: 9999}} />
                    </div>
                    <div className="Group3" style={{width: 96.53, height: 57.47, left: 206.87, top: 0, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0'}}>
                        <div className="Path17" style={{width: 15.26, height: 43.10, left: -3.98, top: 0.69, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                        <div className="Path17Copy2" style={{width: 47.59, height: 15.26, left: -40.95, top: 49.99, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                        <div className="Path17Copy3" style={{width: 16.16, height: 9.88, left: -34, top: 46.72, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                        <div className="Path17Copy4" style={{width: 0.90, height: 15.26, left: -21.66, top: 31.92, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                        <div className="Path17Copy5" style={{width: 11.67, height: 10.78, left: 6.01, top: 34.44, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                        <div className="Path17Copy" style={{width: 17.06, height: 29.63, left: -32.16, top: 22.02, position: 'absolute', transform: 'rotate(170.10deg)', transformOrigin: '0 0', border: '2px #516AF8 solid'}}></div>
                    </div>
                        <div className="Group13" style={{width: 127.29, height: 205.97, left: 345.71, top: 94.87, position: 'absolute'}}>
                            <div className="Path19" style={{width: 126.05, height: 202.34, left: 1.25, top: -0, position: 'absolute', border: '2px #3A8EF6 solid'}}></div>
                            <div className="Path21" style={{width: 15.30, height: 12.07, left: 2.51, top: 190.99, position: 'absolute', transform: 'rotate(12deg)', transformOrigin: '0 0', border: '2px #3A8EF6 solid'}}></div>
                        </div>
                        <img className="Union" style={{width: 42.26, height: 183.43, left: 35.66, top: 100.45, position: 'absolute'}} src="../../public/union.svg" />
                        <div className="Group9411" style={{width: 426.52, height: 511.20, left: 0, top: 59.57, position: 'absolute'}}>
                            <div className="Ellipse3" style={{width: 426.52, height: 426.52, left: 0, top: 84.68, position: 'absolute', background: 'linear-gradient(0deg,  0%,  100%), linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)', borderRadius: 9999}} />
                            <div className="MaskGroup" style={{width: 426.52, height: 426.52, left: 0, top: 84.68, position: 'absolute'}}>
                            <div className="Ellipse2" style={{width: 426.52, height: 426.52, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg,  0%,  100%), linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 9999}} />
                            <img className="Image4" style={{width: 395.44, height: 538.39, left: 19.42, top: -84.68, position: 'absolute'}} src="../../public/image4.svg" />
                            </div>
                            <img className="Image5" style={{width: 395.44, height: 319.31, left: 19.42, top: -0, position: 'absolute'}} src="../../public/doctor.svg" />
                        </div>
                        </div>
                        <div className="Group9414" style={{width: 195.12, height: 195.84, left: 292, top: 416.87, position: 'absolute'}}>
                        <div className="Group14" style={{width: 88.90, height: 124.14, left: 101.43, top: 47.30, position: 'absolute', transform: 'rotate(131deg)', transformOrigin: '0 0'}}>
                            <div className="Rectangle" style={{width: 88.90, height: 124.06, left: 0.06, top: 0.05, position: 'absolute', transform: 'rotate(131deg)', transformOrigin: '0 0', borderRadius: 124.60, border: '2.80px #3A8EF6 solid'}}></div>
                            <div className="Path24" style={{width: 71.40, height: 1.40, left: 22.32, top: 35.43, position: 'absolute', transform: 'rotate(131deg)', transformOrigin: '0 0', border: '2.10px #3A8EF6 solid'}}></div>
                            <div className="Path25" style={{width: 0.70, height: 16.80, left: -32.38, top: 37.24, position: 'absolute', transform: 'rotate(131deg)', transformOrigin: '0 0', border: '2.10px #3A8EF6 solid'}}></div>
                            <div className="Rectangle" style={{width: 10.50, height: 24.50, left: -16.67, top: 44.67, position: 'absolute', transform: 'rotate(131deg)', transformOrigin: '0 0', background: 'linear-gradient(0deg,  0%,  100%), linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)', borderRadius: 124.60}} />
                        </div>
                        <div className="Path26" style={{width: 68.94, height: 84.67, left: 68.94, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', border: '2.10px #3A8EF6 solid'}}></div>
                        </div>
                    </div>
                    <div className="Frame2983" style={{width: 239, height: 69, paddingLeft: 16, paddingRight: 16, paddingTop: 14, paddingBottom: 14, left: 19, top: 485.87, position: 'absolute', background: 'white', boxShadow: '0px 12px 32px rgba(63, 128, 240, 0.08)', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <div className="Frame2982" style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
                        <div className="Group9416" style={{width: 32, height: 32, position: 'relative'}}>
                            <div className="Ellipse2" style={{width: 32, height: 32, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(96deg, #3A8EF6 0%, #6F3AFA 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.12) inset', borderRadius: 9999}} />
                            <div className="Clinic" style={{width: 20, height: 20, left: 6, top: 6, position: 'absolute'}}>
                            <div className="Vector" style={{width: 13.82, height: 8.57, left: 3.09, top: 10.67, position: 'absolute', background: 'white'}}></div>
                            <div className="Vector" style={{width: 20, height: 10.80, left: -0, top: 1.58, position: 'absolute', background: 'white'}}></div>
                            <div className="Vector" style={{width: 3.74, height: 6.09, left: 12.73, top: 0.76, position: 'absolute', background: 'white'}}></div>
                            <div className="Vector" style={{width: 1.26, height: 5.50, left: 9.37, top: 10.82, position: 'absolute', background: 'white'}}></div>
                            <div className="Vector" style={{width: 5.50, height: 1.26, left: 7.25, top: 12.94, position: 'absolute', background: 'white'}}></div>
                            </div>
                        </div>
                        <div className="Frame2981" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
                            <div className="DrMichaelSantoso" style={{color: '#031432', fontSize: 16, fontFamily: 'Poppins', fontWeight: '500', wordWrap: 'break-word'}}>Dr. Michael Santoso</div>
                            <div className="HeadOfHospital" style={{color: '#6C87AE', fontSize: 12, fontFamily: 'Sora', fontWeight: '400', wordWrap: 'break-word'}}>Head of Hospital</div>
                        </div>
                        </div>
                    </div>


                        
            </div>
      </div>
      </div>
      </div>
    </div>





    <div className="container">
    <div className="Counters" style={{width: 1127, height: 210, position: 'relative'}}>
  <div className="Counter" style={{width: 349, height: 176, paddingTop: 11, left: 0, top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
    <div className="Counter" style={{width: 349, height: 165, position: 'relative'}}>
      <div className="Counter" style={{width: 294, height: 103, left: 36, top: 0, position: 'absolute'}}>
        <div className="Group" style={{width: 115, height: 73.99, left: 0, top: 22.01, position: 'absolute'}}>
            <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src="../../public/doctorCount.svg" />
        </div>
        <div className="200" style={{width: 150, height: 56, left: 144, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+1200</div>
        <div className="Doctors" style={{width: 150, height: 49, left: 144, top: 54, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Doctors</div>
      </div>
      <div className="MaecenasNislLibero" style={{width: 349, height: 54, left: 0, top: 111, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    </div>
  </div>
  <div className="Counter" style={{width: 349, height: 193, left: 389, top: 17, position: 'absolute'}}>
    <div className="Counter" style={{width: 156, height: 93, left: 155, top: 0, position: 'absolute'}}>
      <div className="200" style={{width: 156, height: 53, left: 0, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+1200</div>
      <div className="Clinics" style={{width: 150, height: 46, left: 0, top: 47, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Clinics</div>
    </div>
    <div className="MaecenasNislLibero" style={{width: 349, height: 88, left: 0, top: 105, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    <div className="Group" style={{width: 84, height: 84, left: 55, top: 9, position: 'absolute'}}>
    <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src="../../public/clinic.svg" />
    </div>
  </div>
  <div className="Counter" style={{width: 349, height: 193, left: 778, top: 17, position: 'absolute'}}>
    <div className="Counter" style={{width: 158, height: 93, left: 160, top: 0, position: 'absolute'}}>
      <div className="100" style={{width: 122, height: 56, left: 0, top: 0, position: 'absolute', color: '#357A38', fontSize: 48, fontFamily: 'Lato', fontWeight: '900', lineHeight: 56, wordWrap: 'break-word'}}>+100</div>
      <div className="Specialist" style={{width: 158, height: 46, left: 0, top: 47, position: 'absolute', color: 'rgba(0, 0, 0, 0.87)', fontSize: 36, fontFamily: 'Lato', fontWeight: '700', lineHeight: 56, wordWrap: 'break-word'}}>Specialist</div>
    </div>
    <div className="MaecenasNislLibero" style={{width: 349, height: 88, left: 0, top: 105, position: 'absolute', textAlign: 'center', color: 'rgba(0, 0, 0, 0.87)', fontSize: 18, fontFamily: 'Lato', fontWeight: '400', lineHeight: 27, wordWrap: 'break-word'}}>Maecenas nisl libero, tincidunt id odio id, feugiat vulputate quam. </div>
    <div className="Group" style={{width: 81, height: 75, left: 59, top: 18, position: 'absolute'}}>
    <img className="Shape" style={{width: 115, height: 73.99, left: 0, top: 0, position: 'absolute'}} src="../../public/specialist.svg" />
    </div>
  </div>
</div>
    </div>
    </div>
    </div>
  );
}

export default Homepage;
