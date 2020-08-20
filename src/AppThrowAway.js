import React, { Component } from 'react';
import './App.css';
import Background from './components/background/background';
import Cloud from './components/cloud/cloud';
import HowToDo from './containers/howToDo/howToDo';
import axios from './axios-thoughts';
import { CSSTransition } from 'react-transition-group';
import './transitions.css';

class App extends Component {

  TOPICS_CURRENTLY_RENDERED = [];
  TOPICS_DONE = [];
  ACTIVECLOUDS = 0;
  CLOUD_ONE_RENDER = null;

  state = {
    currentTopic: "",
    topics: ["Wage Gap", "AI", "H&M", "Male behaviour", "Female behaviour", "Epstein", "Black Lives Matter", "Gun Laws", "Feminism", "Netflix", "Socialism", "Democracy", "Equality", "PS5", "Facebook", "Google"],
    showClouds: { ONE: false, TWO: false, THREE: false, FOUR: false, FIVE: false },
    inProps: false,
    CLOUDS: {
      ONE: { show: "", topic: "", animationInfo: "" },
      TWO: { show: "", topic: "", animationInfo: "" },
      THREE: { show: "", topic: "", animationInfo: "" },
      FOUR: { show: "", topic: "", animationInfo: "" },
      FIVE: { show: "", topic: "", animationInfo: "" }
    }
  }

                                                              //Life Cycles

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    this.setState({currentTopic:"farts"})
  }

  componentDidMount() {
    
    console.log("this in component did mount", this);
    console.log("componentDidMount before", this.state);
    this.createClouds();
    console.log("componentDidMount after create clouds", this.state);
    this.showAllClouds();
    console.log("componentDidMount", this.state);

  }

  componentDidUpdate() {
    console.log("componentDidUpdate", this.state);
    // this.asyncUpdateCloud(this.CLOUDS.ONE);
    // this.asyncUpdateCloud(this.CLOUDS.TWO);
  }




                                                            //Event Handlers

  onEnterEventHandler = (topic) => {
    console.log("onEnterEventHandler");
    this.incrementActiveClouds();
    this.addToTopicsCurrentlyRendered(topic);
  }

  onExitedEventHandler = (cloud, topic) => {
    console.log("onExitedEventHandler");
    this.decreaseActiveClouds(topic);
    this.removeFromTopicsCurrentlyRendered(topic);
    this.addToTopicsDone(topic);
    this.destroyCloud(cloud);
    console.log("cloud 1 state after destroy", this.state.showClouds.ONE);
  }

                                                                //Functions

  createClouds = () => {
    console.log("create clouds start", this.state);
    const self = this;
    let newTopic = "";
    let randomIndex = 0;

    for (let i = 0; i < Object.keys(this.state.CLOUDS).length; i++) {
      do {
        randomIndex = Math.floor(Math.random() * (self.state.topics.length - 1));
        const topics = [...self.state.topics];
        newTopic = topics[randomIndex];
      } while (self.TOPICS_CURRENTLY_RENDERED.includes(newTopic))
      const animationInfo = self.getRandomCloudAnimation();
      console.log("animationinfo", animationInfo);

      switch (i) {
        case 0: {
          console.log("switch", i, self)
          this.setState({
             CLOUDS: "hello"  
          })
          
          break;
        }
        case 1: {
          self.setState(prevState => ({
            ...prevState, CLOUDS: {
              ...prevState.CLOUDS, TWO: {
                show: false,
                // //topic: newTopic,
                animationInfo: animationInfo
              }
            }
          })
          )
          break;
        }
        case 2: {
          self.setState(prevState => ({
            ...prevState, CLOUDS: {
              ...prevState.CLOUDS, THREE: {
                show: false,
                //topic: newTopic,
                animationInfo: animationInfo
              }
            }
          })
          )
          break;
        }
        case 3: {
          self.setState(prevState => ({
            ...prevState, CLOUDS: {
              ...prevState.CLOUDS, FOUR: {
                show: false,
                //topic: newTopic,
                animationInfo: animationInfo
              }
            }
          })
          )
          break;
        }
        case 4: {
          self.setState(prevState => ({
            ...prevState, CLOUDS: {
              ...prevState.CLOUDS, FIVE: {
                show: false,
                //topic: newTopic,
                animationInfo: animationInfo
              }
            }
          })
          )
          break;
        }
        default: console.log("create clouds default error");
          break;
      }
    }
    console.log("create clouds done", this.state.CLOUDS);
  }

  createCloud(NUM) {

    let topic = "";
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * (this.state.topics.length - 1));
      const topics = [...this.state.topics];
      topic = topics[randomIndex];
    } while (this.TOPICS_CURRENTLY_RENDERED.includes(topic))
    const animationInfo = this.getRandomCloudAnimation();

    switch (NUM) {
      case "ONE": {
        this.setState(prevState => ({
          ...prevState, CLOUDS: {
            ...prevState.CLOUDS, ONE: {
              show: false,
              topic: topic,
              animationInfo: animationInfo,
            }
          }
        })
        )
        break;
      }
      default: console.log("create cloud default");
    }


  }

  destroyCloud(cloud) {
    console.log("destrou cloud", cloud);
    const self = this;
    switch (cloud) {
      case "ONE": {
        self.setState(
          prevState => ({
            ...prevState, showClouds: {
              ...prevState.showClouds,
              ONE: false
            }
          }))
        break;
      }
      case "TWO": {
        self.setState(
          prevState => ({
            ...prevState, showClouds: {
              ...prevState.showClouds,
              TWO: false
            }
          }))
        break;
      }
      case "THREE": {
        self.setState(
          prevState => ({
            ...prevState, showClouds: {
              ...prevState.showClouds,
              THREE: false
            }
          }))
        break;
      }
      case "FOUR": {
        self.setState(
          prevState => ({
            ...prevState, showClouds: {
              ...prevState.showClouds,
              FOUR: false
            }
          }))
        break;
      }
      case "FIVE": {
        self.setState(
          prevState => ({
            ...prevState, showClouds: {
              ...prevState.showClouds,
              FIVE: false
            }
          }))
        break;
      }

      default: {
        console.log("destroy cloud", "default error");
      }

    }
  }

  showAllClouds() {
    console.log("show all clouds");
    this.setState({
      ...this.state, showClouds: {
        ONE: true, TWO: true, THREE: true, FOUR: true, FIVE: true
      }
    })
    this.setState({
      ...this.state, CLOUDS: {
        ONE: {
          ...this.state.CLOUDS.ONE, show: true
        }, TWO: {
          ...this.state.CLOUDS.TWO, show: true
        }, THREE: {
          ...this.state.CLOUDS.THREE, show: true
        }, FOUR: {
          ...this.state.CLOUDS.FOUR, show: true
        }, FIVE: {
          ...this.state.CLOUDS.FIVE, show: true
        }
      }
    })
    console.log("show all clouds", this.state);
  }

  // asyncUpdateCloud(CLOUD) {

  //   if (!CLOUD.cssTransitionInStateVar) {
  //     console.log(CLOUD, CLOUD.cssTransitionInStateVar, CLOUD.currentTopic)
  //     CLOUD = this.createUniqueCloud(CLOUD.cssTransitionInStateVar);            ///HEEEEEEEEEEEEEEEEEEEEEEEEEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
  //     this.addToTopicsCurrentlyRendered(CLOUD.topic);
  //     this.setState({ showCloudOne: true });
  //   }
  // }

  removeFromTopicsCurrentlyRendered(topic) {
    this.TOPICS_CURRENTLY_RENDERED = this.TOPICS_CURRENTLY_RENDERED.splice(this.TOPICS_CURRENTLY_RENDERED.indexOf(topic), 1);
  }

  getCloudSize = (topic) => {
    if (topic.length < 4) return "xs";
    if (topic.length < 6) return "s";
    if (topic.length < 9) return "m";
    if (topic.length < 12) return "l";
    if (topic.length < 16) return "xl";
    return "xxl";
  }

  getRandomCloudAnimation() {
    switch (Math.floor(Math.random() * 5)) {
      case 0: {
        return { className: "xsCloud", timeout: 25000 }
      }
      case 1: {
        return { className: "sCloud", timeout: 20000 }
      }
      case 2: {
        return { className: "msCloud", timeout: 15000 };
      }
      case 3: {
        return { className: "mfCloud", timeout: 10000 };
      }
      case 4: {
        return { className: "fCloud", timeout: 5000 };
      }
      default: return { className: "msCloud", timeout: 15000 };
    }
  }

  incrementActiveClouds() {
    this.ACTIVECLOUDS++;
  }

  decreaseActiveClouds() {
    this.ACTIVECLOUDS--;
  }

  removeFromTopics(topic) {
    this.setState({ ...this.state, topics: this.state.topics.splice(this.state.topics.indexOf(topic), 1) });
  }

  addToTopicsDone(topic) {
    this.TOPICS_DONE.push(topic);
  }


  addToTopicsCurrentlyRendered(newTopic) {
    this.TOPICS_CURRENTLY_RENDERED.push(newTopic);
  }

  renderCloud(NUM) {
    const self = this;
    switch (NUM) {
      case "ONE": {
        return (<CSSTransition
          in={this.state.inProps}
          appear={true}
          enter={true}
          exit={true}
          timeout={{ appear: self.state.CLOUDS.ONE.animationInfo.timeout, exit: 100 }}
          classNames={self.state.CLOUDS.ONE.animationInfo.className}
          onEnter={() => self.onEnterEventHandler(self.state.CLOUDS.ONE.topic)}
          onEntered={() => self.onExitedEventHandler("ONE", self.state.CLOUDS.ONE.topic)}
          unmountOnExit={true}>
          <div>
            <Cloud
              topic={self.state.CLOUDS.ONE.topic}
              size={self.getCloudSize(self.state.CLOUDS.ONE.topic)} />
          </div>
        </CSSTransition>)
      }
      default: console.log("rendercloud default");
    }
  }






                                                                //render


  render() {
    let CLOUD_ONE_RENDER = null;
    let CLOUD_TWO_RENDER = null;
    let CLOUD_THREE_RENDER = null;
    let CLOUD_FOUR_RENDER = null;
    let CLOUD_FIVE_RENDER = null;

    if (!this.state.CLOUDS.ONE.show) {
      console.log("rendering cloud one");
      CLOUD_ONE_RENDER = this.renderCloud("ONE");
      console.log("cloud one render", this.state.CLOUDS.ONE);
      // this.setState({...this.state, CLOUDS: {
      //   ...this.state.CLOUDS, ONE:{
      //     ...this.state.CLOUDS.ONE, show: true
      //   }
      // }})
    }


    return (
      <div className="App">
        <HowToDo />
        <Background />
        {CLOUD_ONE_RENDER}
        <button
          onClick={() => this.setState(prevState => ({ ...this.state, inProps: !this.state.inProps }))}>toggle in props</button>
        <button
          onClick={() => axios.post('/thoughts.json', { topic: "Fish Sticks", thoughts: "I think they taste strange." })}>Press me</button>
      </div>
    );
  }
}

export default App;




/*

      <CSSTransition
      in={this.state.inProps}
      appear={true}
      exit={true}
      timeout={{ appear: 10000, exit: 100 }}
      classNames={"mfCloud"}
      onEnter={() => this.onEnterEventHandler("TESTTESTTESTTESTTEST")}
      onEntered={() => this.onExitedEventHandler("TESTTESTTESTTESTTEST", "TESTTESTTESTTESTTEST")}
      unmountOnExit={true}>
      <div>
        <Cloud
          topic={"TESTTESTTESTTESTTEST"}
          size={this.getCloudSize("TESTTESTTESTTESTTEST")} />
      </div>
    </CSSTransition>

  */