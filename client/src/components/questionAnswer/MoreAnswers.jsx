import React from 'react';
import axios from 'axios';
import OneAnswer from './OneAnswer.jsx';

class MoreAnswer extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      answersList : this.props.allAnswers[0],
      showMore : false
    }
    this.fetchMoreAns = this.fetchMoreAns.bind(this);
    console.log('More Answers-->', this.state.answersList)
  }
  fetchMoreAns = (quesId) => {
    // console.log('QuesID-->', quesId)

      // axios.get(`/api/qa/id=${id}`, {
      //   params: {
      //     product_id: id,
      //     previousQuesId: this.props.quesId
      //   }
      // })
      //   .then(data => {
      //     this.props.updateQA(data)
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })

  }
  render(){

    const {allAnswers} = this.props;


    return (
      <div>
        {allAnswers.map((oneAns)=> {
          return (<OneAnswer key={oneAns.id} oneAnswer={oneAns}/>)
        })}

      </div>
    );
  }
}

export default MoreAnswer;
