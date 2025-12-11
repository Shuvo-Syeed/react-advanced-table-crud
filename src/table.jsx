import React, { useEffect } from "react";
import { useState } from "react";

const table = () => {
  const [data, setData] = useState({
    name: "",
    years: "",
    userId: "",
    salary: "",
  });

  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [inputPage, setInputPage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const goToPage = () => {
    const pageNumber = Number(inputPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    } else {
      alert("Invalid Page!");
    }
  };

  const handleSubmit = () => {
    if (!data.name) {
      alert("Please fill all fields!");
      return;
    }

    const newRow = { ...data };

    if (editIndex !== null) {
      const updated = [...rows];
      updated[editIndex] = newRow;
      setRows(updated);
      setEditIndex(null);
    } else {
      setRows([newRow, ...rows]);
    }

    setData({
      name: "",
      years: "",
      userId: "",
      salary: "",
    });
  };

  const handleDelete = (index) => {
    const filtered = rows.filter((_, i) => i !== index);
    setRows(filtered);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setData(rows[index]);
  };

  const filtered = rows.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.userId.toString().includes(search)
  );

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  
  const inputStyle = {
    padding: "8px",
    width: "100%",
    marginBottom: "10px",
   
    borderRadius: "10px",
    border: "1px solid #b8e8ff",
    background: "#f8fcff",
    fontSize: "15px",
    color: "#333",
    outline: "none",
    transition: "0.2s",
  };

  const buttonPrimary = {
    padding: "12px",
    width: "80%",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #71e2ff, #79f7d9)",
    color: "#00323b",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    marginTop: "10px",
    
    boxShadow: "0 4px 12px rgba(120,200,255,0.4)",
  };

  const buttonPrimarySmall = {
    padding: "7px 12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #71e2ff, #79f7d9)",
    color: "#00323b",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    marginRight: "6px",
  };

  const deleteBtn = {
    ...buttonPrimarySmall,
    background: "linear-gradient(135deg, #ff8c8c, #ff6262)",
    color: "#5a0000",
  };

  const tableCell = {
    padding: "10px",
    borderRadius: "10px",
    background: "#ffffff",
    border: "1px solid #e6f3ff",
    boxShadow: "0 2px 8px rgba(150,200,255,0.2)",
    color: "#333",
  };

  const cardContainer = {
    background: "white",
    padding: "50px",
    borderRadius: "14px",
    border: "1px solid #e6f3ff",
    boxShadow: "0 4px 20px rgba(170,220,255,0.3)",
  };

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#00a3c8",
          fontWeight: "700",
        }}
      >
        Add Users
      </h2>

      <div style={cardContainer}>
        <input placeholder="Enter Name" name="name" value={data.name} onChange={handleChange} style={inputStyle} />
        <input placeholder="Enter Years" name="years" value={data.years} onChange={handleChange} style={inputStyle} />
        <input placeholder="Enter ID" name="userId" value={data.userId} onChange={handleChange} style={inputStyle} />
        <input placeholder="Salary" name="salary" value={data.salary} onChange={handleChange} style={inputStyle} />

        <button onClick={handleSubmit} style={buttonPrimary}>
          {editIndex !== null ? "Update User" : "Add User"}
        </button>
      </div>

      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...inputStyle, marginTop: "28px" }}
      />

      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginBottom: "14px" }}>
        <input
          placeholder="Page no"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          style={{ ...inputStyle, width: "150px", marginBottom: 0 }}
        />
        <button onClick={goToPage} style={{ ...buttonPrimarySmall, padding: "10px 18px" }}>
          Go
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "10px" }}>
        <thead>
          <tr>
            <th style={tableCell}>Name</th>
            <th style={tableCell}>Years</th>
            <th style={tableCell}>ID</th>
            <th style={tableCell}>Salary</th>
            <th style={tableCell}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((row, index) => (
            <tr key={index}>
              <td style={tableCell}>{row.name}</td>
              <td style={tableCell}>{row.years}</td>
              <td style={tableCell}>{row.userId}</td>
              <td style={tableCell}>{row.salary}</td>
              <td style={tableCell}>
                <button style={buttonPrimarySmall} onClick={() => handleEdit(start + index)}>
                  Edit
                </button>
                <button style={deleteBtn} onClick={() => handleDelete(start + index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              margin: "4px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: page === i + 1 ? "#79f7d9" : "#e3f7ff",
              color: page === i + 1 ? "#00323b" : "#5b7a99",
              fontWeight: "600",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default table;
