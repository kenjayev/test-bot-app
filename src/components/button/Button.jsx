import "./Button.css";

const Button = ({ type, text, onClick, disabled }) => {
  return (
    <button
      disabled={!!disabled}
      className={`btn ${type} ${disabled}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
