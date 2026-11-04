import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSignup(event) {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (!cleanName || !cleanEmail || !password) {
      setMessage('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.')
      return
    }

    const users = JSON.parse(
      localStorage.getItem('dreamspace_users') || '[]'
    )

    const existingUser = users.find(
      user => user.email === cleanEmail
    )

    if (existingUser) {
      setMessage('This email is already registered. Please log in.')
      return
    }

    const newUser = {
      name: cleanName,
      email: cleanEmail,
      password: password
    }

    users.push(newUser)

    localStorage.setItem(
      'dreamspace_users',
      JSON.stringify(users)
    )

    setMessage('Account created successfully!')

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Start designing your dream home.
        </p>

        <form onSubmit={handleSignup}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />

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
            placeholder="At least 6 characters"
            value={password}
            onChange={event => setPassword(event.target.value)}
            minLength={6}
            required
          />

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup