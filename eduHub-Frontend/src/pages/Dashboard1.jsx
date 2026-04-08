import React, { useState } from 'react'

export default function Dashboard1() {
  const [users, setUsers] = useState([
    { id: 1, username: 'Arya', email: 'arya@gmail.com' },
    { id: 2, username: 'eduhub', email: 'eduhub@gmail.com' },
  ])
  const [newUser, setNewUser] = useState({ username: '', email: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!newUser.username.trim()) errs.username = 'Username is required'
    if (!newUser.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) errs.email = 'Invalid email format'
    return errs
  }

  function addUser(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    setUsers([...users, { id: newId, ...newUser }])
    setNewUser({ username: '', email: '' })
    setErrors({})
  }

  function deleteUser(userId) {
    setUsers(users.filter(u => u.id !== userId))
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      {/* Add User Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New User</h5>
        </div>
        <div className="card-body">
          <form onSubmit={addUser}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Enter username"
                value={newUser.username}
                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <button type="submit" className="btn btn-success">
              Add User
            </button>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Users ({users.length})</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered table-striped mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No users found.</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
