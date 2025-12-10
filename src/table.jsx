import React from 'react'
import { useState } from 'react'

const table = () => {
  // 1) FORM INPUT STATES
  // ---------------------------
  const [name, setName] = useState("");
  const [years, setYears] = useState("");
  const [userId, setUserId] = useState("");
  const [salary, setSalary] = useState(""); 

  // ---------------------------
  // 2) TABLE DATA (DYNAMIC)
  // ---------------------------
  const [rows, setRows] = useState([]);

  // ---------------------------
  // 3) EDIT MODE
  // ---------------------------
  const [editIndex, setEditIndex] = useState(null);

  // ---------------------------
  // 4) SEARCH
  // ---------------------------
  const [search, setSearch] = useState("");

  // ---------------------------
  // 5) PAGINATION
  // ---------------------------
  const [page, setPage] = useState(1);
  const perPage = 5;

  // ---------------------------
  // 6) ADD / UPDATE FUNCTION
  // ---------------------------
  const handleSubmit = () => {
    if (!name || !years || !userId || !salary) {
      alert("Please fill all fields!");
      return;
    }

    const newRow = { name, years, userId, salary };

   if (editIndex!==null){
    const updated =[...rows];
    updated[editIndex]=newRow;
    setRows (updated);
    setEditIndex (null);

    } else {
      // Add new
      setRows([...rows, newRow]);
    }

    setName("");
    setYears("");
    setUserId("");
    setSalary("");
  };

  // ---------------------------
  // 7) DELETE FUNCTION
  // ---------------------------
  const handleDelete = (index) => {
    const filtered = rows.filter((_, i) => i !== index);
    setRows(filtered);
  };

  // ---------------------------
  // 8) EDIT FUNCTION
  // ---------------------------
  const handleEdit = (index) => {
    setEditIndex(index);
    setName(rows[index].name);
    setYears(rows[index].years);
    setUserId(rows[index].userId);
    setSalary(rows[index].salary);
    
  };

  // ---------------------------
  // 9) SEARCH + FILTER
  // ---------------------------
  const filtered = rows.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())||
  item.userId.toString().includes(search),
   
  );

  // ---------------------------
  // 10) PAGINATION LOGIC
  // ---------------------------
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  // TABLE CELL STYLE
  const cell = { border: "1px solid #ccc", padding: "8px" };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      
      {/* ------------------------- */}
      {/* FORM */}
      {/* ------------------------- */}
      <h2>Add Users</h2>

      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Enter Years"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <input
        placeholder="Enter ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />
      <input
      placeholder='Salary'
      value={salary}
      onChange={(e)=>setSalary(e.target.value)}
       style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
      ></input>

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px",
          width: "50%",
          background: "black",
          color: "white",
          borderRadius: "5px",
        }}
      >
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <hr style={{ margin: "25px 0" }} />

      {/* ------------------------- */}
      {/* SEARCH */}
      {/* ------------------------- */}
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
      />

      {/* ------------------------- */}
      {/* TABLE */}
      {/* ------------------------- */}
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={cell}>Name</th>
            <th style={cell}>Years</th>
            <th style={cell}>ID</th>
            <th style={cell}>Salary</th>
            <th style={cell}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((row, index) => (
            <tr key={index}>
              <td style={cell}>{row.name}</td>
              <td style={cell}>{row.years}</td>
              <td style={cell}>{row.userId}</td>
              <td style={cell}>{row.salary}</td>
            
              <td style={cell}>
                <button
                  onClick={() => handleEdit(start + index)}
                  style={{ marginRight: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(start + index)}
                  style={{ background: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------------------- */}
      {/* PAGINATION BUTTONS */}
      {/* ------------------------- */}
      <div style={{ marginTop: "15px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              padding: "6px 10px",
              marginRight: "5px",
              background: page === i + 1 ? "#007bff" : "#ddd",
              color: page === i + 1 ? "white" : "black",
            }}
          >
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default table
