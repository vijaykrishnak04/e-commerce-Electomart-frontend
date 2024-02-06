const Dropdown = ({ selectedOption, onChange, options, defaultLabel }) => {
    return (
        <select
            value={selectedOption}
            onChange={onChange}
            className="mt-4 w-full md:w-96 p-2 border border-gray-500 rounded"
        >
            <option value="">{defaultLabel}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Dropdown;