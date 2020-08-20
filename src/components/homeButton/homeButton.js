import React from 'react';
import Logo from '../../assets/images/logosimple.svg'
import classes from './homeButton.module.css';

const homeButton = (props) => {

    return (
        <button
            className={classes.logo}>
            <img 
                className={classes.img}
                src={Logo} 
                alt="home" 
                onClick={()=> alert("click")} />
        </button>


    )
}

export default homeButton;