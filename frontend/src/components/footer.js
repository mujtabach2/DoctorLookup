

function footer () {
    return (
        <div style={{ marginTop: '30vh',position: 'relative', zIndex: 1 }}>
          <footer className="footer" style={{ zIndex: '0', position: 'absolute', bottom: '0', left: '0', right: '0', backgroundColor: '#f8f9fa', padding: '2rem 0', textAlign: 'center' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src='../logo' alt="Logo" style={{ height: '3vh', marginRight: '10px' }} />
                <p style={{ margin: '0', color: '#707070' }}>
                  &copy; 2023 HealthConnect. All rights reserved.
                </p>
              </div>
              <div>
                <a href="https://github.com/mujtabach2" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: '#3980d5' }}>
                  <img src={githubIcon} alt="GitHub" style={{ height: '2.5vh', marginRight: '5px' }} />
                </a>
                <a href="https://www.linkedin.com/in/mujtaba-chaudhry/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: '#3980d5' }}>
                  <img src={linkedinIcon} alt="LinkedIn" style={{ height: '3.5vh', marginRight: '5px' }} />
                </a>
              </div>
            </div>
          </footer>
          </div>
    );
}