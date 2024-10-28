import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function FilterSlider({textValues =[],filterName ,filterFunction}) {
    const [selectedValue, setSelectedValue] = useState(textValues[0]);
    const dispatch = useDispatch();

    // Handle value change
    const handleChange = (event) => {
        const index = Number(event.target.value);
        setSelectedValue(textValues[index]); // Get the corresponding text value
        dispatch(filterFunction(textValues[index]));
       /*  filterFunction(textValues[index]); */
        
    };  
  return (
        <div className='flex flex-col capitalize px-3'>
            <span>{filterName}</span>
            <input
                type="range"
                min="0"
                max={textValues.length - 1} // Use the index of the text values
                step="1" // Increment by 1 to move between text values
                value={textValues.indexOf(selectedValue)} // Control the slider with the index of the selected value
                onChange={(e)=>handleChange(e)}
            />
            <p className='font-thin text-lg'>
                {selectedValue}
            </p>
            
        </div>
  )
}
