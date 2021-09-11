const React = require('react');
import OneQA from './OneQA.jsx';

class ViewQuestion extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    const {quesAnsLists} = this.props;
    console.log('ViewQuestions-->', quesAnsLists)
    return (
      <div className='viewQuesAns'>
        {quesAnsLists.map((quesAns, index) => (
          <OneQA key={index} one={quesAns}/>
        ))}

      </div>
    );
  }
}

export default ViewQuestion;