import React from 'react';
import axios from 'axios';
// import QuesAnsMain from './1QuesAnsMain.jsx';

class MoreAnswer extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      quesAns : []
    }
    this.fetchMoreQues = this.fetchMoreQues.bind(this);
  }
  // fetchMoreQues = (id) => {
  //   console.log('ID-->', id)

  //     axios.get(`/api/qa/id=${id}`, {
  //       params: {
  //         product_id: id,
  //         previousQuesId: this.props.quesId
  //       }
  //     })
  //       .then(data => {
  //         this.props.updateQA(data)
  //       })
  //       .catch(error => {
  //         console.error(error)
  //       })

  // }
  render(){
      console.log('More answers--->', this.props)

    return (
      <div className='moreAnswer'>
        <div className="ans1">
            <div className='bigA'>A:</div>
            <div className="ansBody">{answerBody}</div>


            {/* {<img className='ansImg' src={}></img>} */}


          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div>

              </div>
                <div className="ansName" style={{ fontWeight: 'bold' }}>{answererName}

                      <div className="date" style={{ fontWeight: 'normal' }}> ,  <Moment format="MMM, DD, YYYY">{answerDate}</Moment></div>
                      <div className="helpful" style={{ fontWeight: 'normal' }}> | Helpful?</div>
                      <div className="yes" style={{ fontWeight: 'normal' }}
                        onClick={() => this.answerUpdateHelpfulness(answerId,answerHelpful)} >
                          Yes ({this.state.answerHelpful})</div>
                      <div className="report" style={{ fontWeight: 'normal' }}> | Report</div>
                </div>
            </div>

        <div onClick={()=>this.fetchMoreQues(this.props.productId)}>LOAD MORE ANSWERS...</div>
      </div>
    );
  }
}

export default MoreAnswer;
