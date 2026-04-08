import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'
import LoginSignupButtons from '../components/LoginSignupButtons.jsx'
import loginBg from '../assets/login.png'

export default function Login() {
  const navigate = useNavigate()
  const { setToken, setUsername, setLoginStatus } = useAuth()

  const [formState, setFormState] = useState('login') // 'login' | 'reset'

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false })
  const [passwordVisible, setPasswordVisible] = useState(false)

  // Reset password form state
  const [resetData, setResetData] = useState({ resetEmail: '', newPassword: '', confirmPassword: '' })
  const [resetTouched, setResetTouched] = useState({ resetEmail: false, newPassword: false, confirmPassword: false })

  const [errorMessage, setErrorMessage] = useState('')

  // Validation
  const loginValid = {
    email: loginData.email.trim() !== '',
    password: loginData.password.trim() !== '',
  }
  const resetValid = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetData.resetEmail),
    newPassword: resetData.newPassword.length >= 8,
    confirmPassword: resetData.confirmPassword.length >= 8,
    match: resetData.newPassword === resetData.confirmPassword,
  }
  const loginFormValid = loginValid.email && loginValid.password
  const resetFormValid = resetValid.email && resetValid.newPassword && resetValid.confirmPassword && resetValid.match

  async function handleLogin(e) {
    e.preventDefault()
    setErrorMessage('')
    if (!loginFormValid) {
      setErrorMessage('Please fill out all required fields.')
      return
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/login', loginData)
      if (response.data && response.data.token) {
        setToken(response.data.token)
        setLoginStatus(true)
        setUsername(response.data.username || loginData.email)
        toast.success('Login Successful.')
        setTimeout(() => navigate('/home'), 1500)
      }
    } catch {
      setErrorMessage('Invalid email or password.')
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault()
    setErrorMessage('')
    if (!resetFormValid) {
      setErrorMessage('Please fill out all required fields correctly and ensure passwords match.')
      return
    }
    try {
      await axios.post(
        'http://localhost:8080/auth/reset-password',
        { email: resetData.resetEmail, newPassword: resetData.newPassword },
        { responseType: 'text' }
      )
      toast.success('Password reset successfully.')
      setTimeout(() => setFormState('login'), 1500)
    } catch {
      toast.error('Failed to reset password. Please try again.')
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

            {/* Login Form */}
            {formState === 'login' && (
              <div>
                <h1 className="text-center mb-4 mt-3">Login</h1>
                <form onSubmit={handleLogin} className="shadow p-3 mb-3 bg-white rounded">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={loginData.email}
                      onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                      onBlur={() => setLoginTouched({ ...loginTouched, email: true })}
                    />
                    {loginTouched.email && !loginValid.email && (
                      <span className="text-danger">Email is required</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-input-group">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        className="form-control"
                        value={loginData.password}
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        onBlur={() => setLoginTouched({ ...loginTouched, password: true })}
                      />
                      <i
                        className={`password-toggle-icon fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    </div>
                    {loginTouched.password && !loginValid.password && (
                      <span className="text-danger">Password is required</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={!loginFormValid}>
                    Login
                  </button>
                </form>
              </div>
            )}

            {/* Reset Password Form */}
            {formState === 'reset' && (
              <div>
                <h2 className="text-center mb-4 mt-3">Reset Password</h2>
                <form onSubmit={handleResetPassword} className="shadow p-3 mb-3 bg-white rounded">
                  {errorMessage && (
                    <div className="alert alert-danger" role="alert">{errorMessage}</div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="resetEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      id="resetEmail"
                      className="form-control"
                      value={resetData.resetEmail}
                      onChange={e => setResetData({ ...resetData, resetEmail: e.target.value })}
                      onBlur={() => setResetTouched({ ...resetTouched, resetEmail: true })}
                    />
                    {resetTouched.resetEmail && !resetValid.email && (
                      <span className="text-danger">Valid email is required</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      value={resetData.newPassword}
                      onChange={e => setResetData({ ...resetData, newPassword: e.target.value })}
                      onBlur={() => setResetTouched({ ...resetTouched, newPassword: true })}
                    />
                    {resetTouched.newPassword && !resetValid.newPassword && (
                      <span className="text-danger">Password must be at least 8 characters long</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      value={resetData.confirmPassword}
                      onChange={e => setResetData({ ...resetData, confirmPassword: e.target.value })}
                      onBlur={() => setResetTouched({ ...resetTouched, confirmPassword: true })}
                    />
                    {resetTouched.confirmPassword && !resetValid.match && (
                      <span className="text-danger">Passwords must match</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={!resetFormValid}>
                    Reset Password
                  </button>
                </form>
              </div>
            )}

            <div className="text-end">
              <button
                type="button"
                className="btn btn-link"
                onClick={() => setFormState(formState === 'login' ? 'reset' : 'login')}
              >
                {formState === 'login' ? 'Forgot Password?' : 'Back to Login'}
              </button>
            </div>

            <div className="text-center mt-2">
              <p>
                If you don't have an account, click{' '}
                <button
                  type="button"
                  className="btn btn-link border-info p-0"
                  onClick={() => navigate('/registration-form')}
                >
                  here
                </button>{' '}
                to Register.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
