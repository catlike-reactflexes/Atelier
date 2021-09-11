import React from 'react';
import ReactDOM from 'react-dom';

import Overview from './components/overview/overview.jsx';
import QuesAnsMain from './components/questionAnswer/1QuesAnsMain.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quesAns:[]
    }
  }

  fetchQuestionAnswer() {
    fetch('/api/qa')
      .then(response => response.json())
      .then(res => this.setState({quesAns: res}));

  }

  componentDidMount() {
    this.fetchQuestionAnswer();
  }

  render() {
    console.log('What state->', this.state.quesAns);
    return (
      <div>
        <div>Header Placeholder</div>
        <Overview />
        <QuesAnsMain quesAns={this.state.quesAns}/>
      </div>

    );
  }

}

ReactDOM.render( <App />, document.getElementById('app'));
