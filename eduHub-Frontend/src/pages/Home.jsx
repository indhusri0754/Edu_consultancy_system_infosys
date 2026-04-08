import React from 'react'
import homeBg from '../assets/home.jpg'

export default function Home() {
  return (
    <>
      {/* Home Section */}
      <section
        id="home"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${homeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  color: '#fff',
                  fontWeight: 'bold',
                  textShadow: '0 0 2rem rgb(98,155,215)',
                  padding: '2rem',
                }}
              >
                <h3 className="animated-text" style={{ fontSize: '3.2rem', lineHeight: 1.2, marginBottom: '1rem' }}>
                  Unlocking Knowledge,<br /> Empowering Minds.
                </h3>
                <p className="animated-text" style={{ fontSize: '1.4rem', lineHeight: 2 }}>
                  Discover a world of learning opportunities at EduHub, where we curate the best educational
                  resources from around the web. Explore diverse courses, engage with expert educators, and
                  embark on a journey of intellectual growth. Join us and redefine your learning experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div id="about" style={{ backgroundColor: '#f0f0f0', padding: '2rem' }}>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="fw-bold">About EduHub</h2>
              <p className="mt-4 animated-text">
                Welcome to EduHub! We're here to help you find the best learning resources on the web. Our goal
                is to make education easy and accessible for everyone. Whether you're looking to learn something
                new or enhance your skills, we've got you covered with links to top courses and materials.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-4 text-center mb-4">
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h3 className="fw-bold animated-text" style={{ color: '#0043c9' }}>Vision</h3>
                <p className="animated-text">
                  We want to create a world where everyone can learn anything they want, anytime they want.
                  Education should be available to all, no matter where you are.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h3 className="fw-bold animated-text" style={{ color: '#0043c9' }}>Curated Courses</h3>
                <p className="animated-text">
                  Our team picks the best courses on a variety of subjects, from tech to art. We're here to
                  guide you to the best learning experiences out there.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h3 className="fw-bold animated-text" style={{ color: '#0043c9' }}>Learning Community</h3>
                <p className="animated-text">
                  Join our community of learners. Share your progress, help others, and get support from
                  people who are on the same journey as you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
