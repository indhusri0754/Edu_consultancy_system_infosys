import React from 'react'

const blogPosts = [
  {
    id: 1,
    image: 'https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg',
    heading: 'The Future of Higher Education: Trends in College Enrollment',
    description: 'Analyzing the ongoing disparities in educational outcomes based on race, income, and geography.',
    date: 'Nov 12, 2024',
    author: 'The Creative Penn',
    source: 'terribleminds.com',
    category: 'Education',
  },
  {
    id: 2,
    image: 'https://images.shiksha.com/mediadata/images/articles/1684996658phpwUCiJm.jpeg',
    heading: 'Technology Transforming Indian Education System',
    description: 'How digital tools and platforms are reshaping the way students learn in India.',
    date: 'Oct 5, 2024',
    author: 'EduHub Team',
    source: 'eduhub.com',
    category: 'Technology',
  },
  {
    id: 3,
    image: 'https://www.bachelorstudies.com/images/header/student-using-laptop.jpg',
    heading: 'Online Learning: Bridging the Educational Gap',
    description: 'Exploring how e-learning platforms are making quality education accessible to all.',
    date: 'Sep 20, 2024',
    author: 'Jane Smith',
    source: 'edtech.com',
    category: 'Online Learning',
  },
  {
    id: 4,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/India-colleges.jpg/640px-India-colleges.jpg',
    heading: 'Top Skills to Learn in 2024 for Career Growth',
    description: 'A comprehensive guide to the most in-demand skills that will boost your career prospects this year.',
    date: 'Aug 15, 2024',
    author: 'Career Advisor',
    source: 'skillup.com',
    category: 'Career',
  },
  {
    id: 5,
    image: 'https://www.timeshighereducation.com/student/sites/default/files/styles/the_breaking_news_image_style/public/istock-1309357366.jpg',
    heading: 'Critical Thinking: The Most Valuable Skill in Modern Education',
    description: 'Why educators worldwide are prioritizing critical thinking over rote learning methods.',
    date: 'Jul 30, 2024',
    author: 'Prof. Mehta',
    source: 'academia.edu',
    category: 'Education',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=640',
    heading: 'Collaborative Learning: The Power of Peer Education',
    description: 'Research shows students learn better together — here is how to make the most of group study.',
    date: 'Jun 18, 2024',
    author: 'Research Team',
    source: 'learningscience.org',
    category: 'Study Tips',
  },
]

export default function Blog() {
  return (
    <div style={{ padding: '30px 20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, color: '#333', marginBottom: '10px' }}>
        The Blog
      </h1>
      <hr style={{ border: '2px solid #007bff', width: '80px', margin: '0 auto 30px auto' }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {blogPosts.map(post => (
          <div
            key={post.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={post.image}
              alt={post.heading}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#222', marginBottom: '10px', lineHeight: 1.4 }}>
                {post.heading}
              </h2>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                {post.description}
              </p>
              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#888' }}>
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{post.source}</span>
                <span
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    borderRadius: '20px',
                    padding: '3px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
