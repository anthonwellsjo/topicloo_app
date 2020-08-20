import React, { Component } from 'react';
import axiosThoughts from './axios/axios-thoughts';
import axiosUsers from './axios/axios-users';
import axiosTopics from './axios/axios-topics';
import { Redirect, Route, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Frame from './components/frame/frame';

import './App.css';

import MainFrame from './containers/mainFrame/mainFrame';
import MobileMenuContainer from './containers/mobileMenuContainer/mobileMenuContainer';
import StartPage from './containers/startPage/startPage';
import CreateCloudPage from './containers/createCloudPage/createCloudPage';
import ConnectionErrorModal from './components/connectionErrorModal/connectionErrorModal';
import WelcomeInfoPage from './components/welcomeInfoPage/welcomeInfoPage';
import AnsweringPage from './containers/answeringPage/answeringPage';




class App extends Component {

    PRESELECTED_CLOUD_ID = 0;
    CURRENT_CLOUD_SETTINGS = {};
    CURRENT_CLOUD = {};
    USER_ID = 0;
    TOPIC_IDS_AVAILABLE = [];
    TOPIC_ID_COMES_FROM_LINK = false;
    LINKED_TOPIC_ID = 0;
    FIRST_TIME_LOAD = true;
    REDIRECTED_FROM_CREATE_CLOUD_LINK = false;

    state = {
        topicCloudID: 0,
        showTopicModal: false,
        topicsResponded: [],
        showStartPage: true,
        topicIdsFetched: false,
        errorWithFetchingData: false,
        firstTimeVisist: false,
        showWelcomeInfo: false
    }

    //Life cycles

    componentDidMount() {
        this.USER_ID = this.generateNewUserID();
        this.getTopicIDs();
        this.showOrHideWelcomePage();
    }


    //Event Handlers

    cloudClickedEventHandler = (cloud, cloudBatch) => {
        console.log("cloudClicked event handler", cloud, cloudBatch);
        this.CURRENT_CLOUD_SETTINGS = cloudBatch[`${cloud.topic}`];
        console.log("current cloud settings", this.CURRENT_CLOUD_SETTINGS);
        this.CURRENT_CLOUD = cloud;
        this.setState(prevState => ({ ...prevState, showTopicModal: true, }))
    }

    timeIsUpEventHandler = thought => {
        this.setState(prevState => ({ ...prevState, showTopicModal: false, }));
        this.postThoughtToDB(thought);
        this.setState(prevState => ({ ...prevState, topicsResponded: [...prevState.topicsResponded, this.CURRENT_CLOUD.topic] }))
    }

    goButtonClickedEventHandler = (cloudID) => {
        this.setState(prevState => ({ ...prevState, showStartPage: !prevState.showStartPage, topicCloudID: cloudID }));
    }

    createButtonClickedEventHandler = () => {
        this.setState(prevState=> ({...prevState, showStartPage: false}))
    }

    newTopicClickedEventHandler = (cloudID) => {
        this.setState(prevState => ({ ...prevState, topicIdsFetched: false }));
        this.getTopicIDs();
        this.LINKED_TOPIC_ID = cloudID;
        this.REDIRECTED_FROM_CREATE_CLOUD_LINK = true;
        this.props.history.push("/login");
        this.setState(prevState =>({...prevState, showStartPage: true}))
    }
    onWelcomePageCloseButtonClickedEventHandler = () => {
        this.setState(prevState => ({ ...prevState, showWelcomeInfo: false }));
    }


    //Functions
    showOrHideWelcomePage = () => {
        if (this.state.firstTimeVisist) {
            setTimeout(() => {
                this.setState(prevState => ({ ...prevState, showWelcomeInfo: true, firstTimeVisist: false }))
            }, 500)
        }
    }

    generateNewUserID = () => {
        axiosUsers.get('/.json')
            .then(resp => {
                let random = 0;
                if (resp.data !== null) {
                    do {
                        random = Math.floor(Math.random() * 1000000);
                    } while (Object.keys(resp.data).includes(random));
                }
                this.USER_ID = Math.floor(Math.random() * 1000000);
                axiosUsers.post(`${this.USER_ID}/.json`, this.USER_ID)
                    .then(resp => {
                    })
            })
    }

    getTopicIDs = () => {
        console.log("get topic ids");
        axiosTopics.get('/.json')
            .then(resp => {
                if (resp.data) {
                    this.TOPIC_IDS_AVAILABLE = Object.keys(resp.data);
                    this.TOPIC_IDS_AVAILABLE = this.TOPIC_IDS_AVAILABLE.map(el => el.split("").splice(6, 12).join("")).filter(el => el.length > 0);
                    console.log("topic ids fetched", this.state);
                }
                this.setState(prevState => ({ ...prevState, topicIdsFetched: true }))
            })
            .catch(error => {
                console.log(error);
                setTimeout(() => {
                    this.setState(prevState => ({ ...prevState, errorWithFetchingData: true }))
                }, 1500)

            })
    }

    postThoughtToDB = (thought) => {
        axiosThoughts.post(`/cloud_${this.state.topicCloudID}/user_${this.USER_ID}/${this.CURRENT_CLOUD.topic}.json`, thought)
            .then((resp) => {
                console.log("post to db done", resp);
            })
            .catch(error => console.log(error))
    }
    checkIfTopicIdIsLinked = () => {
        const eventualId = window.location.href.split("").splice(window.location.href.length - 6, 6).join('');
        console.log("check if id is linked", eventualId);
        console.log("is number integer?", !isNaN(eventualId))
        if (!isNaN(eventualId)) {
            this.TOPIC_ID_COMES_FROM_LINK = true;
            this.LINKED_TOPIC_ID = eventualId;
        }
        if (this.REDIRECTED_FROM_CREATE_CLOUD_LINK) {
            this.TOPIC_ID_COMES_FROM_LINK = true;
            this.REDIRECTED_FROM_CREATE_CLOUD_LINK = false;
        }
    }

    renderStartPage = () => {
        if (this.state.topicIdsFetched) {
            return (< StartPage
                show={this.state.showStartPage && !this.state.showWelcomeInfo}
                topicidsavailable={this.TOPIC_IDS_AVAILABLE}
                linkedtopicid={this.TOPIC_ID_COMES_FROM_LINK ? this.LINKED_TOPIC_ID : ""}
                gobuttonclicked={(cloudID) => this.goButtonClickedEventHandler(cloudID)
                }
                createbuttonclicked={this.createButtonClickedEventHandler} />)
        }
        if (!this.state.topicIdsFetched && !this.state.errorWithFetchingData) {
            return (< Frame > <Spinner animation="border" /></Frame >)
        }
        if (this.state.errorWithFetchingData) {
            return (<ConnectionErrorModal />)
        }
    }


    render() {
        console.log("app rerender", this);
        this.checkIfTopicIdIsLinked();

        let startPageRender = this.renderStartPage();


        return (
            <MainFrame>
                <Redirect exact from='/' to='/login' />
                <Route exact path='/login'>
                    <CSSTransition
                        in={this.state.showWelcomeInfo}
                        appear={true}
                        timeout={300}
                        classNames="infodropdown"
                        unmountOnExit>
                        <WelcomeInfoPage
                            closeButtonClicked={this.onWelcomePageCloseButtonClickedEventHandler} />
                    </CSSTransition>

                    {startPageRender}

                    {/* <Background />  */}
                </Route>
                <Route path='/cloud/create'>
                    <CreateCloudPage
                        showStartPage={() => this.setState(prevState => ({...prevState, showStartPage: true}))}
                        newtopicidclicked={(cloudID) => this.newTopicClickedEventHandler(cloudID)} />
                </Route>
                <Route path='/cloud/id/'>
                    <AnsweringPage
                        onBack={()=> this.setState(prevState=>({...prevState, showStartPage: true}))}
                        topiclooID={this.state.topicCloudID}/>
                    <MobileMenuContainer
                        showHamburger={!this.state.showStartPage} />
                </Route>
            </MainFrame >
        )
    }

}


export default withRouter(App);