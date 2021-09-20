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

          {urlPhoto && urlPhoto.map((oneUrl, index) => (
            <img className='ansImg' key={index}src={oneUrl}></img>
          ))}

        {/* */}
      </>
    );
  }
}

export default PhotoAns;