const React = require('react');
import axios from 'axios';


class MoreQuestion extends React.Component{
  constructor(props){
    super(props);
    this.fetchMoreQues = this.fetchMoreQues.bind(this);
    // console.log('More Questions--->', this.props)

  }
  fetchMoreQues = () => {
    // console.log('Fetch more--Have to revisit these again');
    const {restOfQuestions} = this.props;

    if(restOfQuestions.length < 2){
      this.props.updateQA(restOfQuestions, false)
    } else {
      this.props.updateQA(restOfQuestions.slice(0,2), true)
    }

  }
  render(){

    return (

      <div className='moreQuestion'>
        <button type="submit" onClick={()=>this.fetchMoreQues()}>MORE ANSWERED QUESTIONS</button>
      </div>

    );
  }
}

export default MoreQuestion;