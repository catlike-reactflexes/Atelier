import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import PhotoAns from './PhotoAns.jsx';

class OneAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      answerHelpful: this.props.oneAnswer.helpfulness
    }
    this.answerUpdateHelpfulness = this.answerUpdateHelpfulness.bind(this);
    console.log('!!!!ONE ANSWER!!!!!!-->', this.props)
  }
  answerUpdateHelpfulness = (answerId,answerHelpful) => {
    //change state of helpfulness counter
    let maxCounter = this.props.oneAnswer.helpfulness + 1;
    if(answerHelpful < maxCounter) {
      //update coounter
      this.setState({
        answerHelpful : maxCounter
      })
    }

    //send to API for update
  }

  render() {

    const {id, body, answerer_name, date, helpfulness, photos} = this.props.oneAnswer;
    console.log('IS PHOTO URL-->', photos.length, id)
    return (

      <div className="oneAnswer">
          <div className="ans1">
            <div className='bigA'>A:</div>
            <div className="ansBody">{body}</div>


            {photos.length > 0 ? <PhotoAns urlPhoto={photos}/> : null }


          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div>

              </div>
                <div className="ansName" style={{ fontWeight: 'bold' }}>{answerer_name}

                      <div className="date" style={{ fontWeight: 'normal' }}> ,  <Moment format="MMM, DD, YYYY">{date}</Moment></div>
                      <div className="helpful" style={{ fontWeight: 'normal' }}> | Helpful?</div>
                      <div className="yes" style={{ fontWeight: 'normal' }}
                        onClick={() => this.answerUpdateHelpfulness(id,helpfulness)} >
                          Yes ({this.state.answerHelpful})</div>
                      <div className="report" style={{ fontWeight: 'normal' }}> | Report</div>
                </div>
            </div>

        </div>

    )
  }

}

export default OneAnswer;
