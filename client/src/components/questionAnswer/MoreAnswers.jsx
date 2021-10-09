import React from 'react';
import axios from 'axios';
import OneAnswer from './OneAnswer.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class MoreAnswer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      twoAnswer : this.props.allAns.slice(0,2),
      restOfAnswer : this.props.allAns.slice(2),
      showMore : true,
      foundSeller: false
    }
    this.fetchMoreAns = this.fetchMoreAns.bind(this);
    this.updateState = this.updateState.bind(this);

    console.log('More Answers--props>', this.props)
    console.log('More Answers--state>', this.state)
  }
  updateState = (newProps)=>{
    this.setState({
      twoAnswer : newProps.slice(0,2),
      restOfAnswer : newProps.slice(2),
    })
  }

  fetchMoreAns = () => {
    this.props.postTrackInteractions('Load more answers', 'Question And Answer')
    // console.log('Fetch More Answer, checking the length of rest of Answer-->', this.state.restOfAnswer)
    if(this.state.restOfAnswer.length <= 2){
      const addTwoAns = this.state.restOfAnswer;
      this.setState({
        twoAnswer : this.state.twoAnswer.concat(addTwoAns),
        restOfAnswer : [],
        showMore : false
      })
    } else {
      const addTwoAns = this.state.restOfAnswer.slice(0,2);
      this.setState({
        twoAnswer : this.state.twoAnswer.concat(addTwoAns),
        restOfAnswer : this.state.restOfAnswer.slice(2)
      })
    }

  }
  render(){

    let {twoAnswer, showMore, restOfAnswer} = this.state;
    if(this.props.incomingAnswer){
      // this.updateState(this.props.allAns)
      twoAnswer = this.props.allAns.slice(0,2);
      restOfAnswer = this.props.allAns.slice(2)
    }
    const strangeTwoAns = this.props.allAns.slice(0,2);
    const strangeRestOfAnswers = this.props.allAns.slice(2)
    console.log('moreAnswer-->', twoAnswer)
    return (
      <div>
        {
          twoAnswer.map((oneAns, index)=> {
          return (<OneAnswer key={index} oneAnswer={oneAns} />)
          })
        }

        {
          restOfAnswer.length > 0  && showMore ?
          <div className="loadAns" onClick={()=>this.fetchMoreAns()}>Load more Answers...</div> : undefined
        }

      </div>
    );
  }
}

export default ClickTracker(MoreAnswer);
