import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function Payment2() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    coupon: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields.')
      return
    }
    toast.success('Payment submitted successfully!')
  }

  return (
    <div
      className="payment-container"
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      }}
    >
      <div className="text-center mb-4">
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#333' }}>Checkout</h1>
        <p style={{ color: '#666' }}>Choose the best product that suits your needs.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Billing Info */}
        <div className="mb-4">
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px', color: '#444' }}>
            Billing Information
          </h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <textarea
              className="form-control"
              placeholder="Enter your address"
              rows={3}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px', color: '#444' }}>
            Payment Method
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { value: 'credit-card', label: 'Credit or Debit Card' },
              { value: 'paypal', label: 'PayPal' },
              { value: 'net-banking', label: 'Net Banking' },
            ].map(opt => (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `2px solid ${paymentMethod === opt.value ? '#007bff' : '#ddd'}`,
                  backgroundColor: paymentMethod === opt.value ? '#e8f0fe' : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.value}
                  checked={paymentMethod === opt.value}
                  onChange={() => setPaymentMethod(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Coupon */}
        <div className="mb-4">
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '15px', color: '#444' }}>Coupon</h2>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter coupon code"
              value={formData.coupon}
              onChange={e => setFormData({ ...formData, coupon: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => toast.success('Coupon applied!')}
            >
              Apply
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100 py-3"
          style={{ fontSize: '1.1rem', fontWeight: 600, borderRadius: '10px' }}
        >
          Submit Payment
        </button>
      </form>

      <div className="text-center mt-4" style={{ fontSize: '0.85rem', color: '#888' }}>
        <a href="#" className="me-3">FAQs</a>
        <a href="#" className="me-3">Privacy Policy</a>
        <a href="#">Legal Terms</a>
      </div>
    </div>
  )
}
