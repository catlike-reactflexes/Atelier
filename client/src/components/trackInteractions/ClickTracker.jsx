import React from 'react';
import axios from 'axios';

//https://reactjs.org/docs/higher-order-components.html
// HOC for click tracker

function ClickTracker (WrappedComponent) {

  return class extends React.Component {
    constructor(props) {
      super(props);

      this.postTrackInteractions = this.postTrackInteractions.bind(this);
    }
      postTrackInteractions(elementName, widgetName) {
        // console.log('Interaction from ' + elementName + ' in ' + widgetName);

        axios.post('/api/interactions', {
          element: elementName,
          widget: widgetName,
          time: new Date().toString()
        })
        .then((response) => {
          console.log('Success->', response);
        })
        .catch((err) => {
          console.log('Error with posting click tracker-->', err);
        });
      }

      render() {
        return (
          <WrappedComponent postTrackInteractions={this.postTrackInteractions} {...this.props} />
        );
      }

  }
}

export default ClickTracker;