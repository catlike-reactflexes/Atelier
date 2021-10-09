const React= require('react');
import ModalImage from './ModalImage.jsx';
import {FaChevronLeft,FaChevronRight } from 'react-icons/fa';

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
    // this.prevSlide = this.prevSlide.bind(this);
    // this.nextSlide = this.nextSlide.bind(this);

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
  // nextSlide = ()=> {
  //   if(this.state.current !== this.state.length - 1){
  //     this.setState ({
  //       current : this.state.current + 1
  //     },()=>{console.log('prevSlide1->', this.state.current, this.state.length)})
  //   } else {
  //     this.setState ({
  //       current: 0
  //     },()=>{console.log('prevSlide2->', this.state.current, this.state.length)})
  //   }
  // }
  // prevSlide = () => {
  //   if(this.state.current === 0){
  //     this.setState ({
  //       length: this.state.length - 1
  //     },()=>{console.log('NextSlide1->', this.state.current, this.state.length)})
  //   } else {
  //     this.setState ({
  //       current: this.state.current - 1
  //     },()=>{console.log('NextSlide2->', this.state.current, this.state.length)})
  //   }
  //   // setCurrent(current === 0 ? length - 1 : current - 1);
  // }

  render(){
    // if(!this.props.open) return null;
    let {urlPhoto} = this.props;
    let updateUrl=[];
    // console.log('Photo--->', typeof(urlPhoto[0]));
    if(typeof(urlPhoto[0]) !== 'string'){

      for(let i =0; i< urlPhoto.length; i++){
        updateUrl.push(urlPhoto[i].url);
      }
      urlPhoto = updateUrl;
    }
    // console.log('updateUrl-->', urlPhoto)

    return (
        <section className='slider'>
            {
              urlPhoto && urlPhoto.map((oneUrl, index) => {
                return(
                  <div style={{padding:"2px"}} key={index}>
                    <img src={oneUrl} onClick={(e) => this.setOpen(true,e)} alt='answers image' className='image' />

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

    // return (
    //   <section className='slider'>
    //     <FaChevronLeft className='left-arrow' onClick={this.prevSlide}/>
    //     <FaChevronRight className='right-arrow' onClick={this.nextSlide}/>
    //       {
    //         urlPhoto && urlPhoto.map((oneUrl, index) => {
    //           return(
    //             <div
    //               className={index === this.state.current ? 'slide active' : 'slide'}
    //               key={index}
    //             >
    //             {index === this.state.current && (
    //               <img src={oneUrl} onClick={(e) => this.setOpen(true,e)} alt='answers image' className='image' />
    //             )}
    //             {
    //               this.state.isOpen ?
    //               <ModalImage
    //                 expandImageUrl={this.state.expandImageUrl}
    //                 open ={this.state.isOpen}
    //                 onClose={() => this.setOpen(false, null)}/>
    //               : null
    //             }
    //             </div>

    //           )
    //         })
    //       }


    //   </section>
    // );
  }
}

export default PhotoAns;