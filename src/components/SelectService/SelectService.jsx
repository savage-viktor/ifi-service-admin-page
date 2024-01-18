import Select from "react-select";

function SelectService({ options, onChange }) {
  return (
    <Select
      onChange={onChange}
      className="basic-single"
      // defaultValue={options[0]}
      isSearchable="true"
      name="color"
      options={options}
    />
  );
}

export default SelectService;
