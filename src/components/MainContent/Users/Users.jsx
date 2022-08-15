import style from './Users.module.scss';
import defaultImage from '../../../img/Photo-cover.svg';
import Button from '../../common/Button';
import ReactTooltip from 'react-tooltip';
import Preloader from '../../common/Preloader/Preloader';

const Users = props => {

  return (
    <div className={style.users_container} id='users'>
      <h1>Our cheerful users</h1>
      <h2>The best specialists are shown below</h2>
      {props.users === (null || undefined) ? (<p>Users didn't load</p>) : (
        <div className={style.users_section}>
        {props.users.map(user => (
          <div className={style.user_block} key={user.id}>
          {(user.photo.slice((user.photo.lastIndexOf(".") - 1 >>> 0) + 2)) === 'png'?
            <img src={defaultImage} alt=""/> : <img src={user.photo} alt=""/>}
            <p className={style.user_name}
               data-tip={user.name}
               data-for="name_tip">
               {user.name}
            </p>
            <ReactTooltip id="name_tip"
                          place="bottom"
                          effect="float"
                          className={style.tooltip}/>
            <p className={style.user_position}>{user.position}</p>
            <p className={style.user_email}
               data-tip={user.email}
               data-for="email_tip">{user.email}</p>
            <ReactTooltip id="email_tip"
                          place="bottom"
                          effect="float"
                          className={style.tooltip}/>
            <p className={style.user_phone}>{user.phone}</p>
          </div>))}
      </div>)}
      <div>
        {props.areUsersFething ?
          <Preloader/> :
          <Button onClick={()=>props.addUsers(props.link)} text={'Show more'}/>}
      </div>
    </div>
  );
}

export default Users;
