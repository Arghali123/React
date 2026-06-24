import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Navbar() {

  const {
    theme,
    toggleTheme
  } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        background:
          theme === "light"
            ? "#ddd"
            : "#333",
        color:
          theme === "light"
            ? "black"
            : "white"
      }}
    >
      <h2>Navbar</h2>

      <button
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>

    </div>
  );
}

export default Navbar;