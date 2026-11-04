import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'My Dream Home',
      type: 'Modern House',
      date: 'Recently created',
      icon: '🏡',
    },
    {
      id: 2,
      name: 'Cozy Living Space',
      type: 'Interior Design',
      date: 'Recently created',
      icon: '🛋️',
    },
  ])

  const user = JSON.parse(
    localStorage.getItem('dreamspace_current_user') || 'null'
  )

  function createProject() {
  const newProject = {
    id: Date.now(),
    name: `My New Project ${projects.length + 1}`,
    type: 'House Design',
    date: 'Just created',
    icon: '🏠',
  }

  setProjects((previous) => [newProject, ...previous])
  navigate('/planner')
}
  function handleLogout() {
    localStorage.removeItem('dreamspace_current_user')
    navigate('/login')
  }

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <span>⌂</span>
          <h2>Dream<span>Space</span></h2>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <button className="sidebar-link active">
            <span>▦</span> Dashboard
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            <span>▧</span> My Projects
          </button>

          <button
            className="sidebar-link"
            onClick={createProject}
          >
            <span>＋</span> Create Project
          </button>

          <button
            className="sidebar-link"
            onClick={() =>
              alert('AI Design Assistant will be added in the next step!')
            }
          >
            <span>✧</span> AI Assistant
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <span>🌱</span>
            <h4>Need inspiration?</h4>
            <p>Your dream home starts with one little idea.</p>
          </div>

          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-date">YOUR CREATIVE SPACE</p>
            <h3>Dashboard</h3>
          </div>

          <div className="dashboard-user">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div>
              <strong>{user?.name || 'Designer'}</strong>
              <p>Home Designer</p>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div className="welcome-content">
            <span className="welcome-tag">✦ YOUR SPACE, YOUR STORY</span>

            <h1>
              Welcome home,
              <br />
              <span>{user?.name || 'Dreamer'}!</span>
            </h1>

            <p>
              Every beautiful home begins with an idea.
              Let's turn yours into something extraordinary.
            </p>

            <button className="create-project-btn" onClick={createProject}>
              ＋ Create New Project
            </button>
          </div>

          <div className="welcome-illustration">
            <div className="illustration-circle"></div>
            <div className="illustration-house">⌂</div>
            <span className="illustration-sparkle sparkle-one">✦</span>
            <span className="illustration-sparkle sparkle-two">✧</span>
            <span className="illustration-leaf">❋</span>
          </div>
        </section>

        {/* Project Heading */}
        <section className="projects-section" id="projects">
          <div className="section-title-row">
            <div>
              <p className="section-eyebrow">YOUR CREATIONS</p>
              <h2>My Projects <span>({projects.length})</span></h2>
            </div>

            <button className="view-all-btn" onClick={createProject}>
              + New Project
            </button>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-preview">
                  <div className="project-preview-circle"></div>
                  <span className="project-house-icon">{project.icon}</span>
                  <span className="project-preview-label">DREAMSPACE</span>
                </div>

                <div className="project-details">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.type}</p>
                  </div>

                  <button
                    className="project-menu"
                    aria-label={`Options for ${project.name}`}
                    onClick={() =>
                      setProjects((previous) =>
                        previous.filter((item) => item.id !== project.id)
                      )
                    }
                    title="Delete project"
                  >
                    ⋯
                  </button>
                </div>

                <div className="project-card-footer">
                  <span>◷ {project.date}</span>
                  <span className="project-status">Draft</span>
                </div>
              </article>
            ))}

            <button className="add-project-card" onClick={createProject}>
              <span className="add-project-icon">＋</span>
              <strong>Create something beautiful</strong>
              <span>Start a new house design</span>
            </button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <p className="section-eyebrow">LET'S GET CREATIVE</p>
          <h2>Made for your imagination</h2>

          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={createProject}>
              <span className="quick-action-icon green-icon">⌂</span>
              <span>
                <strong>Design Your Home</strong>
                <small>Start with a blank canvas</small>
              </span>
              <span className="action-arrow">↗</span>
            </button>

            <button
              className="quick-action-card"
              onClick={() =>
                alert('Design inspiration gallery is coming soon!')
              }
            >
              <span className="quick-action-icon peach-icon">✿</span>
              <span>
                <strong>Find Inspiration</strong>
                <small>Explore beautiful ideas</small>
              </span>
              <span className="action-arrow">↗</span>
            </button>

            <button
              className="quick-action-card"
              onClick={() =>
                alert('AI Design Assistant is coming soon!')
              }
            >
              <span className="quick-action-icon lavender-icon">✧</span>
              <span>
                <strong>AI Suggestions</strong>
                <small>Discover your design style</small>
              </span>
              <span className="action-arrow">↗</span>
            </button>
          </div>
        </section>

        <footer className="dashboard-footer">
          Made with care for your dream home <span>♥</span>
        </footer>

      </main>
    </div>
  )
}

export default Dashboard