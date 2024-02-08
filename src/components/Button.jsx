import React from 'react';

const Button = ({types,  text, onClick, className, disabled }) => {
  return (
    <button
    type={types}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
