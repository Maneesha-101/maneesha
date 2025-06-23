import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', department: '', experience: '', empId: '' });
  const [newFaculty, setNewFaculty] = useState({ name: '', department: '', experience: '', empId: '' });
  const [showToast, setShowToast] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('faculty');
    if (stored) {
      setFaculty(JSON.parse(stored));
    } else {
      const dummy = [
        { id: 1, name: 'Dr. Kumar', department: 'Math', experience: '10 years', empId: 'EMP001' },
        { id: 2, name: 'Ms. Asha', department: 'Science', experience: '8 years', empId: 'EMP002' },
        { id: 3, name: 'Mr. Roy', department: 'English', experience: '5 years', empId: 'EMP003' }
      ];
      setFaculty(dummy);
      localStorage.setItem('faculty', JSON.stringify(dummy));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('faculty', JSON.stringify(faculty));
  }, [faculty]);

  const addFaculty = (e) => {
    e.preventDefault();
    const newId = faculty.length > 0 ? faculty[faculty.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...newFaculty };
    const updated = [...faculty, newEntry];
    setFaculty(updated);
    setNewFaculty({ name: '', department: '', experience: '', empId: '' });

    // Save to unified records
    const existing = JSON.parse(localStorage.getItem('records') || '[]');
    localStorage.setItem('records', JSON.stringify([...existing, { ...newFaculty, type: 'Faculty' }]));

    // Show success toast
    setShowToast(true);
  };

  const startEdit = (f) => {
    setEditId(f.id);
    setEditData({ name: f.name, department: f.department, experience: f.experience, empId: f.empId });
  };

  const saveEdit = () => {
    const updated = faculty.map((f) => (f.id === editId ? { ...f, ...editData } : f));
    setFaculty(updated);
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ name: '', department: '', experience: '', empId: '' });
  };

  const deleteFaculty = (id) => {
    const updated = faculty.filter((f) => f.id !== id);
    setFaculty(updated);
  };

  const handleAddChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h3 className="text-info mb-4">Faculty Management</h3>

      {/* Add Faculty */}
      <form className="row g-3 mb-4" onSubmit={addFaculty}>
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Name"
            value={newFaculty.name}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="department"
            className="form-control"
            placeholder="Enter Department"
            value={newFaculty.department}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="experience"
            className="form-control"
            placeholder="Enter Experience"
            value={newFaculty.experience}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="empId"
            className="form-control"
            placeholder="Enter Employee ID"
            value={newFaculty.empId}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-info w-100">Add</button>
        </div>
      </form>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-info">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Emp ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((f) => (
            <tr key={f.id}>
              <td>{f.id}</td>
              {editId === f.id ? (
                <>
                  <td><input name="name" value={editData.name} onChange={handleEditChange} className="form-control" /></td>
                  <td><input name="department" value={editData.department} onChange={handleEditChange} className="form-control" /></td>
                  <td><input name="experience" value={editData.experience} onChange={handleEditChange} className="form-control" /></td>
                  <td><input name="empId" value={editData.empId} onChange={handleEditChange} className="form-control" /></td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{f.name}</td>
                  <td>{f.department}</td>
                  <td>{f.experience}</td>
                  <td>{f.empId}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(f)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteFaculty(f.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          style={{ borderLeft: '5px solid green', minWidth: '250px' }}
        >
          <Toast.Header>
            <strong className="me-auto text-success">✅ Success</strong>
          </Toast.Header>
          <Toast.Body>Faculty added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default FacultyPage;
