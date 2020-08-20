import React, { Component } from 'react';
import MenuHandle from '../../components/menuHandle/menuHandle';
import MobilePopUpMenu from '../../components/mobilePopUpMenu/mobilePopUpMenu';
import { CSSTransition } from 'react-transition-group';
import './transitions.css';
import classes from './mobileMenuContainer.module.css';

class mobileMenuContainer extends Component {
    state = {
        active: false,

    }

    menuClickedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, active: !prevState.active }))
    }


    render() {
        return (
            <div className={classes.div}>
                <MobilePopUpMenu
                    active={this.state.active}
                    closeClicked={() => this.menuClickedEventHandler()} />
                <CSSTransition
                    in={this.props.showHamburger}
                    timeout={2000}
                    classNames="showHamburger"
                    unmountOnExit>
                    <MenuHandle
                        show={!this.state.active}
                        onClick={() => this.menuClickedEventHandler()} />
                </CSSTransition>
            </div>
        )
    }
}

export default mobileMenuContainer;