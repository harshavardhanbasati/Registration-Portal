const Button = ({ children, type = "button", disabled = false, onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="mt-0.5 min-h-10 w-full rounded border border-[#315674] bg-[#365f82] px-4 text-[13px] font-semibold text-white hover:border-[#284b69] hover:bg-[#2e5374] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426b91] disabled:cursor-not-allowed disabled:opacity-55"
    >
      {children}
    </button>
  );
};

export default Button;