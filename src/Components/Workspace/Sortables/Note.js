import React from 'react';
import './Sortables.css';


const Note = props => {
    
    const { item, handleClick } = props;


    return (
        <li className="note" onClick={() => handleClick(item.id)}>
            {item.name}
        </li>
    )
}

export default Note;