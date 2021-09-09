import React from 'react';
import ReactDOM from 'react-dom';

import Overview from '/overview/overview.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Header Placeholder<div/>
        <Overview />
      </div>

    );
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);