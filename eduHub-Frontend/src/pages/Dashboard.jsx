import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'
import profileImg from '../assets/profile.png'

export default function Dashboard() {
  const { isLoggedIn, token, username } = useAuth()
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [progressData, setProgressData] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showCourseOverview, setShowCourseOverview] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [noCoursesEnrolled, setNoCoursesEnrolled] = useState(false)
  const [modalCourse, setModalCourse] = useState(null)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    fetchEnrolledCourses()
  }, [isLoggedIn])

  const authHeaders = { Authorization: `Bearer ${token}` }

  async function fetchEnrolledCourses() {
    if (!token) return
    try {
      const res = await axios.get('http://localhost:8080/api/get-enrolled-courses', { headers: authHeaders })
      const courses = res.data
      if (courses.length === 0) {
        setNoCoursesEnrolled(true)
      } else {
        setEnrolledCourses(courses)
        courses.forEach(c => fetchProgress(c.enrollmentId, courses))
      }
    } catch (err) {
      console.error('Error fetching enrolled courses:', err)
    }
  }

  async function fetchProgress(enrollmentId, courses = enrolledCourses) {
    if (!token) return
    try {
      const res = await axios.get(`http://localhost:8080/trackprogress/${enrollmentId}`, { headers: authHeaders })
      const progress = res.data
      setEnrolledCourses(prev => {
        const updated = prev.map(c => {
          if (c.enrollmentId === enrollmentId) {
            return { ...c, progressPercentage: progress.progressPercentage, lastAccessedDate: progress.lastAccessedDate }
          }
          return c
        })
        return updated
      })
      setProgressData(prev => {
        const filtered = prev.filter(p => p.enrollmentId !== enrollmentId)
        return [...filtered, progress]
      })
    } catch (err) {
      console.error('Error fetching progress:', err)
    }
  }

  async function fetchCourseContent(courseId) {
    try {
      const res = await axios.get(`http://localhost:8080/auth/course-content/${courseId}`)
      setEnrolledCourses(prev =>
        prev.map(c => c.course.courseId === courseId ? { ...c, courseContent: res.data } : c)
      )
    } catch (err) {
      console.error('Error fetching course content:', err)
    }
  }

  async function createProgressEntry(enrollmentId) {
    const existing = progressData.find(p => p.enrollmentId === enrollmentId)
    if (existing) return
    const lastAccessed = new Date().toISOString().split('T')[0]
    try {
      await axios.post(
        'http://localhost:8080/trackprogress/create',
        { enrollmentId, progressPercentage: 0, lastAccessedDate: lastAccessed },
        { headers: authHeaders }
      )
      toast.success('Started Learning the course')
    } catch (err) {
      console.error('Error creating progress entry:', err)
    }
  }

  function calculateTotalProgress(course) {
    if (!course?.courseContent || course.courseContent.length === 0) return 0
    const total = course.courseContent.length
    const read = course.courseContent.filter(c => c.status === 'READ').length
    return (read / total) * 100
  }

  function calculateContentStatus(course, progressPercentage) {
    if (!course?.courseContent) return course
    const totalModules = course.courseContent.length
    const completedModules = Math.round((progressPercentage / 100) * totalModules)
    const updatedContent = course.courseContent.map((item, i) => ({
      ...item,
      status: i < completedModules ? 'READ' : 'UNREAD',
    }))
    return { ...course, courseContent: updatedContent }
  }

  async function viewCourseDetails(enrolledCourse) {
    const existing = progressData.find(p => p.enrollmentId === enrolledCourse.enrollmentId)
    await fetchCourseContent(enrolledCourse.course.courseId)
    const progress = existing || { progressPercentage: 0 }
    setSelectedCourse(calculateContentStatus(enrolledCourse, progress.progressPercentage))
    setShowCourseOverview(true)
    setShowAchievements(false)
    if (!existing) {
      await createProgressEntry(enrolledCourse.enrollmentId)
    }
    await fetchProgress(enrolledCourse.enrollmentId)
  }

  async function toggleContentStatus(content, index) {
    if (!selectedCourse) return
    const updatedContent = [...selectedCourse.courseContent]

    if (content.status === 'READ') {
      // Check subsequent are not READ
      for (let i = index + 1; i < updatedContent.length; i++) {
        if (updatedContent[i].status === 'READ') {
          toast.error('Mark subsequent modules as unread first.')
          return
        }
      }
      updatedContent[index] = { ...content, status: 'UNREAD' }
    } else {
      if (index > 0 && updatedContent[index - 1].status !== 'READ') {
        toast.error('Complete the previous module first.')
        return
      }
      updatedContent[index] = { ...content, status: 'READ' }
    }

    const updated = { ...selectedCourse, courseContent: updatedContent }
    setSelectedCourse(updated)
    await updateProgressPercentage(selectedCourse.enrollmentId, updated)
  }

  async function updateProgressPercentage(enrollmentId, courseWithContent) {
    const updatedPercentage = calculateTotalProgress(courseWithContent)
    const lastAccessed = new Date().toISOString().split('T')[0]
    try {
      await axios.put(
        'http://localhost:8080/trackprogress/updatePercentage',
        { enrollmentId, progressPercentage: updatedPercentage, lastAccessedDate: lastAccessed },
        { headers: authHeaders }
      )
      fetchProgress(enrollmentId)
    } catch (err) {
      console.error('Error updating progress:', err)
    }
  }

  async function unenrollCourseConfirm(courseId) {
    if (!token) return
    try {
      await axios.put('http://localhost:8080/api/unsubscribeCourse', { courseId }, { headers: authHeaders })
      // Reset progress
      if (modalCourse) {
        await axios.put(
          'http://localhost:8080/trackprogress/updatePercentage',
          { enrollmentId: modalCourse.enrollmentId, progressPercentage: 0, lastAccessedDate: null },
          { headers: authHeaders }
        )
      }
      toast.success('Unenrolled successfully!')
      setModalCourse(null)
      setEnrolledCourses(prev => {
        const filtered = prev.filter(c => c.course.courseId !== courseId)
        if (filtered.length === 0) setNoCoursesEnrolled(true)
        return filtered
      })
      setShowCourseOverview(false)
      setSelectedCourse(null)
      setTimeout(() => fetchEnrolledCourses(), 2000)
    } catch {
      toast.error('Error unenrolling from course!')
    }
  }

  const progressForSelected = selectedCourse
    ? progressData.find(p => p.enrollmentId === selectedCourse.enrollmentId)
    : null

  const achievedCourses = enrolledCourses.filter(c => c.progressPercentage === 100)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '200px',
          backgroundColor: '#1f2833',
          color: '#c5c6c7',
          minHeight: '100vh',
          padding: '20px',
          flexShrink: 0,
        }}
      >
        <div className="text-center mb-4">
          <img
            src={profileImg}
            alt="profile"
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', border: '2px solid #66fcf1' }}
          />
          <h3 style={{ fontSize: '1.2em', marginTop: 8, color: '#c5c6c7' }}>{username}</h3>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/home" style={{ color: '#c5c6c7', textDecoration: 'none', padding: '8px 0' }}>
            <i className="fas fa-home me-2"></i> Home
          </Link>
          <Link to="/courses" style={{ color: '#c5c6c7', textDecoration: 'none', padding: '8px 0' }}>
            <i className="fas fa-graduation-cap me-2"></i> Courses
          </Link>
          <a
            href="#"
            onClick={e => { e.preventDefault(); setShowAchievements(true); setShowCourseOverview(false) }}
            style={{ color: '#c5c6c7', textDecoration: 'none', padding: '8px 0' }}
          >
            <i className="fas fa-trophy me-2"></i> Achievements
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '15px', backgroundColor: '#fff', borderLeft: '1px solid #ddd' }}>

        {/* Enrolled Courses */}
        {!showCourseOverview && !showAchievements && (
          <section style={{ padding: '15px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#343a40', marginBottom: 30, textAlign: 'center' }}>
              Enrolled Courses
            </h1>
            {noCoursesEnrolled && (
              <div className="text-center p-4" style={{ backgroundColor: '#d6d9dc', borderRadius: 5 }}>
                <h4 className="fw-bold">Your learning journey awaits! Enroll in a course to get started.</h4>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {enrolledCourses.map(enrolledCourse => (
                <div
                  key={enrolledCourse.enrollmentId}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    padding: 15,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  <h2 style={{ fontSize: '1.1em', color: '#0b0c10', margin: 0 }}>
                    {enrolledCourse.course.courseName}
                    {enrolledCourse.progressPercentage === 100 && (
                      <i className="far fa-check-circle ms-2 text-success"></i>
                    )}
                  </h2>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-primary btn-sm fw-bold"
                      onClick={() => viewCourseDetails(enrolledCourse)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-danger btn-sm fw-bold"
                      disabled={enrolledCourse.progressPercentage > 25}
                      onClick={() => setModalCourse(enrolledCourse)}
                      data-bs-toggle="modal"
                      data-bs-target="#unenrollModal"
                    >
                      Unenroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Course Overview */}
        {showCourseOverview && selectedCourse && (
          <section style={{ padding: '15px' }}>
            <h1 className="text-center">Course Overview</h1>
            <h2>{selectedCourse.course.courseName}</h2>

            {progressForSelected && (
              <div className="progress my-3" style={{ height: 8, borderRadius: 10 }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progressForSelected.progressPercentage}%`, backgroundColor: '#45a29e', borderRadius: 10 }}
                >
                  {progressForSelected.progressPercentage}%
                </div>
              </div>
            )}

            <div className="container">
              <div className="row">
                {(selectedCourse.courseContent || []).map((content, i) => (
                  <div key={i} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div
                      className="card shadow-sm"
                      style={{ borderRadius: 12, transition: 'transform 0.3s, box-shadow 0.3s' }}
                    >
                      <div style={{ padding: 15, backgroundColor: '#f8f9fa', borderRadius: 12 }}>
                        <h3 className="text-center" style={{ fontSize: '1em', marginBottom: 8 }}>Module {i + 1}</h3>
                        <p style={{ fontSize: '0.9em' }}>
                          <b>Title: </b>{content.contentTitle}<br />
                          <b>Description: </b>{content.contentDescription}<br />
                          <b>URL: </b>
                          <a href={content.contentURL} target="_blank" rel="noopener noreferrer">
                            {content.contentURL}
                          </a>
                        </p>
                        <button
                          className={`btn btn-sm fw-bold ${content.status === 'READ' ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => toggleContentStatus(content, i)}
                        >
                          Mark as {content.status === 'READ' ? 'Unread' : 'Read'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-info fw-bold"
                onClick={() => { setShowCourseOverview(false); setSelectedCourse(null) }}
              >
                <i className="fas fa-reply-all me-1"></i> Go back
              </button>
              {progressForSelected && (
                <span className="btn btn-success fw-bold">
                  Last Accessed: {progressForSelected.lastAccessedDate
                    ? new Date(progressForSelected.lastAccessedDate).toLocaleDateString()
                    : 'N/A'}
                </span>
              )}
            </div>
          </section>
        )}

        {/* Achievements */}
        {showAchievements && (
          <section style={{ padding: '40px 0', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#343a40', marginBottom: 30 }}>
              Achievements
            </h1>
            {achievedCourses.length === 0 && (
              <p className="text-muted">Complete courses to earn achievements!</p>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 20,
                padding: '0 20px',
              }}
            >
              {achievedCourses.map(c => (
                <div
                  key={c.enrollmentId}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    padding: 20,
                  }}
                >
                  <h2 style={{ fontSize: '1.5rem', color: '#007bff', marginBottom: 15 }}>
                    {c.course.courseName}
                  </h2>
                  <p className="text-success fw-bold">Congratulations! You have completed this course.</p>
                  <p>
                    Completed By:{' '}
                    {c.lastAccessedDate
                      ? new Date(c.lastAccessedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Unenroll Modal */}
      {modalCourse && (
        <div
          className="modal fade show d-block"
          id="unenrollModal"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: 12 }}>
              <div className="modal-header">
                <h4 className="modal-title">Unenroll course</h4>
              </div>
              <div className="modal-body">
                <h2 className="fw-bold text-success">{modalCourse.course.courseName}</h2>
                <b className="text-danger">Do you want to unenroll from this course?</b><br />
                <b>No longer access this course</b><br />
                <b>Click on Yes to continue</b>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-danger fw-bold"
                  onClick={() => unenrollCourseConfirm(modalCourse.course.courseId)}
                >
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={() => setModalCourse(null)}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
