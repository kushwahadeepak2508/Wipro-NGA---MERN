import React from 'react'
import PropTypes from 'prop-types'
export default class UserStatus extends React.Component{
  constructor(props){
    super(props);
    this.state={message:'Fetching user status...'};
  }
  componentDidMount(){
    this.timer=setTimeout(()=>{this.setState({message:'Active User'})},2000);
  }
  componentWillUnmount(){ clearTimeout(this.timer); }
  render(){
    return <div style={{padding:8, background:'#f6f6f6'}}>{this.state.message}</div>;
  }
}
UserStatus.propTypes={ userId:PropTypes.number.isRequired };