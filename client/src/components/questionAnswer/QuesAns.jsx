const React = require('react');
import OneQA from './OneQA.jsx';

class QuesAns extends React.Component{
  constructor(props){
    super(props);
    this.state={
      // twoQuesAns : []
    }
  }
  render(){

    const {quesAnsLists} = this.props;
    console.log('QUES*ANS*START*******', quesAnsLists)

    return (
      <div className='viewQuesAns'>

        { //format Answers into array object
          quesAnsLists && quesAnsLists.map((quesAns, index) =>
          {
            console.log('viewQA-->', quesAns)
            if(quesAns) {
              const ansList = quesAns.answers ;
              const ansKey = [];
              const moreAnsList = [];
              for(let key in ansList){
                ansKey.push(key);
              }
              console.log('AnswerKey--->',ansKey)
              for(let i =0; i < ansKey.length; i++){
                moreAnsList.push(quesAns.answers[ansKey[i]])
              }
              console.log('final answer array--->',moreAnsList)

              return (
                <OneQA  key = {quesAns.question_id}
                        oneQues = {quesAns}
                        allAns = {moreAnsList}
                        productName={this.props.productName}

                />
              )
            }

          })
        }

      </div>
    );
  }
}

export default QuesAns;