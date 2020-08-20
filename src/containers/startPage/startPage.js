import React, { Component } from 'react';
import classes from './startPage.module.css';
import { CSSTransition } from 'react-transition-group';
import { Modal, Button, Image, Row, Col, Container, Spinner, Overlay, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Frame from '../../components/frame/frame';
import './transitions.css';
import Logo from '../../assets/images/logosimple.png';
import Backdrop from '../../components/infoBackDrop/infoBackDrop';
import HowToButton from '../../components/howToButton/howToButton';


class startPage extends Component {
    constructor(props) {
        super(props);
        this.idInputRef = React.createRef();
        this.createButtonRef = React.createRef();
    }
    state = {
        topicCloudID: "",
        topicIdSearchIsBusy: false,
        topicIdWasFound: false,
        topicIdWasInvalid: false,
        infoButtonPressed: false,
        infoNumber: 0,
        showHowTo: false
    }

    TOPIC_ID_WAS_FETCHED_FROM_URL = false;
    TOPIC_IDS_HAS_BEEN_VERIFIED = false;

    //LIFE CYCLES

    componentDidMount() {
        
        if (this.props.linkedtopicid && !this.TOPIC_ID_WAS_FETCHED_FROM_URL) {
            this.setState(prevState => ({ ...prevState, topicIdSearchIsBusy: true, topicCloudID: this.props.linkedtopicid }))
            this.TOPIC_ID_WAS_FETCHED_FROM_URL = true;
            this.verifyTopicId(this.state.topicCloudID);
        }
    }

    componentDidUpdate() {
        if (this.state.topicIdSearchIsBusy && !this.TOPIC_IDS_HAS_BEEN_VERIFIED) {
            console.log("verify on component did update", this);
            this.verifyTopicId(this.state.topicCloudID.toString());
            this.TOPIC_IDS_HAS_BEEN_VERIFIED = true;
        }
    }
    //GO-button properties:
    variant = null;
    buttonText = "";
    buttonIsDisabled = true;
    createButtonVariant = "success";

    //Event Handlers

    onChangeEventHandler = (e) => {
        const newValue = e.target.value;
        this.setState(prevState => ({ ...prevState, topicIdSearchIsBusy: true, topicCloudID: newValue }));
        this.TOPIC_IDS_HAS_BEEN_VERIFIED = false;

    }
    onInfoButtonPressedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, infoButtonPressed: !prevState.infoButtonPressed, infoNumber: 0 }));
    }
    onbackdropClickedEventHandler = () => {
        if (this.state.infoNumber < 1) {
            this.nextInfoNumber();
        } else {
            this.setState(prevState => ({ ...prevState, infoButtonPressed: false, infoNumber: 0 }))
        }
    }

    //Functions
    shouldInfoBeShown = info => {
        if (this.state.infoButtonPressed) {
            switch (info) {
                case "input": {
                    if (this.state.infoNumber === 0) {
                        return true;
                    } else { return false; }
                }
                // case "welcome": {
                //     if (this.state.infoNumber === 0) {
                //         return true;
                //     } else { return false; }
                // }
                case "create": {
                    if (this.state.infoNumber === 1) {
                        return true;
                    } else { return false; }
                }
                default: {
                    return;
                }
            }
        } else {
            return false;
        }
    }
    nextInfoNumber = () => {
        if (this.state.infoNumber < 3) {
            this.setState(prevState => ({ ...prevState, infoNumber: prevState.infoNumber + 1 }));
        } else {
            this.setState(prevState => ({ ...prevState, infoNumber: 0 }));
        }
    }
    lastInfoNumber = () => {
        alert("back");
        if (this.state.infoNumber > 0) {
            this.setState(prevState => ({ ...prevState, infoNumber: prevState.infoNumber - 1 }));
        }
    }
    verifyTopicId = value => {
        console.log("verify topic id", this.props.topicidsavailable, "value", value);
        if (this.props.topicidsavailable.includes(value)) {
            this.setState(prevState => ({ ...prevState, topicIdWasFound: true, topicIdWasInvalid: false, topicIdSearchIsBusy: false }))
        } else {
            this.setState(prevState => ({ ...prevState, topicIdWasFound: false, topicIdWasInvalid: false }))
            setTimeout(() => {
                if (!this.state.topicIdWasFound) {
                    this.setState(prevState => ({ ...prevState, topicIdWasInvalid: true, topicIdWasFound: false, topicIdSearchIsBusy: false }))
                }
            }, 1500);
        }
    }

    setGoButtonProperties = () => {
        if (this.state.topicIdWasFound) {
            this.variant = "success";
            this.buttonText = "GO";
            this.buttonIsDisabled = false;
            this.createButtonVariant = "secondary";

        }
        if (this.state.topicIdWasInvalid) {
            this.variant = "danger";
            this.buttonText = "NOPE";
            this.buttonIsDisabled = true;
            this.createButtonVariant = "success";
        }
        if (!this.state.topicIdWasFound && !this.state.topicIdWasInvalid) {
            this.variant = '';
            this.buttonText = "";
            this.buttonIsDisabled = true;
            this.createButtonVariant = "success";
        }
    }


    render() {
        const showInputOverlay = this.shouldInfoBeShown("input");
        const showCreateButtonOverlay = this.shouldInfoBeShown("create");
        const infoButtonColor = this.state.infoButtonPressed ? "default" : "secondary";
        this.setGoButtonProperties();
        console.log("topic id in startpage", this.props.linkedtopicid)
        return (
            <Frame>
                <CSSTransition
                    in={this.props.show}
                    appear={true}
                    timeout={300}
                    classNames="startPage"
                    onEntered={() => this.setState(prevState => ({...prevState, showHowTo: true}))}
                    unmountOnExit
                >
                    <Modal
                        show={this.props.show}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <CSSTransition
                            in={this.state.infoButtonPressed || this.state.showWelcomeInfo}
                            appear={true}
                            timeout={300}
                            classNames="infofade"
                            unmountOnExit>
                            <Backdrop
                                clicked={this.onbackdropClickedEventHandler} />
                        </CSSTransition>
                        <HowToButton
                        show={this.state.showHowTo}
                        color={infoButtonColor}
                        blur={(this.state.infoButtonPressed || this.state.showWelcomeInfo)}
                        infoClicked={this.onInfoButtonPressedEventHandler}
                        />
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col className="text-center">
                                        <Image src={Logo} />
                                        <br />
                                        <br />
                                        <p>ENTER A TOPICLOO ID: </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <input
                                            max={9999}
                                            type="number"
                                            ref={this.idInputRef}
                                            onChange={e => this.onChangeEventHandler(e)}
                                            value={this.state.topicCloudID}>
                                        </input>
                                        <Overlay target={this.idInputRef.current} show={showInputOverlay} placement="top">
                                            {(props) => (
                                                <Tooltip id="overlay-example" {...props}
                                                    onClick={this.nextInfoNumber}>
                                                    If you have a TOPICLOO ID, insert it here to access an ongoing survey.
                                                </Tooltip>
                                            )}
                                        </Overlay>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <NavLink
                                            to={`/cloud/id/${this.state.topicCloudID}`}>
                                            <Button variant={this.variant}
                                                className={classes.goButton}

                                                onClick={() => this.props.gobuttonclicked(this.state.topicCloudID)}
                                                disabled={this.buttonIsDisabled}>
                                                {this.state.topicIdSearchIsBusy && <Spinner
                                                    onClick={(e) => e.preventDefault()}
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />}{this.buttonText}
                                                <span className="sr-only">Loading...</span>
                                            </Button>
                                            {' '}
                                        </NavLink>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="text-center">
                                        <NavLink to={`/cloud/create`}>
                                            <Button
                                                ref={this.createButtonRef}
                                                variant={this.createButtonVariant}
                                                onClick={this.props.createbuttonclicked}
                                                className={classes.newButton}>HOST A TOPICLOO</Button>
                                            <Overlay onClick={this.nextInfoNumber} target={this.createButtonRef.current} show={showCreateButtonOverlay} placement="top">
                                                {(props) => (
                                                    <Tooltip id="overlay-example" {...props}>
                                                        Cick here to create a new TOPICLOO survey.
                                                    </Tooltip>
                                                )}
                                            </Overlay>
                                        </NavLink>
                                    </Col>
                                </Row>
                            </Container>
                        </Modal.Body>
                    </Modal>
                </CSSTransition>
            </Frame >
        )
    }
}

export default startPage;



/*
<div className={classes.Frame}>
                        <h1>{this.state.topicCloudID}</h1>
                        <label>Enter code:</label>
                        <input
                            max={9999}
                            type="number"
                            onChange={e => this.onChangeEventHandler(e)}></input>
                        <NavLink
                            to={`/cloud/id/${this.state.topicCloudID}`}>
                            <button
                                className={classes.goButton}
                                onClick={() => this.props.goButtonClicked(this.state.topicCloudID)}
                            >GO!</Button>
                        </NavLink>
                        <NavLink to={`/cloud/create`}>
                            <button
                                onClick={this.props.createButtonClicked}
                                className={classes.newButton}>or create a new topic cloud</Button>
                        </NavLink>
                    </div>
*/