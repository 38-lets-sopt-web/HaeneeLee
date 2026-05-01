import { button } from "./Button.css";

export default function Button({
  variant = "primary",
  onClick,
  disabled = false,
  children,
}) {
  return (
    <button
      className={button({ variant })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
