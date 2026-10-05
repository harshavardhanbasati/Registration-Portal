const Button = ({ children, type = "button" }) => {
  return (
    <button
      type={type}
      className="w-full rounded-lg bg-indigo-600 px-4 py-2
                 font-semibold text-white transition
                 hover:bg-indigo-700"
    >
      {children}
    </button>
  );
};

export default Button;