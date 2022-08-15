import style from './Preloader.module.scss';

const Preloader = props => {
  return (
    <div className={style.preloader_container}>
      <label className={style.preloader}></label>
    </div>
  );
}

export default Preloader;
