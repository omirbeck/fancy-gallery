import React from 'react';

const Sidebar = ({handleClick}:{handleClick: (query?: string) => void}) => {
    return (
        <div className="tags">
            <button onClick={() => handleClick("cats")}>Cats</button>
            <button onClick={() => handleClick("dogs")}>Dogs</button>
            <button onClick={() => handleClick("coffee")}>Coffee</button>
            <button onClick={() => handleClick("react")}>React</button>
            <button onClick={() => handleClick()}>Random</button>
        </div>
    )
}

export default Sidebar;
