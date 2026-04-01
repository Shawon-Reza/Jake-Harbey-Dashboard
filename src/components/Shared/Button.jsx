const Button = ({ children, className = "" }) => {
  return (
    <button
      className={`
        px-6 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300 ease-in-out
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
