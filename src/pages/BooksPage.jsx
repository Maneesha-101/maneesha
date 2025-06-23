import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', subject: '', isbn: '' });
  const [showToast, setShowToast] = useState(false);

  // Load books or set dummy books on first load
  useEffect(() => {
    const stored = localStorage.getItem('books');
    if (stored) {
      setBooks(JSON.parse(stored));
    } else {
      const dummyBooks = [
        { id: 1, title: 'Mathematics', author: 'R.S. Aggarwal', subject: 'Math', isbn: 'ISBN001' },
        { id: 2, title: 'Physics', author: 'H.C. Verma', subject: 'Physics', isbn: 'ISBN002' },
        { id: 3, title: 'Biology', author: 'Trueman', subject: 'Biology', isbn: 'ISBN003' },
      ];
      setBooks(dummyBooks);
      localStorage.setItem('books', JSON.stringify(dummyBooks));
    }
  }, []);

  // Update localStorage whenever books state changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));

    const existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
    const newRecords = books.map(b => ({ ...b, type: 'Book' }));
    localStorage.setItem('records', JSON.stringify([...existingRecords, ...newRecords]));
  }, [books]);

  const handleAddChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const addBook = (e) => {
    e.preventDefault();

    const { title, author, subject, isbn } = newBook;
    if (!title || !author || !subject || !isbn) return;

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const updated = [...books, { id: newId, ...newBook }];
    setBooks(updated);
    setNewBook({ title: '', author: '', subject: '', isbn: '' });

    // Show success toast
    setShowToast(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-success mb-4">Books Management</h3>

      <form className="row g-3 mb-4" onSubmit={addBook}>
        <div className="col-md-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={newBook.title}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Author"
            value={newBook.author}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Subject"
            value={newBook.subject}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            name="isbn"
            className="form-control"
            placeholder="ISBN"
            value={newBook.isbn}
            onChange={handleAddChange}
            required
          />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-success w-100">Add</button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Subject</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.subject}</td>
              <td>{b.isbn}</td>
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
          <Toast.Body>Book added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default BooksPage;
