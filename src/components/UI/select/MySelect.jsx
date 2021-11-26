import React from 'react';
import "./MySelect.css";

const MySelect = (props) => {
    return (
        <select className="mySelect"
                value={props.value}
                onChange={event => props.onChange(event.target.value)}
        >
            <option disabled='true' value="">{props.defaultValue}</option>
            {props.options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;