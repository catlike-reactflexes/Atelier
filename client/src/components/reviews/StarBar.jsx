import React from 'react'

class StarBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='starBarContainer'>
      <div className='starBar' style={{width: this.props.starBarStyle, height: '10px', backgroundColor: '#56BC8A', borderRadius: '10px',}}></div>
    </div>
    )
  }
}

export default StarBar