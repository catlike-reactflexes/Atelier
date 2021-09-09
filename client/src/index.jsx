const React = require('react');
const ReactDOM = require('react-dom');
import QaMain from './components/qa/QaMain.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello from React!!!</h1>
        <QaMain/>
      </div>

    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);