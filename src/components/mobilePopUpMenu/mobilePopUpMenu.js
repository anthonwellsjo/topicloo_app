import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './mobilePopUpMenu.module.css';
import { CSSTransition } from 'react-transition-group';
import closeButton from '../../assets/images/icons/close.svg';
import './transitions.css';


class mobilePopUpMenu extends Component {
    render() {
        return (
            <CSSTransition
                in={this.props.active}
                appear={true}
                enter={true}
                timeout={{enter: 500, exit: 0}}
                classNames={"popUpMenu"}
                unmountOnExit>
                <div className={classes.div}>
                    <img
                        onClick={this.props.closeClicked}
                        className={classes.closeBtn}
                        src={closeButton}
                        alt={"close"} />
                    <NavLink
                        to='/caviar'
                        activeClassName={classes.active}>
                        <h1>
                            Profile
                    </h1>
                    </NavLink>
                    <NavLink
                        to='/caviar'
                        activeClassName={classes.active}>
                        <h1>
                            Topics
                    </h1>
                    </NavLink>
                    <NavLink
                        to='/caviar'
                        activeClassName={classes.active}>
                        <h1>
                            Topics answered
                    </h1>
                    </NavLink>
                </div>
            </CSSTransition >
        )
    }
}

export default mobilePopUpMenu;