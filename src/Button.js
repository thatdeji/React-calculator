const Button = ({ colorType, children, id }) => {
  return (
    <button id={id} className={"button" + colorType}>
      {children}
    </button>
  );
};

export default Button;
