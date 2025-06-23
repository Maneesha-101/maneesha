import React, { useEffect, useState } from 'react';

function AllRecordsPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    const facultyData = JSON.parse(localStorage.getItem('faculty')) || [];
    const bookData = JSON.parse(localStorage.getItem('books')) || [];

    const formattedStudents = studentData.map((item) => ({ ...item, type: 'Student' }));
    const formattedFaculty = facultyData.map((item) => ({ ...item, type: 'Faculty' }));
    const formattedBooks = bookData.map((item) => ({ ...item, type: 'Book' }));

    const combined = [...formattedStudents, ...formattedFaculty, ...formattedBooks];
    setRecords(combined);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Records</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Name / Title</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rec.type}</td>
              <td>{rec.name || rec.title}</td>
              <td>
                {rec.type === 'Student' && `Grade: ${rec.grade}, Age: ${rec.age || '-'}, Roll No: ${rec.rollNo || '-'}`}
                {rec.type === 'Faculty' && `Dept: ${rec.department}, Exp: ${rec.experience || '-'}, Emp ID: ${rec.empId || '-'}`}
                {rec.type === 'Book' && `Author: ${rec.author}, Subject: ${rec.subject || '-'}, ISBN: ${rec.isbn || '-'}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllRecordsPage;
