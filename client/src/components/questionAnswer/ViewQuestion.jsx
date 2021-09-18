const React = require('react');
import OneQA from './OneQA.jsx';

class ViewQuestion extends React.Component{
  constructor(props){
    super(props);
  }
  render(){

    const {quesAnsLists} = this.props;
    // console.log('ViewQuestions-->', quesAnsLists)
    return (
      <div className='viewQuesAns'>
        {quesAnsLists && quesAnsLists.map((quesAns, index) => {
          console.log('viewQA-->', quesAns)
          const ansList = quesAns.answers;
          const ansKey = [];
          for(let key in ansList){

            ansKey.push(key);
          }
          // console.log('answerKey->', typeof(ansKey[0]))
          // console.log('key-->', quesAns.answers[ansKey[0]])
          return (
            <OneQA  key = {index}
                    oneQues = {quesAns}
                    // quesId = {quesAns.question_id}
                    oneAns = {quesAns.answers[ansKey[0]]}
                    // ansId = {ansKey[0]}
            />)
        }

        )}

      </div>
    );
  }
}

export default ViewQuestion;