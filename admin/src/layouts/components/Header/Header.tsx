import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  return (
    <div className="h-16 w-full flex justify-between">
      <div>Logo</div>
      <div className="mr-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
