import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Planner from './planner/Planner.jsx'
function Home() {

  return (
    <div className="website">

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">⌂</span>
          <span>Dream<span className="logo-highlight">Space</span></span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-buttons">
         <Link to="/login" className="login-btn">Login</Link>
         <Link to="/signup" className="signup-btn">
  Get Started ↗
</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main id="home" className="hero">
        <div className="hero-content">

          <div className="badge">
            ✦ YOUR DREAM HOME STARTS HERE
          </div>

          <h1>
            Design Your Dream
            <span> Home in 3D</span>
          </h1>

          <p className="hero-description">
            Create, customize and visualize your perfect home.
            Design it yourself or let AI help bring your ideas to life.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Start Designing ↗
            </button>

            <button className="secondary-btn">
              Explore Features
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>3D</h3>
              <p>Real-time Design</p>
            </div>

            <div>
              <h3>AI</h3>
              <p>Smart Assistance</p>
            </div>

            <div>
              <h3>100%</h3>
              <p>Free to Start</p>
            </div>
          </div>

        </div>

        {/* House Visual */}
        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="house-card">
            <div className="house-top">
              <span>✦ 3D PREVIEW</span>
              <span className="live-dot">● LIVE</span>
            </div>

            <div className="house-illustration">
              <div className="house-sky">
                <span className="sun"></span>
                <span className="cloud cloud-one"></span>
                <span className="cloud cloud-two"></span>
              </div>

              <div className="house-garden">
                <div className="tree tree-one">♣</div>
                <div className="tree tree-two">♣</div>

                <div className="house-roof"></div>

                <div className="house-body">
                  <div className="window window-one"></div>
                  <div className="door"></div>
                  <div className="window window-two"></div>
                </div>

                <div className="house-base"></div>
              </div>
            </div>

            <div className="house-info">
              <div>
                <h3>Modern Dream House</h3>
                <p>Designed with DreamSpace</p>
              </div>

              <span className="preview-icon">⌂</span>
            </div>
          </div>

          <div className="floating-card ai-card">
            <span className="floating-icon">✦</span>
            <div>
              <strong>AI Assistant</strong>
              <p>Ideas to reality</p>
            </div>
          </div>

          <div className="floating-card design-card">
            <span className="floating-icon">▧</span>
            <div>
              <strong>3D Design</strong>
              <p>Your style, your home</p>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="features-section">
        <div className="section-heading">
          <span>WHAT YOU CAN DO</span>
          <h2>Everything You Need to Build Your Dream</h2>
          <p>One simple platform for your entire home design journey.</p>
        </div>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">⌂</div>
            <h3>3D House Planner</h3>
            <p>Create your own house layout and visualize it in 3D.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>AI Design Assistant</h3>
            <p>Get smart suggestions and help whenever you need it.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◇</div>
            <h3>Full Customization</h3>
            <p>Customize rooms, walls, floors, colours and furniture.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">◎</div>
            <h3>3D Walkthrough</h3>
            <p>Explore your designed home from an immersive perspective.</p>
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div>
          <span className="about-label">YOUR VISION, YOUR DESIGN</span>
          <h2>Design it yourself.<br />Get help from AI.</h2>
        </div>

        <p>
          DreamSpace brings manual house designing and AI assistance
          together in one easy-to-use platform. Create your own design,
          customize every detail and save your dream home.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="logo">
          <span className="logo-icon">⌂</span>
          <span>Dream<span className="logo-highlight">Space</span></span>
        </div>

        <p>Design your dream. Build your vision.</p>

        <span>© 2026 DreamSpace | College Project</span>
      </footer>

    </div>
)
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard  />} />
      <Route path="/planner" element={<Planner  />} />
    </Routes>
  )
}

export default App