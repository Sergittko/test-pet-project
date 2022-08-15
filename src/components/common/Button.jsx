import style from './Button.module.scss';

function Button(props) {
  return (
    <div>
      {props.onClick?
        <button className={style.buttonComponent} onClick={()=>props.onClick()}>{props.text}</button> :
        <button className={style.buttonComponent}>{props.text}</button>}
    </div>
  );
}

export default Button;
