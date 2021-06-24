export const calculateByOperator = expression => {
  if (expression.length === 1) return;
  const [operand1, operator, operand2] = expression;
  if (operator === "+") return Number(operand1) + Number(operand2);
  if (operator === "-") return Number(operand1) - Number(operand2);
  if (operator === "÷") return Number(operand1) / Number(operand2);
  if (operator === "x") return Number(operand1) * Number(operand2);
  if (operator === "%") return Number(operand1) % Number(operand2);
};
