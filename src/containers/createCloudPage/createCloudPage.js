import React, { Component, Fragment, createRef } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from '@material-ui/core/Zoom';

import { Modal, Row, Col, Container, Image, Button } from 'react-bootstrap'

import classes from './createCloudPage.module.css';
import classnames from 'classnames';

import axiosTopics from '../../axios/axios-topics';

import Frame from '../../components/frame/frame';
import Mailform from '../../components/mailForm/mailForm';
import Logo from '../../assets/images/logosimple.png';
import "./transitions.css";
import NewTopicModal from '../newTopicModal/newTopicModal';
import MiniEmojis from '../../components/emojisInSubjectButton/emojiosInSubjectButton';
import NameTopiclooModal from '../../components/addTopiclooNameModal/addTopiclooNameModal';




class createCloudPage extends Component {

    state = {
        input: "",
        subjects: [],
        GENERATED_ID_CONFIRMED: false,
        connectionError: false,
        showTopicButtonModal: false,
        showNewTopicModal: false,
        showNameTopiclooModal: false,
        currentSubject: "",
        answeringSpeedString: "Enough time for a well thought answer.",
        topiclooNames: { userName: "", topiclooName: "" },
        currentTopicSettingsTemp: {
            topic: "",
            timeout: 25,
            emojis: {
                happy: false,
                angry: false,
                sad: false,
                curious: false
            },
            comment: ""
        },
        topicsSettingsDefinitive: {},
        emojiAlert: "Happy",
        emojiInProp: false,
        deleteActive: false,
    }

    EXISTING_SUBJECT_BEING_MODIFIED = false;
    CLICKED_SUBJECT_REFERENCE = {};
    deleteFocus = createRef();
    CURRENT_TOPIC_HAS_BEEN_MODIFIED = false;
    TOPICS_SETTINGS_DEFINITIVE = {};
    GENERATED_ID = 0;
    DB_TOPIC_IDS = [];
    EMOJI_ALERT_RENDER = "";

    //life cycles

    componentDidMount() {
        axiosTopics.get('.json')
            .then(resp => {
                console.log("then in axios", Object.keys(resp.data));
                if (this.DB_TOPIC_IDS) {
                    this.DB_TOPIC_IDS = Object.keys(resp.data);
                    do {
                        this.GENERATED_ID = this.randomizeTopicId();
                    }
                    while (this.DB_TOPIC_IDS.includes(this.GENERATED_ID))
                }
            })
            .catch(error => {
                console.log("catch in axios topics.get", error);
                this.setState(prevState => ({ ...prevState, connectionError: true }))
            })
            .finally(() => {
                console.log("finally axios topics");
                this.setState(prevState => ({ ...prevState, GENERATED_ID_CONFIRMED: true }));
            })
    }
    componentDidUpdate(prevProps, prevState) {
        this.emojiAlertHandler(prevState);
    }

    //function

    emojiAlertHandler = prevState => {
        if (prevState.currentTopicSettingsTemp) {
            if (prevState.currentTopicSettingsTemp.emojis !== this.state.currentTopicSettingsTemp.emojis) {
                Object.keys(this.state.currentTopicSettingsTemp.emojis).forEach(emoji => {
                    if (this.state.currentTopicSettingsTemp.emojis[`${emoji}`] && (this.state.currentTopicSettingsTemp.emojis[`${emoji}`] !== prevState.currentTopicSettingsTemp.emojis[`${emoji}`])) {
                        // this.renderNewAlert(emoji);
                        this.setState(prevState => ({ ...prevState, emojiAlert: emoji, emojiInProp: true }));
                    }
                })
            }
        }
    }

    postTopicCloud() {
        if (this.state.GENERATED_ID_CONFIRMED) {
            const postPackage = {topicsSettings: this.state.topicsSettingsDefinitive, topiclooNames: this.state.topiclooNames}
            axiosTopics.post(`/cloud_${this.GENERATED_ID}.json`, postPackage)
                .then((resp) => {
                    console.log("post to db done", resp);
                })
                .catch((error) => console.log(error.response.request._response));
        }
    }

    randomizeTopicId = () => {
        console.log("random id generation");
        return Math.floor(Math.random() * 1000000);
    }

    capitalizeSubjects = array => {
        return array.map(subject => {
            return (subject.trim().split(' ').map(word => {
                if (word.length > 0) {
                    return word[0].toUpperCase() + word.slice(1).toLowerCase()
                }
            }
            ).join(' '))
        }
        );
    }
    capitalizeSubject = subject => {
        return (subject.split(' ').map(word => {
            if (word.length > 0) {
                return word[0].toUpperCase() + word.slice(1).toLowerCase()
            } else { return [""] }
        }
        ).join(' ')
        );
    }

    capitalizeComment = word => {
        if (word.length > 0) {
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        }
    }

    isLetter = char => {
        return char.length === 1 && char.match(/[a-z]/i);
    }
    updateTopicSettings = (topic = null, timeout = null, emojis = null, comment = null) => {
        this.CURRENT_TOPIC_HAS_BEEN_MODIFIED = true;
        if (topic !== null) {
            this.setState(prevState => ({
                ...prevState, currentTopicSettingsTemp: {
                    ...prevState.currentTopicSettingsTemp, topic: topic,
                }
            }))
        }
        if (timeout !== null) {
            this.setState(prevState => ({
                ...prevState, currentTopicSettingsTemp: {
                    ...prevState.currentTopicSettingsTemp, timeout: timeout,
                }
            }))
        }
        if (emojis !== null) {
            console.log("emoji setting save needs to be defined");
        }
        if (comment !== null) {
            this.setState(prevState => ({
                ...prevState, currentTopicSettingsTemp: {
                    ...prevState.currentTopicSettingsTemp, comment: comment
                }
            }))
        }
    }
    syncStateSubjectsWithTopicsSettingsObjects = () => {
        this.state.subjects.forEach(topic => {
            if (!Object.keys(this.TOPICS_SETTINGS_DEFINITIVE).includes(topic) && topic.length > 0) {
                this.TOPICS_SETTINGS_DEFINITIVE[`${topic}`] = {
                    timeout: 25,
                    emojis: {
                        happy: false,
                        angry: false,
                        sad: false,
                        curious: false
                    },
                    comment: ""
                }
            }
        })
    }

    hasOneOrMoreSubjects = () => {
        return Object.keys(this.state.topicsSettingsDefinitive).length > 0
    }

    deleteTopic = subject => {
        let updatedTopicDef = { ...this.state.topicsSettingsDefinitive };
        delete updatedTopicDef[`${subject}`];
        this.setState(prevState => ({ ...prevState, topicsSettingsDefinitive: updatedTopicDef }))
    }

    //event handlers

    onEmojiAlertEnteredEventHandler = () => {
        this.setState(prevState => ({ ...prevState, emojiInProp: false }));
    }
    doneButtonClickedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, showNameTopiclooModal: true }))
    }
    onTopicButtonClicked = subject => {
        console.log("topic button clicked", subject);
        if (!this.state.deleteActive) {
            this.EXISTING_SUBJECT_BEING_MODIFIED = true;
            this.CLICKED_SUBJECT_REFERENCE = subject;
            const currentTopicSettings = { ...this.state.topicsSettingsDefinitive[`${subject}`] };
            this.setState(prevState => ({ ...prevState, showNewTopicModal: true, currentTopicSettingsTemp: currentTopicSettings }));
        } else {
            this.deleteTopic(subject);
        }
    }
    onCloseEventHandler = () => {
        console.log("close");
        this.setState(prevState => ({ ...prevState, showTopicButtonModal: false }))
    }


    //new add topic modal event handlers

    onToggleCheckedEventHandler = emoji => {
        this.setState(prevState => ({
            ...prevState, currentTopicSettingsTemp:
            {
                ...prevState.currentTopicSettingsTemp, emojis: {
                    ...prevState.currentTopicSettingsTemp.emojis, [`${emoji}`]: !this.state.currentTopicSettingsTemp.emojis[`${emoji}`]
                }
            }
        }))
        this.CURRENT_TOPIC_HAS_BEEN_MODIFIED = true;
    }
    onAddButtonClickedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, deleteActive: false, currentTopicSettingsTemp: { topic: "", comment: "", emojis: { happy: false, sad: false, angry: false, curious: false }, timeout: 25 }, showNewTopicModal: true }));
    }
    onTopicChangeEventHandler = event => {
        let value = event.target.value;
        if (value) {
            value = this.capitalizeSubject(value);
        } else { value = "" }
        this.updateTopicSettings(value, null, null, null);
    }
    onSliderChangeEventHandler = (event, value) => {
        this.updateTopicSettings(null, value, null, null);
    }
    onExplanatoryTopicChangeEventHandler = event => {
        let value = event.target.value;
        if (value) {
            value = this.capitalizeComment(value);
        } else { value = "" }
        this.updateTopicSettings(null, null, null, value);
    }
    onHandleClose = () => {

    }
    onHandleSaveClose = () => {
        console.log("save close event handler");

        if (this.CURRENT_TOPIC_HAS_BEEN_MODIFIED) {
            let newTopicsSettingsDef = { ...this.state.topicsSettingsDefinitive };
            console.log("first newTopicsSettingDef", newTopicsSettingsDef);
            console.log("clicked sub ref", this.CLICKED_SUBJECT_REFERENCE);
            if (this.EXISTING_SUBJECT_BEING_MODIFIED) {
                console.log("existirng subject being modifier");
                if (this.state.currentTopicSettingsTemp.topic !== this.CLICKED_SUBJECT_REFERENCE) {
                    console.log("deleting old subject name")
                    delete newTopicsSettingsDef[`${this.CLICKED_SUBJECT_REFERENCE}`];
                    console.log("after delete newTopicsSettingDef", newTopicsSettingsDef)
                }
                this.EXISTING_SUBJECT_BEING_MODIFIED = false;
            }
            newTopicsSettingsDef[`${this.state.currentTopicSettingsTemp.topic}`] = { ...this.state.currentTopicSettingsTemp };

            console.log("newTOpicsSettingsdef final", newTopicsSettingsDef)
            this.setState(prevState => ({ ...prevState, topicsSettingsDefinitive: newTopicsSettingsDef }))
            this.CURRENT_TOPIC_HAS_BEEN_MODIFIED = false;
        }
        this.setState(prevState => ({ ...prevState, showNewTopicModal: false, subjects: [...prevState.subjects, this.state.input] }))
    }
    onDeleteButtonClicked = () => {

        this.setState(prevState => ({ ...prevState, deleteActive: !prevState.deleteActive }));
        console.log("delete focus");
        this.deleteFocus.current.focus();
    }

    onUserNameChangeEventHandler = e => {
        const userName = this.capitalizeSubject(e.target.value);
        this.setState(prevState => ({...prevState, topiclooNames: {...prevState.topiclooNames, userName: userName}}))
    }
    onTopiclooNameChangeEventHandler = e => {
        const userName = e.target.value.toUpperCase();
        this.setState(prevState => ({...prevState, topiclooNames: {...prevState.topiclooNames, topiclooName: userName}}))
    }
    onCloseNameTopiclooEventHandler = () => {
        this.setState(prevState => ({...prevState, showNameTopiclooModal: false}))
    }
    onSaveNameTopiclooEventHandler = () => {
        alert("save");
        this.postTopicCloud();
    }

    render() {
        console.log("rerender", this);
        console.log("topics settings def", Object.keys(this.state.topicsSettingsDefinitive).length > 0);
        const hasOneOrMoreSubjects = this.hasOneOrMoreSubjects();
        const showDoneButton = this.hasOneOrMoreSubjects() && !this.state.showNewTopicModal;


        return (
            <Fragment>
                {this.EMOJI_ALERT_RENDER}
                <Route exact path='/cloud/create'>
                    <Fragment>
                        <NameTopiclooModal
                            show={this.state.showNameTopiclooModal}
                            username={this.state.topiclooNames.userName}
                            topiclooname={this.state.topiclooNames.topiclooName}
                            usernamechange={(e) => this.onUserNameChangeEventHandler(e)}
                            topicloonamechange={(e) => this.onTopiclooNameChangeEventHandler(e)}
                            onClose={this.onCloseNameTopiclooEventHandler}
                            onSaveClicked={this.onSaveNameTopiclooEventHandler}
                        />
                        <NewTopicModal
                            show={this.state.showNewTopicModal}
                            onTopicChange={(e) => this.onTopicChangeEventHandler(e)}
                            topicValue={this.state.currentTopicSettingsTemp.topic}
                            handleClose={() => this.setState(prevState => ({ ...prevState, showNewTopicModal: false }))}
                            handleSaveClose={this.onHandleSaveClose}
                            onExplanatoryCommentChange={(e) => this.onExplanatoryTopicChangeEventHandler(e)}
                            commentValue={this.state.currentTopicSettingsTemp.comment}
                            currentTimeout={this.state.currentTopicSettingsTemp.timeout}
                            onSliderChangeEventHandler={(e, value) => this.onSliderChangeEventHandler(e, value)}
                            happyIsChecked={this.state.currentTopicSettingsTemp.emojis.happy}
                            happyToggleChecked={() => this.onToggleCheckedEventHandler("happy")}
                            angryIsChecked={this.state.currentTopicSettingsTemp.emojis.angry}
                            angryToggleChecked={() => this.onToggleCheckedEventHandler("angry")}
                            sadIsChecked={this.state.currentTopicSettingsTemp.emojis.sad}
                            sadToggleChecked={() => this.onToggleCheckedEventHandler("sad")}
                            curiousIsChecked={this.state.currentTopicSettingsTemp.emojis.curious}
                            curiousToggleChecked={() => this.onToggleCheckedEventHandler("curious")}
                            timeout={this.state.currentTopicSettingsTemp.timeout}
                        />
                        <Modal
                            show={!this.state.showTopicButtonModal && !this.state.showNewTopicModal && !this.state.showNameTopiclooModal}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>
                            <Modal.Body>
                                <Row>
                                    <Col className='text-center'>
                                        <h5>TOPICS</h5>
                                    </Col>
                                </Row>
                                <br />
                                <Container>
                                    <Row>
                                        <Col className='text-center'>
                                            {Object.keys(this.state.topicsSettingsDefinitive).map((subject, index) => {
                                                const object = this.state.topicsSettingsDefinitive[`${subject}`];
                                                if (subject.length > 0) {
                                                    return (
                                                        <Button
                                                            className={classnames(classes.topicBtn, this.state.deleteActive && classes.deleteactive)}
                                                            key={subject + '_' + index}
                                                            onClick={() => this.onTopicButtonClicked(subject)}>
                                                            <Row className="align-items-center my-auto">
                                                                <Col>
                                                                    <p className="my-auto">{subject}</p>
                                                                </Col>
                                                                <Col>
                                                                    <MiniEmojis happy={object.emojis.happy} sad={object.emojis.sad} curious={object.emojis.curious} angry={object.emojis.angry} />
                                                                </Col>
                                                                <Col>
                                                                    <p className="my-auto">{object.timeout} seconds</p>
                                                                </Col>

                                                            </Row>
                                                        </Button>
                                                    )
                                                }
                                            })}
                                        </Col>
                                    </Row>
                                </Container>
                                <br />
                                <Row>
                                    <Col className="text-center">
                                        <Fab
                                            color={this.state.deleteActive ? "secondary" : "default"}
                                            disabled={!hasOneOrMoreSubjects}
                                            onClick={this.onDeleteButtonClicked}>
                                            <DeleteIcon />
                                        </Fab>
                                    </Col>
                                    <Col className="text-center">
                                    </Col>
                                    <Col className="text-center">
                                        <Fab color="primary" aria-label="add" onClick={this.onAddButtonClickedEventHandler}>
                                            <AddIcon />
                                        </Fab>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='text-center'>
                                        <Zoom
                                            unmountOnExit
                                            in={showDoneButton}
                                            timeout={400}>
                                            <Button
                                                variant="success"
                                                className={classes.doneButton}
                                                onClick={this.doneButtonClickedEventHandler}
                                            >DONE</Button>
                                        </Zoom>
                                    </Col>
                                </Row>
                                <br />
                            </Modal.Body>
                            <Modal.Footer>
                                <NavLink to='/login'>
                                    <Col xs={4}>
                                        <Image onClick={this.props.showStartPage} src={Logo} fluid />
                                    </Col>
                                </NavLink>
                            </Modal.Footer>
                        </Modal>
                    </Fragment>
                </Route>
                <Route exact path='/cloud/create/name'>
                    <Frame>

                    </Frame>
                </Route>
                <Route exact path='/cloud/create/maillist'>
                    <Frame>
                        <Mailform
                            idConfirmation={this.state.GENERATED_ID_CONFIRMED}
                            cloudID={this.GENERATED_ID}
                            {...this.props} />
                    </Frame>
                </Route>
                <button ref={this.deleteFocus} style={{ position: "absolute", transform: "translateY(-500px)" }}></button>
            </Fragment >
        )
    }
}

export default createCloudPage;

