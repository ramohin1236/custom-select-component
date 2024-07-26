/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './CustomSelect.css';


const CustomSelect = ({
    isClearable,
    isSearchable,
    isDisabled,
    options,
    value,
    placeholder,
    isGrouped,
    isMulti,
    onChangeHandler,
    onMenuOpen,
    onSearchHandler
}) => {

    const [selectedValue,setSelectedValue]=useState(value)
    const [isOpen, setIsOpen]=useState(false)
    const [searchText,setSearchText]=useState("")
    const [filteredOptions, setFilteredOptions]=useState([options])

    
// search with lowercase or uppercase
    useEffect(()=>{
        if(searchText && isSearchable){
            setFilteredOptions(
                options.filter(option=>
                    option.label.toLowerCase().includes(searchText.toLowerCase())
                )
            )
        }
        else{
            setFilteredOptions(options)
        }
    },[searchText, options, isSearchable])

// Selected value

useEffect(() => {
    setSelectedValue(value);
  }, [value]);


  const handleOptionClick = (option) => {
    if (isMulti) {
      if (selectedValue.includes(option.value)) {
        setSelectedValue(selectedValue.filter(val => val !== option.value));
        onChangeHandler(selectedValue.filter(val => val !== option.value));
      } else {
        setSelectedValue([...selectedValue, option.value]);
        onChangeHandler([...selectedValue, option.value]);
      }
    } else {
      setSelectedValue(option.value);
      onChangeHandler(option.value);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSelectedValue(isMulti ? [] : null);
    onChangeHandler(isMulti ? [] : null);
  };

  
  return (
    <div className={`kzui-custom ${isDisabled ? 'kzui-custom--disabled' : ''}`}>
      <div className="kzui-custom__control" onClick={() => !isDisabled && setIsOpen(!isOpen)}>
        <div className="kzui-custom__value">
          {selectedValue
            ? isMulti
              ? selectedValue.map(val => options?.find(option => option.value === val).label).join(', ')
              : options?.find(option => option.value === selectedValue).label
            : placeholder}
        </div>
        {isClearable && selectedValue && (
          <button className="kzui-custom__clear" onClick={handleClear}>x</button>
        )}
      </div>
      {isOpen && !isDisabled && (
        <div className="kzui-custom__menu">
          {isSearchable && (
            <input
              type="text"
              placeholder='search here'
              className="kzui-custom__search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                onSearchHandler(e.target.value);
              }}
            />
          )}
          {filteredOptions?.map(option => (
            <div
              key={option.value}
              className={`kzui-custom__option ${selectedValue === option.value ? 'kzui-custom__option--selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect