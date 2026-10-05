const InputField = ({ label, name, type = "text", ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        {...props}
        className="w-full rounded-lg border border-gray-300 px-4 py-2
                   outline-none focus:border-indigo-500 focus:ring-2
                   focus:ring-indigo-200"
      />
    </div>
  );
};

export default InputField;