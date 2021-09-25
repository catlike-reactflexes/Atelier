const React= require('react');
import ModalImage from './ModalImage.jsx';
import {FaArrowAltCircleRight,FaArrowAltCircleLeft } from 'react-icons/fa';

class PhotoAns extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      expandImageUrl: '',
      current: 0,
      length: this.props.urlPhoto.length
    }
    // console.log('PhotoAns--->', this.props)
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    
  }
  setOpen = (option, e) => {
    if(e){
      this.setState({
        isOpen: option,
        expandImageUrl: e.target.currentSrc
      })
    } else {
      this.setState({
        isOpen: option,
        expandImageUrl: ''
      })
    }



  }
  nextSlide = ()=> {
    if(this.state.current !== this.state.length - 1){
      this.setState ({
        current : this.state.current + 1
      },()=>{console.log('prevSlide1->', this.state.current, this.state.length)})
    } else {
      this.setState ({
        current: 0
      },()=>{console.log('prevSlide2->', this.state.current, this.state.length)})
    }
  }
  prevSlide = () => {
    if(this.state.current === 0){
      this.setState ({
        length: this.state.length - 1
      },()=>{console.log('NextSlide1->', this.state.current, this.state.length)})
    } else {
      this.setState ({
        current: this.state.current - 1
      },()=>{console.log('NextSlide2->', this.state.current, this.state.length)})
    }
    // setCurrent(current === 0 ? length - 1 : current - 1);
  }

  render(){
    // if(!this.props.open) return null;
    const {urlPhoto} = this.props;


    return (
      <section className='slider'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={this.prevSlide}/>
        <FaArrowAltCircleRight className='right-arrow' onClick={this.nextSlide}/>
          {
            urlPhoto && urlPhoto.map((oneUrl, index) => {
              return(
                <div
                  className={index === this.state.current ? 'slide active' : 'slide'}
                  key={index}
                >
                {index === this.state.current && (
                  <img src={oneUrl} onClick={(e) => this.setOpen(true,e)} alt='answers image' className='image' />
                )}
                {
                  this.state.isOpen ?
                  <ModalImage
                    expandImageUrl={this.state.expandImageUrl}
                    open ={this.state.isOpen}
                    onClose={() => this.setOpen(false, null)}/>
                  : null
                }
                </div>

              )
            })
          }


      </section>
    );
  }
}

export default PhotoAns;