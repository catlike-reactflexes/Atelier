const React = require('react');

class PhotoAns extends React.Component {
  constructor(props){
    super(props);
    console.log('PhotoAns--->', this.props)
  }
  // submitAnswer = ()=> {
  //   console.log('submit answer');
  //   this.props.onClose();
  // }

  render(){
    // if(!this.props.open) return null;
    const {urlPhoto} = this.props;
    return (
      <>
        <div>
          {urlPhoto.map(oneUrl => (
            <img className='ansImg' src={oneUrl}></img>
          ))}
        </div>
        {/* */}
      </>
    );
  }
}

export default PhotoAns;