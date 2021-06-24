import "./button.css";

const Button = ({ colorType, children, id, onClick, type }) => {
  return (
    <button
      onClick={e => {
        onClick(e.target.textContent, type);
      }}
      id={id}
      className={`button button--${colorType}`}
    >
      {children}
    </button>
  );
};

export default Button;
