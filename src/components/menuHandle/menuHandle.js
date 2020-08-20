import React from 'react';
import menuHandleIcon from '../../assets/images/icons/menu_handle.svg'
import classes from './menuHandle.module.css';
import { CSSTransition } from 'react-transition-group';
import './transitions.css';

const menuHandle = (props) => {
    return (
        <CSSTransition
            in={props.show}
            appear={true}
            enter={true}
            timeout={1000}
            classNames={"menuHandle"}
            unmountOnExit>
            <div
                className={classes.div}>

                <img
                    onTouchEnd={props.onClick}
                    className={classes.icon}
                    src={menuHandleIcon}
                    alt={"menu handle"}
                />
            </div >
        </CSSTransition>

    )
}

export default menuHandle;