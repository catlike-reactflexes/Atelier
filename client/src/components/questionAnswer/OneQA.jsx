const React = require('react');
import axios from 'axios';
import JustQuestion from './JustQuestion.jsx';
import MoreAnswer from './MoreAnswers.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const {allAns, oneQues} = this.props;

    return (
      <div className="oneQA">

        <div className="oneQuestion">
          <JustQuestion justOneQues={oneQues}/>
        </div>
        <div className="oneAnswer1">
            <MoreAnswer allAnswers={allAns}/>
        </div>

      </div>
    );
  }
}

export default OneQA;