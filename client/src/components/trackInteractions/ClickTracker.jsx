import React from 'react';
import axios from 'axios';

//https://reactjs.org/docs/higher-order-components.html
//

const ClickTracker = function (WrappedComponent, widget) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.sendInteraction = this.sendInteraction.bind(this);
    }
      sendInteraction(element) {
        const data = {
          element: element,
          widget: widget,
          time: new Date().toString()
        };
        axios.post('/api/interactions', data)
        .then((response) => {
          console.log('Sent interaction data successfully ', response);
        })
        .catch((err) => {
          console.log('Error happened while sending interactions data');
        });
      }

      render() {
        return (
          <WrappedComponent sendInteraction={this.sendInteraction} {...this.props} />
        );
      }

  }
}

export default ClickTracker;