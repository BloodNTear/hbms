import './InputCase.css';

import { useState, useEffect } from 'react';

function InputCase({title, field, value, onSubmit}){
    
    const [inputValue, setInputValue] = useState(() => {
        return value
    });

    useEffect(() => {
        setInputValue(value);
    },[value])

    function handleValueChange(newValue){
        setInputValue(newValue);
    }

    function handleBlur(){
        onSubmit && onSubmit(field, inputValue);
    }

    return(
        <div className="input-case">
            <label><b>{title}</b></label>
            <input 
                type='number'
                value={inputValue}
                onChange={(e) => handleValueChange(e.target.value)}
                onBlur={handleBlur}
                className='transparent-input'
            />
        </div>
    )
};

export default InputCase;