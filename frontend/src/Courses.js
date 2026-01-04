import { useEffect, useState } from "react";
import api from "./api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    course_name: "",
    description: "",
    instructor: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const token = localStorage.getItem("token");

  // Fetch courses
  const fetchCourses = () => {
    api
      .get("/courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.course_name || !form.description || !form.instructor) {
      alert("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await api.post("/courses", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setForm({ course_name: "", description: "", instructor: "" });
      fetchCourses();
    } catch {
      alert("Operation failed");
    }
  };

  // Edit
  const handleEdit = (course) => {
    setForm(course);
    setEditingId(course.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await api.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCourses();
  };

  // 🔍 Search filter
  const filteredCourses = courses.filter(
    (c) =>
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Course Management</h2>

      {/* Form */}
      <div className="card p-3 mb-4">
        <h5>{editingId ? "Edit Course" : "Add Course"}</h5>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            name="course_name"
            placeholder="Course Name"
            value={form.course_name}
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            name="instructor"
            placeholder="Instructor"
            value={form.instructor}
            onChange={handleChange}
          />
          <button className="btn btn-primary">
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Search */}
      <input
        className="form-control mb-3"
        placeholder="Search by course or instructor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Course List */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Course</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.course_name}</td>
              <td>{course.description}</td>
              <td>{course.instructor}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {currentCourses.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
