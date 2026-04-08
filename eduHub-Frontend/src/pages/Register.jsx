import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoginSignupButtons from '../components/LoginSignupButtons.jsx'
import loginBg from '../assets/login.png'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [touched, setTouched] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  })
  const [passwordVisible, setPasswordVisible] = useState(false)

  function alphanumeric(val) {
    return /^[a-zA-Z0-9]+$/.test(val)
  }

  const errors = {
    userName: !formData.userName
      ? 'Username is required'
      : !alphanumeric(formData.userName)
      ? 'Username must be alphanumeric'
      : null,
    email: !formData.email
      ? 'Email is required'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? 'Invalid email format'
      : null,
    password: !formData.password
      ? 'Password is required'
      : formData.password.length < 8
      ? 'Password must be at least 8 characters long'
      : null,
    confirmPassword: !formData.confirmPassword
      ? 'Confirm Password is required'
      : formData.confirmPassword.length < 8
      ? 'Confirm Password must be at least 8 characters long'
      : formData.password !== formData.confirmPassword
      ? 'Passwords must match'
      : null,
  }

  const isFormValid = !Object.values(errors).some(Boolean)

  function handleChange(field) {
    return (e) => setFormData({ ...formData, [field]: e.target.value })
  }

  function handleBlur(field) {
    return () => setTouched({ ...touched, [field]: true })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isFormValid) {
      toast.error('Please fill all fields correctly.')
      return
    }
    try {
      await axios.post(
        'http://localhost:8080/auth/signup',
        { userName: formData.userName, email: formData.email, password: formData.password },
        { responseType: 'text' }
      )
      toast.success('Registration Successful. Please log in.')
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      if (error.response?.status === 500) {
        toast.warn('User Already Registered')
      } else {
        toast.error('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-4">
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              padding: '20px',
            }}
          >
            <LoginSignupButtons
              onLogin={() => navigate('/login')}
              onSignup={() => navigate('/registration-form')}
            />
            <h1 className="text-center mb-4 mt-3">Student Registration Form</h1>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-3 bg-white rounded">

              <div className="mb-3">
                <label htmlFor="userName" className="form-label">Username</label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter username"
                  className="form-control"
                  value={formData.userName}
                  onChange={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                />
                {touched.userName && errors.userName && (
                  <span className="text-danger">{errors.userName}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter E-Mail"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <span className="text-danger">{errors.email}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-group">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <i
                    className={`password-toggle-icon fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </div>
                {touched.password && errors.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="password-input-group">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="confirmPassword"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <i
                    className={`password-toggle-icon fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="text-danger">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
                Register
              </button>
            </form>

            <div className="text-center mt-2">
              <p>
                If you have already registered, click{' '}
                <button
                  type="button"
                  className="btn btn-link border-info p-0"
                  onClick={() => navigate('/login')}
                >
                  here
                </button>{' '}
                to login.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
