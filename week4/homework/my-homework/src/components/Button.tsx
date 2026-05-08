interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const Button = ({ label, onClick, disabled, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-cyan-400 rounded-md p-3 
  hover:bg-cyan-500 transition-colors 
  disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cyan-400"
    >
      <span className="text-white font-bold">{label}</span>
    </button>
  );
};

export default Button;
