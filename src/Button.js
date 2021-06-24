import "./button.css";

const Button = ({ colorType, children, id, onClick }) => {
  return (
    <button
      onClick={e => {
        onClick(e.target.textContent);
      }}
      id={id}
      className={`button button--${colorType}`}
    >
      {children}
    </button>
  );
};

export default Button;
