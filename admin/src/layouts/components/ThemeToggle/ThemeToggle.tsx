import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.querySelector("main")?.classList.toggle("dark");
  };

  return (
    <Switch
      size="lg"
      color="success"
      isSelected={theme === "light"}
      onChange={toggleTheme}
      startContent={<IoSunny />}
      endContent={<IoMoon />}
    ></Switch>
  );
}
