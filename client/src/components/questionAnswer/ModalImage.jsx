const React = require('react');


class ModalImage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.handleOnClick = this.handleOnClick.bind(this);
    console.log('Modal Image-props->', this.props)
  }

  handleOnClick = () => {
    console.log('--->Closing--->')
    this.props.onClose();

  }

  render(){
    if(!this.props.open) return null;


    return (
      <>
      <div style={OVERLAY_STYLES1}></div>
      <div style={MODAL_Q_STYLES1}>
        <div>
          <img src={this.props.expandImageUrl} onClick={this.handleOnClick} alt='answers image' className='full_image' />

        </div>

      </div>
      </>
    );
  }
}
const MODAL_Q_STYLES1 = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}
const OVERLAY_STYLES1 = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .4)',
  zIndex: 1000
}
export default ModalImage;