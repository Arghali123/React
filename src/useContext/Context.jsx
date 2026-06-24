import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Content() {

  const { theme } =
    useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "20px",
        background:
          theme === "light"
            ? "white"
            : "#222",
        color:
          theme === "light"
            ? "black"
            : "white"
      }}
    >
      <h2>Content Area</h2>

      <p>
        Current Theme:
        {theme}
      </p>

    </div>
  );
}

export default Content;