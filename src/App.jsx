import CustomSelect from "./CustomSelect"
import './App.css';
import { useState } from "react";




// input select options
const options =[
    {value: "mango", label: "Mango"},
    {value: "orange", label: "Orange"},
    {value: "banana", label: "Banana"},
    {value: "watermaloon", label: "Watermaloon"},
    {value: "brinzel", label: "Brinzel"},
    {value: "Walton", label: "Walton"},
    {value: "cricket", label: "Cricket"},
    {value: "football", label: "Football"},
    {value: "sokker", label: "Sokker"},
    {value: "tanis", label: "Tanis"},
]




function App() {

  const [selectedValue, setSelectedValue]=useState(null);
  
  const handleChange = (value)=>{
      setSelectedValue(value);
  }

  const handleSearch =(searchText)=>{
    console.log("searchtext---->>",searchText);
  }
   
  return (
      
    <div>
        <h1>Custom Select Component</h1>
         <div className="kzui-custom-select">
            <CustomSelect
            isClearable
            isSearchable
            isDisabled={false}
            options={options}
            value={selectedValue}
            placeholder="Select your item"
            isGrouped={false}
            isMulti ={false}
            onChangeHandler={handleChange}
            onMenuOpen={()=>console.log("Menu open")}
            onSearchHandler={handleSearch}
            />
         </div>
    </div>
  )
}

export default App
