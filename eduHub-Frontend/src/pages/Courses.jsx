import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function Courses() {
  const { isLoggedIn, token } = useAuth()
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [courses, setCourses] = useState([])
  const [courseContent, setCourseContent] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState(0)
  const [showEnrollment, setShowEnrollment] = useState(false)
  const [courseCatalog, setCourseCatalog] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await axios.get('http://localhost:8080/auth/categories')
      const parsed = res.data.map(item => item.split(', '))
      setCategories(parsed)
      setFilteredCategories(parsed)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  function filterCategories(term) {
    setSearchTerm(term)
    setFilteredCategories(
      categories.filter(cat => cat[1].toLowerCase().includes(term.toLowerCase()))
    )
  }

  async function toggleCategory(category) {
    try {
      const res = await axios.get(`http://localhost:8080/auth/${category[0]}`)
      setCourses(res.data)
      setSelectedCategory(category[1] + ' Courses')
      setShowEnrollment(false)
      setCourseCatalog(true)
      setDropdownOpen(false)
    } catch (err) {
      console.error('Error fetching courses:', err)
    }
  }

  async function fetchCourseContent(courseId) {
    try {
      const res = await axios.get(`http://localhost:8080/auth/course-content/${courseId}`)
      setCourseContent(res.data)
    } catch (err) {
      console.error('Error fetching course content:', err)
    }
  }

  function toggleCourseContent(courseId) {
    setCourses(prev => prev.map(c => ({ ...c, showContent: false })))
    const idx = courses.findIndex(c => c.courseId === courseId)
    if (idx !== -1) {
      setCourses(prev => prev.map((c, i) => i === idx ? { ...c, showContent: true } : c))
      fetchCourseContent(courseId)
      setSelectedCourseId(courseId)
      setShowEnrollment(true)
      window.scrollTo(0, 0)
    }
  }

  async function enrollCourse(courseId) {
    if (!token) {
      toast.error('Please login to enroll')
      navigate('/login')
      return
    }
    const enrollmentDate = new Date().toISOString().split('T')[0]
    try {
      const res = await axios.post(
        'http://localhost:8080/api/enroll',
        { courseId: courseId.toString(), enrollmentDate },
        { headers: { Authorization: `Bearer ${token}` }, observe: 'response' }
      )
      const msg = res.data?.message === 'Re-Enrolled Successfully'
        ? 'Course Re-Enrolled successfully'
        : 'Course Enrolled successfully'
      toast.success(msg)
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'User is already enrolled') {
        toast.error('Course already enrolled')
      } else {
        toast.error('Failed to enroll. Please try again!')
      }
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 col-sm-12 bg-primary text-white" style={{ minHeight: '100vh', padding: '20px 10px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Category"
              value={searchTerm}
              onChange={e => filterCategories(e.target.value)}
              onFocus={() => setDropdownOpen(true)}
            />
            {dropdownOpen && filteredCategories.length > 0 && (
              <ul
                className="list-group"
                style={{ position: 'absolute', zIndex: 1000, width: '100%', maxHeight: 300, overflowY: 'auto' }}
              >
                {filteredCategories.map((cat, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat[1]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 col-sm-12" style={{ padding: '20px' }}>
          {!showEnrollment ? (
            <section>
              {!courseCatalog && (
                <div className="text-center my-4">
                  <h1 className="my-4">Welcome to Course Catalog</h1>
                  <p className="lead">
                    Course catalog offers a wide variety of courses to help you learn new skills and advance
                    your career. From programming to business to design, we have something for everyone.
                  </p>
                  <p className="lead">
                    To get started, simply select a category from the dropdown menu on the left and browse
                    the available courses. When you find a course you're interested in, click the "Enroll"
                    button to get started.
                  </p>
                  <p>Here are the steps to enroll in a course:</p>
                  <ol className="text-start d-inline-block">
                    <li>Select a category from the dropdown menu</li>
                    <li>Browse the available courses</li>
                    <li>Click the "Enroll" button for the course you want to take</li>
                    <li>Confirm your enrollment in the enrollment modal</li>
                    <li>Start learning!</li>
                  </ol>
                </div>
              )}

              {courseCatalog && (
                <h2 className="text-center bg-info text-light py-2 mb-3">{selectedCategory}</h2>
              )}

              <div className="table-responsive">
                <table className="table table-hover">
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.courseId}>
                        <td className="align-middle">{course.courseName}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => toggleCourseContent(course.courseId)}
                          >
                            Enroll
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <section>
              {/* Enrollment Modal */}
              <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                      <h5 className="modal-title">Course Enrollment</h5>
                      <button type="button" className="btn-close btn-close-white" onClick={() => setShowEnrollment(false)} />
                    </div>
                    <div className="modal-body">
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>Title</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseContent.map((content, i) => (
                              <tr key={i}>
                                <td>{content.contentTitle}</td>
                                <td>{content.contentDescription}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      {isLoggedIn ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => enrollCourse(selectedCourseId)}
                        >
                          Enroll Course
                        </button>
                      ) : (
                        <Link className="btn btn-info" to="/login">Login</Link>
                      )}
                      <button className="btn btn-secondary" onClick={() => setShowEnrollment(false)}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
