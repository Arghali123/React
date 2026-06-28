import React, { useMemo, useState } from "react";

const INITIAL_STUDENTS = [

];

function StudentManagementSystem() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [nameInput, setNameInput] = useState("");
  const [marksInput, setMarksInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !marksInput) return;

    const newStudent = {
      id: Date.now(),
      name: nameInput.trim(),
      marks: parseFloat(marksInput),
    };

    setStudents([...students, newStudent]);
    setNameInput("");
    setMarksInput("");
  };

  const processedStudents = useMemo(() => {
    let result = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortBy === "asc") {
      result.sort((a, b) => a.marks - b.marks);
    } else if (sortBy === "dsc") {
      result.sort((a, b) => b.marks - a.marks);
    }
    return result;
  }, [students, searchTerm, sortBy]);

  const averageMarks = useMemo(() => {
    if (students.length === 0) return 0;
    const total = students.reduce((sum, student) => sum + student.marks, 0);
    return (total / students.length).toFixed(2);
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        padding: "10px",
      }}
    >
      <h2>Student Management System</h2>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          style={{ flex: 2, padding: "8px" }}
          required
        />
        <input
          type="number"
          placeholder="Marks"
          value={marksInput}
          onChange={(e) => setMarksInput(e.target.value)}
          min="0"
          max="100"
          style={{ flex: 1, padding: "8px" }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Add
        </button>
      </form>
      <hr />

      <div style={{ display: "flex", gap: "10px", margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 2, padding: "8px" }}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">No Sorting</option>
          <option value="asc">Marks: Low to High</option>
          <option value="desc">Marks: High to Low</option>
        </select>
      </div>


      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Average Marks : <span style={{ color: "#007bff" }}>{averageMarks}</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd", textAlign: "left" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Marks</th>
          </tr>
        </thead>
        <tbody>
          {processedStudents.length > 0 ? (
            processedStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {student.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {student.marks}
                </td>
              </tr>
            ))
          ) : (
            <p>No student</p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManagementSystem;
