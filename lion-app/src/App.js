
import './App.css';
import React, { Component } from 'react';

class WorldClock extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hour: this.props.time,
      minute: 0,
      stop: false,
      start: true
      }
  } 
  componentDidMount(){
    this.timer = setInterval(()=>{
      this.setState((state)=>(
         state.minute === 59
         ? {hour: state.hour +1, minute: 0}
         : {minute:state.minute+1}))
       this.setState((state)=>state.hour === 24 ? {hour:0} : {})
     },1000)
     console.log("  Child) 시작합니다.")
    console.log("  Child) 마운트되었습니다.")
  }
  componentDidUpdate(){
    console.log("  Child) 업데이트!")
  }
  componentWillUnmount(){
    console.log("  Child) 언마운트!")
    clearInterval(this.timer)
  }
  handlingClick = (e) =>{
    this.setState({stop:e.target.value, start: false})
    clearInterval(this.timer)
  }  
  handlingClick2 = (e) => {
    if(this.state.start === false){
        this.timer = setInterval(()=>{
        this.setState((state)=>(
         state.minute === 59
         ? {hour: state.hour +1, minute: 0}
         : {minute:state.minute+1}))
       this.setState((state)=>state.hour === 24 ? {hour:0} : {})
     },1000)
     this.setState({start:true})
    }
    else{

    }
  }
  render(){
  return(
    <div className={"WorldClock"}>
      <h2>도시:{this.props.city}</h2>
      <p>시간:{this.state.hour}시 {this.state.minute}분</p>
      <button value={true} onClick={this.handlingClick} >멈춰!</button>
      <button  onClick={this.handlingClick2} >시작</button>
    </div>
  )
  }
}
class App extends Component {
  constructor(props){
    super(props)
     this.cityTimeData =[
      ['서울',10],['베이징',23],['시드니',12],['LA',17],['부산',10]
    ]
    this.state = {
      content : '',
      show: true,
    }
    console.log("Parent) 시작합니다.")
  }
  componentDidMount(){
    console.log("Parent) 마운트되었습니다.")
  }
  componentDidUpdate(){
    console.log("Parent) 업데이트!")
  }

  handlingChange = (e) =>{
    this.setState({content: e.target.value})
  }
  handlingClick = (e) =>{
    this.setState((prevState)=>({show: !prevState.show}))
  }
 
  render(){
    
    return(
      <div className="App">
      <h1 className={'mystyle'}>안녕하세요</h1>
      <div className={'post'}>첫 게시글입니다.
      <textarea className={'text'} value={this.state.content} onChange={this.handlingChange}></textarea>
      </div>
      <button onClick={this.handlingClick}>손가락 튕기기!</button>
      {
        //true && true -> 보여진다
        //false && true -> 안보여진다

      }

      
      {this.state.show &&
      this.cityTimeData.map((citytime,index)=>
    <WorldClock city={citytime[0]} time={citytime[1]} key={index}></WorldClock>
      )    
    }
  
      
      </div>
    )

}
}


export default App;
