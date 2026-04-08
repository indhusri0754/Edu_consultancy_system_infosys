import React from 'react'

export default function LoginSignupButtons({ onLogin, onSignup }) {
  return (
    <div className="d-flex justify-content-center gap-3 mb-3 mt-2">
      <button
        type="button"
        className="btn btn-outline-primary rounded-pill px-4"
        onClick={onLogin}
      >
        Login
      </button>
      <button
        type="button"
        className="btn btn-primary rounded-pill px-4"
        onClick={onSignup}
      >
        Sign Up
      </button>
    </div>
  )
}
