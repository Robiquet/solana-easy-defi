export interface DropdownOption {
  value: any;
  text: string;
}

const Dropdown = ({
  options,
  placeholder,
  onChange,
}: {
  options: DropdownOption[];
  placeholder: string;
  onChange: (dropdownOption: DropdownOption | undefined) => void;
}) => {
  const handleChange = (event: any) => {
    onChange(options.find((option) => event.target.value == option.value));
  };

  return (
    <select
      onChange={handleChange}
      className="bg-blue-500 py-2 pl-4 text-sm text-white w-44 rounded-md  focus:outline-none focus:appearance-none rounded-full"
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
