import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Payment1() {
  const navigate = useNavigate()

  function redirectToPayments() {
    navigate('/payment2')
  }

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan Member',
      price: '$25.0 / month Billed annually',
      label: 'Select Basic',
      discount: '-10%',
      save: 'save 10 $',
      features: 'Access to Sample Courses · Basic Study Tools · Community Access (Limited) · Weekly Progress Summary · Support Access',
      color: '#4a90d9',
    },
    {
      id: 'standard',
      name: 'Standard Plan Member',
      price: '$40.0 / month Billed annually',
      label: 'Select Standard',
      discount: '-15%',
      save: 'save 20 $',
      features: 'All Basic features · 30% discount on Uni Courses · 30% discount for products · Full Access to Course Library · Self-Assessment · Community Access (Limited) · Support Access',
      color: '#5cb85c',
    },
    {
      id: 'premium',
      name: 'Premium Plan Member',
      price: '$50.0 / month Billed annually',
      label: 'Select Premium',
      discount: '-25%',
      save: 'save 35 $',
      features: 'All Basic features · 45% discount on Uni Courses · 45% discount for products · Full Access to Core Course · Personal assistance · Advanced Study Tools · Interactive Quizzes · Personalized Feedback',
      color: '#d9534f',
    },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#333', marginBottom: '8px', textAlign: 'center' }}>
        Choose the best plan for you.
      </h1>
      <p style={{ color: '#666', marginBottom: '40px', textAlign: 'center' }}>
        Unlock unlimited learning with a plan that fits your goals.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          width: '100%',
        }}
      >
        {plans.map(plan => (
          <div
            key={plan.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '20px',
                backgroundColor: '#ff6b6b',
                color: '#fff',
                borderRadius: '12px',
                padding: '4px 14px',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              {plan.discount}
            </div>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
              {plan.name}
            </h2>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '5px' }}>{plan.price}</p>

            <div
              style={{
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                borderRadius: '8px',
                padding: '4px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              {plan.save}
            </div>

            <button
              onClick={redirectToPayments}
              style={{
                backgroundColor: plan.color,
                color: '#fff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '20px',
                width: '100%',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {plan.label}
            </button>

            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.8 }}>
              {plan.features.split(' · ').map((f, i) => (
                <span key={i}>
                  <i className="fas fa-check text-success me-1" style={{ fontSize: '0.8rem' }}></i>
                  {f}<br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
