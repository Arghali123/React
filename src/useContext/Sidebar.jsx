import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function Sidebar() {
  const {theme}=useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        background:
          theme === "light"
            ? "#f4f4f4"
            : "#555",
        color:
          theme === "light"
            ? "black"
            : "white"
      }}
    >
      <h2>Sidebar</h2>
    </div>
  );
}

export default Sidebar
