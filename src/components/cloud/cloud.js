import React from 'react';
import classnames from 'classnames';
import classes from './cloud.module.css';
import './cloudPositions.css';



const generatePosition = () => {
    switch (Math.floor(Math.random() * 10)) {
        case 0: {
            return "firstCloudPosition";
        }
        case 1: {
            return "secondCloudPosition";
        }
        case 2: {
            return "thirdCloudPosition";
        }
        case 3: {
            return "fourthCloudPosition";
        }
        case 4: {
            return "fifthCloudPosition";
        }
        case 5: {
            return "sixthCloudPosition";
        }
        case 6: {
            return "seventhCloudPosition";
        }
        case 7: {
            return "eigthCloudPosition";
        }
        case 8: {
            return "ninthCloudPosition";
        }
        case 9: {
            return "tenthCloudPosition";
        }
        default: {
            alert("position generator failed case number");
            break;
        }
    }
}

const cloud = (props) => {

    const positionClass = generatePosition();

    let cloud = "";
    switch (props.size) {
        case "xxl": {
            cloud = (
                <div id="xxl"
                    className={classnames(classes.x1, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            ); break;
        }
        case "xl": {
            cloud = (
                <div id="xl"
                    className={classnames(classes.x5, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            );
            break;
        }
        case "l": {
            cloud = (
                <div id="l"
                    className={classnames(classes.x3, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            );
            break;
        }
        case "s": {
            cloud = (
                <div id="s"
                    className={classnames(classes.x4, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            );
            break;
        }
        case "xs": {
            cloud = (
                <div id="xs"
                    className={classnames(classes.x2, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            );
            break;
        }
        case "form": {
            cloud = (
                    <div>
                        <div className={classes.cloudForm}>{props.children}</div>
                    </div>
            );
            break;
        }
        default: {
            cloud = (
                <div id="l"
                    className={classnames(classes.x3, positionClass)}>
                    <div
                        className={classes.cloud}
                        onClick={props.cloudClick}><h1>{props.topic}</h1></div>
                </div>
            );
            break;
        }

    }

    return (
        <>
            {cloud}
        </>
    )
}



export default cloud;