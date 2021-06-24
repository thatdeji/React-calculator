import "./button.css";

const Button = ({ colorType, children, id }) => {
  return (
    <button id={id} className={`button button--${colorType}`}>
      {children}
    </button>
  );
};

export default Button;
