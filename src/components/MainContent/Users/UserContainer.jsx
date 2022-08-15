import React from "react";
import Users from './Users';
import { connect } from "react-redux";
import { getUsersTh, addUsersTh } from '../../../redux/users_reducer';

class UserClassComponent extends React.Component {
  componentDidMount(){
    let cardsCount = 9;
    if (window.innerWidth <= 768) cardsCount = 6;
    if (window.innerWidth <= 360) cardsCount = 3;
    this.props.getUsersTh(cardsCount);
  }

  render() {
    return <Users users={this.props.users}
                  addUsers={this.props.addUsersTh}
                  link={this.props.link}
                  areUsersFething={this.props.areUsersFething}/>
  }
}

let mapStateToProps = state => {
  return {
    users: state.users.users,
    link: state.users.getNextUsersPage,
    areUsersFething: state.users.areUsersFething,
  }
}

let UserContainer = connect(mapStateToProps, {
  getUsersTh,
  addUsersTh
})(UserClassComponent);

export default UserContainer;
