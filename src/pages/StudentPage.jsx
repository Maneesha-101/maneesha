import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', age: '', rollNo: '' });
  const [showToast, setShowToast] = useState(false);

  // Load students from localStorage on initial render
  useEffect(() => {
    const stored = localStorage.getItem('students');
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);

  // Save students and update combined records in localStorage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    const updatedRecords = [
      ...(JSON.parse(localStorage.getItem('records') || '[]')),
      ...students.map((s) => ({ ...s, type: 'Student' }))
    ];
    localStorage.setItem('records', JSON.stringify(updatedRecords));
  }, [students]);

  // Handle form input change
  const handleAddChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add new student
  const addStudent = (e) => {
    e.preventDefault();
    const { name, grade, age, rollNo } = newStudent;
    if (!name.trim() || !grade.trim() || !age.trim() || !rollNo.trim()) return;

    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const updated = [...students, { id: newId, ...newStudent }];
    setStudents(updated);
    setNewStudent({ name: '', grade: '', age: '', rollNo: '' });

    // Show success toast
    setShowToast(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-4">Student Management</h3>

      {/* Form to add new student */}
      <form className="row g-3 mb-4" onSubmit={addStudent}>
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="grade"
            className="form-control"
            placeholder="Grade"
            value={newStudent.grade}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="age"
            className="form-control"
            placeholder="Age"
            value={newStudent.age}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="rollNo"
            className="form-control"
            placeholder="Roll No"
            value={newStudent.rollNo}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      {/* Student Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Age</th>
            <th>Roll No</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.grade}</td>
              <td>{s.age}</td>
              <td>{s.rollNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast Message */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="light"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          style={{ borderLeft: '5px solid green', minWidth: '250px' }}
        >
          <Toast.Header>
            <strong className="me-auto text-success">✅ Success</strong>
          </Toast.Header>
          <Toast.Body className="text-dark">Student added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default StudentPage;
