import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import logo from '../assets/logo.png'

export default function Header() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [navOpen, setNavOpen] = useState(false)

  function closeNavbar() {
    setNavOpen(false)
  }

  function logoutUser() {
    logout()
    toast.success('Logged out successfully')
    setTimeout(() => navigate('/login'), 1500)
    closeNavbar()
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/home">
            <img src={logo} alt="EduHub Logo" height="36" />
            <strong>EduHub</strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home" onClick={closeNavbar}>Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/home#about" onClick={closeNavbar}>About</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/courses" onClick={closeNavbar}>Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog" onClick={closeNavbar}>Blog</Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard" onClick={closeNavbar}>Dashboard</Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard1" onClick={closeNavbar}>Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/payment1" onClick={closeNavbar}>Payment</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-primary px-3" to="/login" onClick={closeNavbar}>
                    <i className="fas fa-user me-1"></i> Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-danger" onClick={logoutUser}>
                    <i className="fas fa-power-off me-1"></i> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
