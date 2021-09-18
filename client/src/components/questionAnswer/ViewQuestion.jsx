const React = require('react');
import OneQA from './OneQA.jsx';

class ViewQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startCounter : 0,
      endCounter : 2,
      twoQuesAns : []
    }
  }
  render(){

    const {quesAnsLists} = this.props;
    
    return (
      <div className='viewQuesAns'>
        {quesAnsLists && quesAnsLists.map((quesAns, index) => {
          console.log('viewQA-->', quesAns)
          if(quesAns) {
            const ansList = quesAns.answers ;
            const ansKey = [];
            for(let key in ansList){
              ansKey.push(key);
            }

            return (
              <OneQA  key = {index}
                      oneQues = {quesAns}
                      // quesId = {quesAns.question_id}
                      oneAns = {quesAns.answers[ansKey[0]]}
                      // ansId = {ansKey[0]}
              />)
          }

        }

        )}

      </div>
    );
  }
}

export default ViewQuestion;