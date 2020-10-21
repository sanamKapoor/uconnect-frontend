import React from 'react'

function InputElement({inputType, inputRef, inputName, inputValue, minLength, maxLength, onChangeHandler, onKeyPressHandler, checkText, inputText, classes}) {

    const inputRestrictions = e => {
        var regex = new RegExp(/^[ A-Za-z0-9_!@#$&():;"',./?|-]*$/);
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
           return true;
        }
        e.preventDefault();
        return false;
    }

    return (
            <input 
                type={inputType} 
                name={inputName} 
                value={inputValue}
                minLength={minLength}
                maxLength={maxLength}
                ref={inputRef}
                onChange={onChangeHandler}
                onKeyPress={checkText ? inputRestrictions : onKeyPressHandler}
                className={classes} 
                placeholder={inputText} 
            />
    )
}

export default InputElement
