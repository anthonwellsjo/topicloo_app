import React from 'react';
import cloudySky from '../../assets/images/cloudySky.jpg';
import classes from './background.module.css';

const background = () => {
    return (
        <div
            className={classes.background}>
            <img className={classes.img} alt="background" src={cloudySky} />
        </div>
    )
}


export default background;