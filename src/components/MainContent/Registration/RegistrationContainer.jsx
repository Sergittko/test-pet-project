import React from "react";
import Registration from './Registration';
import { connect } from "react-redux";
import { saveNewUserTh, getTokenTh } from '../../../redux/users_reducer';

class RegistrationClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: null};
  }

  componentDidMount(){
    this.props.getTokenTh();
    if (window.innerWidth > 768) this.setState({count: 9});
    if (window.innerWidth <= 768) this.setState({count: 6});
    if (window.innerWidth <= 360) this.setState({count: 3});
  }

  render(){
    return <Registration token={this.props.token}
                         saveNewUserTh={this.props.saveNewUserTh}
                         count={this.state.count}/>
  }
}

let mapStateToProps = state => {
  return {
    token: state.users.token
  }
}

let RegistrationContainer = connect(mapStateToProps, {saveNewUserTh, getTokenTh})(RegistrationClassComponent);

export default RegistrationContainer;
