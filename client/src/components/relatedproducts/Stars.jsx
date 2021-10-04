import React from 'react';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import { FaStar } from 'react-icons/fa';

class Stars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    )
  }
}

export default ClickTracker(Stars);