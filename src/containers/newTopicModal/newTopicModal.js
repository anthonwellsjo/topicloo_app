import React, { Component, Fragment } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import Slider from '@material-ui/core/Slider';
import EmojiSelector from '../../components/emojiSelectButtons/emojiSelectButtons';
import classes from './newTopicModal.module.css';
import HowToButton from '../../components/howToButton/howToButton';
import BackDrop from '../../components/infoBackDrop/infoBackDrop';

class newTopicModal extends Component {
    state = {
        showHowToButton: false,
        infoButtonPressed: false
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.show) {
            if (prevProps.show !== this.props.show) {
                setTimeout(() => {
                    this.setState(prevState => ({ ...prevState, showHowToButton: true }))
                }, 500)

            }
        }
    }

    onbackdropClickedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, infoButtonPressed: false, infoNumber: 0 }))
    }
    onInfoButtonPressedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, infoButtonPressed: !prevState.infoButtonPressed }))
    }

    render() {
        const infoButtonColor = this.state.infoButtonPressed ? "default" : "secondary";
        return (
            <Fragment>
                <Modal show={this.props.show} onHide={this.props.handleClose} centered>
                    <CSSTransition
                        in={this.state.infoButtonPressed}
                        appear={true}
                        timeout={300}
                        classNames="infofade"
                        unmountOnExit>
                        <BackDrop
                            clicked={this.onbackdropClickedEventHandler} />
                    </CSSTransition>
                    <Modal.Header>
                        <HowToButton
                            show={this.state.showHowToButton}
                            color={infoButtonColor}
                            blur={(this.state.infoButtonPressed)}
                            infoClicked={this.onInfoButtonPressedEventHandler} />
                        <Modal.Title>
                            <Row>
                                <Col>
                                    <input
                                        value={this.props.topicValue}
                                        placeholder="Topic headline"
                                        onChange={(e) => this.props.onTopicChange(e)}></input>
                                </Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input
                                    className={classes.inputcomment}
                                    value={this.props.commentValue}
                                    placeholder="Explanatory secondary headline"
                                    onChange={(e) => this.props.onExplanatoryCommentChange(e)}
                                ></input>
                            </Col>
                            <br />
                            <br />
                        </Row>
                        <Row>
                            <Col>
                                <h4>Reactions</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <EmojiSelector
                                    happyIsChecked={this.props.happyIsChecked}
                                    happyToggleChecked={this.props.happyToggleChecked}
                                    angryIsChecked={this.props.angryIsChecked}
                                    angryToggleChecked={this.props.angryToggleChecked}
                                    sadIsChecked={this.props.sadIsChecked}
                                    sadToggleChecked={this.props.sadToggleChecked}
                                    curiousIsChecked={this.props.curiousIsChecked}
                                    curiousToggleChecked={this.props.curiousToggleChecked}
                                />
                            </Col>
                            <br />
                            <br />
                            <br />
                            <br />
                        </Row>
                        <Row>
                            <Col>
                                <h4>Timeout</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Slider
                                    defaultValue={25}
                                    value={this.props.currentTimeout}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={1}
                                    min={5}
                                    max={45}
                                    valueLabelDisplay={"auto"}
                                    onChange={(event, value) => this.props.onSliderChangeEventHandler(event, value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <label>{this.props.timeout} seconds</label>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.props.handleSaveClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal >
            </Fragment>
        )
    }
}

export default newTopicModal;