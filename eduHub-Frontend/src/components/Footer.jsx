import React from 'react'

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'rgba(37,62,126,0.24)', color: 'white', textAlign: 'center', padding: '5px', width: '100%' }}
    >
      <section className="pt-4 pb-1">
        <div className="container-fluid px-5">
          <div className="row">
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="text-center">
                <h3 className="mb-4" style={{ color: '#0d0d09', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Navigate Knowledge, Find Us Here.
                </h3>
                <p style={{ color: 'white', lineHeight: 2 }}>
                  Discover our global educational platform, connecting learners with quality resources and expert guidance.
                  Explore, learn, and grow with us!
                </p>
                <div>
                  <a href="#" className="btn btn-link text-white"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="btn btn-link text-white"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="btn btn-link text-white"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="btn btn-link text-white"><i className="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-5 mb-3">
              <div className="text-center">
                <h3 className="mb-4" style={{ color: '#0d0d09', fontSize: '1.2rem', fontWeight: 'bold' }}>Contact Us</h3>
                <p style={{ color: 'white', lineHeight: 2 }}>9172271435</p>
                <a href="mailto:contact@eduhub.com" style={{ color: 'white' }}>contact@eduhub.com</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-5 mb-3">
              <div className="text-center">
                <h3 className="mb-4" style={{ color: '#0d0d09', fontSize: '1.2rem', fontWeight: 'bold' }}>Address</h3>
                <p style={{ color: 'white', lineHeight: 2 }}>
                  Kondwa-Hadapsar Road<br />Pune<br />India
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-1 pt-3 pb-3 border-top" style={{ color: 'white', fontSize: '1.1rem' }}>
          Created with <span>❤️</span> | EduHub 2024, All rights reserved!
        </div>
      </section>
    </footer>
  )
}
