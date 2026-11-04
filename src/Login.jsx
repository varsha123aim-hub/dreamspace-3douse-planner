import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleLogin(event) {
    event.preventDefault()

    const cleanEmail = email.trim().toLowerCase()

    const users = JSON.parse(
      localStorage.getItem('dreamspace_users') || '[]'
    )

    const user = users.find(
      item =>
        item.email === cleanEmail &&
        item.password === password
    )

    if (!user) {
      setMessage('Invalid email or password.')
      return
    }

    localStorage.setItem(
      'dreamspace_current_user',
      JSON.stringify({
        name: user.name,
        email: user.email
      })
    )

    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Log in to continue designing your dream home.
        </p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />

          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login