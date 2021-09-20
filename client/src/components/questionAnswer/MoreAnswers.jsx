import React from 'react';
import axios from 'axios';
import OneAnswer from './OneAnswer.jsx';

class MoreAnswer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      twoAnswer : this.props.allAnswers.slice(0,2),
      restOfAnswer : this.props.allAnswers.slice(2),
      showMore : true
    }
    this.fetchMoreAns = this.fetchMoreAns.bind(this);
    console.log('More Answers-->', this.props)
  }
  fetchMoreAns = () => {
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

    const {twoAnswer, showMore, restOfAnswer} = this.state;

    return (
      <div>
        {
          twoAnswer.map((oneAns, index)=> {
          return (<OneAnswer key={index} oneAnswer={oneAns}/>)
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

export default MoreAnswer;
