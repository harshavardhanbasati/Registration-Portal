const InputField = ({ label, name, type = "text", error, ...props }) => {
  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={name} className="text-xs font-semibold text-[#333c47]">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
        className={`h-10 w-full rounded border px-[11px] text-[13px] text-[#252b33] outline-none placeholder:text-[#929ba6] focus:border-[#426b91] focus:ring-2 focus:ring-[#426b91]/15 ${
          error ? "border-[#b84d4d]" : "border-[#cbd1d9]"
        }`}
      />
      {error && (
        <span className="text-[11px] text-[#a13232]" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;