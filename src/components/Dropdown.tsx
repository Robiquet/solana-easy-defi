interface DropdownOptions {
  value: any;
  text: string;
}

const Dropdown = ({
  options,
  placeholder,
}: {
  options: DropdownOptions[];
  placeholder: string;
}) => {
  return (
    <select className="bg-blue-500 py-2 pl-4 text-sm text-white w-44 rounded-md  focus:outline-none focus:appearance-none rounded-full">
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((item) => (
        <option value={item.value}>{item.text}</option>
      ))}
    </select>
  );
};

export default Dropdown;
