import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'Test',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg focus:outline-none transition duration-200';

  const variantStyles = {
    primary: 'bg-[#163c82] text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-400 text-gray-800 hover:bg-gray-100',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const finalClassName = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    { 'opacity-50 cursor-not-allowed': disabled },
    className
  );

  return (
    <button
      type={type}
      className={finalClassName}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
