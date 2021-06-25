const Toggle = () => {
  return (
    <div className="toggle">
      <div className="toggle__track">
        <div className="toggle__mode toggle__mode--dark">🌜</div>
        <div className="toggle__mode toggle__mode--light">🌞</div>
      </div>
      <div className="toggle__thumb" />
    </div>
  );
};

export default Toggle;
