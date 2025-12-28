import { useEffect, useState } from "react";

const DarkMode = () => {
  const [dark, setDark] = useState(false);

  // Load saved theme or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
    } else if (savedTheme === "light") {
      setDark(false);
    } else {
      // fallback to system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDark(prefersDark);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg border px-4 py-2 text-sm transition hover:bg-muted"
      aria-label="Toggle dark mode"
    >
      {dark ?  <i className="fa-solid fa-sun"></i>:<i className="fa-solid fa-moon"></i> }
    </button>
  );
};

export default DarkMode;
