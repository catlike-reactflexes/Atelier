//main entry point to Q & A
const React = require('react');
import SearchQa from './SearchQa.jsx';
import ViewQuestion from './ViewQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import AddAnswer from './AddAnswer.jsx';

class QaMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="qa">
        <p>Questions and Answers</p>
        <SearchQa/>
        <ViewQuestion/>
        <AddQuestion/>
        <AddAnswer/>
      </div>

    );
  }

}

export default QaMain;
