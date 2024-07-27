
import { useEffect, useState } from "react";
import '../Styles/CustomSelect.css';
import PropTypes from 'prop-types';
import { TiDelete } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
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

    const [selectedValue, setSelectedValue] = useState(value || (isMulti ? [] : null));

    const [isOpen, setIsOpen]=useState(false)
    const [searchText,setSearchText]=useState("")
    const [filteredOptions, setFilteredOptions]=useState(options)

   
// search with lowercase or uppercase do not matter
    useEffect(()=>{
        if(searchText && isSearchable){
            if(isGrouped){
                setFilteredOptions(
                    options.map(group=>({
                        ...group,
                        options: group.options.filter(
                            sOption=>sOption.label.toLowerCase().includes(searchText.toLowerCase())
                        )
                    })).filter(group=>group.options.length >0)
                )
            } else {
                setFilteredOptions(
                  options.filter(option =>
                    option.label.toLowerCase().includes(searchText.toLowerCase())
                  )
                );
              }
        }else {
            setFilteredOptions(options);
          }
       
    },[searchText, options, isSearchable,isGrouped])

// Selected value

useEffect(() => {
    setSelectedValue(value || (isMulti? []: null));
  }, [value,isMulti]);


//   option clickable functionality
const handleOptionClick = (option) => {
    if (isMulti) {
      const newValue = selectedValue && selectedValue.includes(option.value)
        ? selectedValue.filter(val => val !== option.value)
        : [...(selectedValue || []), option.value];
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(option.value);
      onChangeHandler(option.value);
      setIsOpen(false);
    }
  };

// clear all value
  const handleClearAll = (e) => {
    e.stopPropagation()
    setSelectedValue(isMulti ?[]: null);
    onChangeHandler(isMulti? []: null);
  };

//   delete single value
 const handleDlete =(e,optionValue)=>{
    e.stopPropagation()
    const newValue = selectedValue.filter(vl=>vl !== optionValue);
    setSelectedValue(newValue)
    onChangeHandler(newValue)
 }
  
  
  return (
    <div className={`kzui-custom ${isDisabled ? 'kzui-custom--disabled' : ''}`}>
        <p>Select your option here</p>
    <div className="kzui-custom__control" onClick={() => !isDisabled && setIsOpen(!isOpen)}>
     {/* select options here */}
    
      <div className="kzui-custom__value">
        {selectedValue && isMulti ? (
          selectedValue.map(val => (
            <span key={val} className="kzui-custom__multi-value">
              {options.find(option => option.value === val)?.label}
              <button onClick={(e) => handleDlete(e, val)} className="kzui-custom__delete"><TiDelete/></button>
            </span>
          ))
        ) : (
          selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : placeholder
        )}
      </div>
      {isClearable && selectedValue && (
        <button className="kzui-custom__clear" onClick={handleClearAll}><MdDelete /></button>
      )}
    </div>
    {/* search options here */}
    {isOpen && !isDisabled && (
   
    <div className="kzui-custom__menu">
        {isSearchable && (
          <input
            type="text"
            placeholder="search here"
            className="kzui-custom__search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              onSearchHandler(e.target.value);
            }}
          />
        )}
        {isGrouped ? (
          filteredOptions.map(group => (
            <div key={group.label} className="kzui-custom__group">
              <div className="kzui-custom__group-label">{group.label}</div>
              {group.options.map(option => (
                <div
                  key={option.value}
                  className={`kzui-custom__option ${selectedValue && selectedValue.includes(option.value) ? 'kzui-custom__option--selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          ))
        ) : (
          filteredOptions.map(option => (
            <div
              key={option.value}
              className={`kzui-custom__option ${selectedValue && selectedValue.includes(option.value) ? 'kzui-custom__option--selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))
        )}
      </div>
    )}
  </div>
  )
}


CustomSelect.propTypes = {
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isDisabled: PropTypes.bool,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    placeholder: PropTypes.string,
    isGrouped: PropTypes.bool,
    isMulti: PropTypes.bool,
    onChangeHandler: PropTypes.func,
    onMenuOpen: PropTypes.func,
    onSearchHandler: PropTypes.func,
  };

 

export default CustomSelect