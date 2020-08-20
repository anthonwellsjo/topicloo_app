import React from 'react';
import classes from './howToButton.module.css';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

const howToButton = (props) => {
    return (
        <Zoom
            in={props.show}>
            <div
                className={classes.fabdiv}
                style={props.blur ? { filter: "blur(2px)" } : null}>
                <Fab
                    className={classes.fab}
                    size="medium"
                    color={props.color}
                    aria-label="info"
                    style={props.blur ? { filter: "blur(2px)" } : null}

                    onClick={props.infoClicked}>
                    <h2 className={classes.fabhelp}>?</h2>
                </Fab>
            </div>
        </Zoom>
    )
}

export default howToButton;