import style from './Info.module.scss';
import imageBig from '../../../img/Image-387x340.svg';
import imageMiddle from '../../../img/Image-328x287.svg';
import imageSmall from '../../../img/Image-296x260.svg';
import React from 'react'
import Button from '../../common/Button';
import {Link} from 'react-scroll';


const Info = () => {
  const [image, setImage] = React.useState(imageBig)

  let handleResize = () => {
    let width = window.innerWidth;
    if (width <= 360 && width >= 0) return setImage(imageMiddle);
    if (width <= 768 && width > 360) return setImage(imageSmall);
    if (width > 768) return setImage(imageBig);
  }

  React.useEffect(() => {window.addEventListener('resize', handleResize, false)},[])
  return (
    <div className={style.info_container} id='requirements'>
      <div className={style.image_container}>
        <img src={image} alt=""/>
      </div>
      <div className={style.info_text}>
        <h1>Let's get acquainted</h1>
        <h2>I'm a good front-end developer</h2>
        <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
        <Link to="sign_up" activeClass={style.active} smooth={true} spy={true} offset={-60} duration={500} >
          <Button text={'Sign up'}/>
        </Link>
      </div>
    </div>
  );
}

export default Info;
