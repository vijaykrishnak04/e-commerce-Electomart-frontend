/* eslint-disable react/prop-types */
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { MdList } from "react-icons/md";

const Dropdown = ({ selectedOption, onChange, options, defaultLabel }) => {
  // Handler to be called when an option is selected
  const handleMenuItemClick = (value) => {
    // Trigger the onChange prop passed to the Dropdown with the new value
    onChange(value);
  };

  return (
    <>
      <Menu>
        <MenuHandler>
          <Button color="red" variant="filled" style={{padding: '6px'}} className="flex items-center gap-3 rounded-sm">
          <MdList style={{ fontSize: '20px' }}/>
            {selectedOption || defaultLabel}
          </Button>
        </MenuHandler>
        <MenuList>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)} // Call the handler with the option's value
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default Dropdown;
