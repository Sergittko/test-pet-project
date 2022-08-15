import style from './Description.module.scss';
import Button from '../../common/Button';
import {Link} from 'react-scroll';


const Description = props => {
  return (
    <div className={style.section_container} id='about_me'>
      <div className={style.section_text}>
        <h1>Test assignment for front-end developers</h1>
        {props.width <= 360 ?
        <p>Front-end developers make sure the user sees and interacts
           with all the necessary elements to ensure conversion.</p>:
        <p>Front-end developers make sure the user sees and interacts
           with all the necessary elements to ensure conversion.
           Therefore, responsive design, programming languages and specific
           frameworks are the must-have skillsets to look for when assessing
           your front-end developers.</p>
        }
        <Link to="sign_up" activeClass={style.active} smooth={true} spy={true} offset={-60} duration={500} >
          <Button text={'Sign up'}/>
        </Link>
      </div>
    </div>
  );
}

export default Description;
