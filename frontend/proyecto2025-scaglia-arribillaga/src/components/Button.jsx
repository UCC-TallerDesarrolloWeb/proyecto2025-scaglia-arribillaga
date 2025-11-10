export default function Button({ children, onClick, disabled, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-generico ${className}`}
    >
      {children}
    </button>
  );
}
