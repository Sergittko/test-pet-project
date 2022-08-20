import style from './Header.module.scss';
import logo from '../../img/Logo.svg';
import menu from '../../img/Menu.svg';
import React, {useEffect} from 'react';
import {Link} from 'react-scroll';

const menuItems = [
  {
    value: 'About me',
    burger: false,
    addReactScroll: {
      linkTo: 'about_me'
    }
  },
  {
    value: 'Relationships',
    burger: false,
    addReactScroll: {
      linkTo: 'requirements'
    }
  },
  {
    value: 'Requirements',
    burger: false,
    addReactScroll: {
      linkTo: 'requirements'
    }
  },
  {
    value: 'Users',
    burger: false,
    addReactScroll: {
      linkTo: 'users'
    }
  },
  {
    value: 'Sign Up',
    burger: false,
    addReactScroll: {
      linkTo: 'sign_up'
    }
  },
  {
    value: 'How it works',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Partnership',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Help',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Level testimonial',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Contact us',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Articles',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Our news',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Testimonials',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Licenses',
    burger: true,
    addReactScroll: false
  },
  {
    value: 'Privacy Policy',
    burger: true,
    addReactScroll: false
  },
];
const Header = props => {
  const [menuActive, setMenuActive] = React.useState(false);

  useEffect(() => {
    if (menuActive) document.body.style.overflow = 'hidden';
    if (!menuActive) document.body.style.overflow = 'unset';
  }, [menuActive])

  let slideIn = () => setTimeout(() => setMenuActive(false), 400);

  return (
    <div className={style.header_container}>
      <Link className={style.main_logo} to={'about_me'} smooth={true} offset={-60} duration={500}>
        <img src={logo} alt=""/>
      </Link>
      {props.width > 768 ?
        <div className={style.navigation}>
          <nav>
            <ul>
            {menuItems.filter(item => !item.burger).map(item => {
                  return (<li key={item.value}>
                    <Link to={item.addReactScroll.linkTo} activeClass={style.active} smooth={true} spy={true} offset={-60} duration={500}>
                      {item.value}
                    </Link>
                  </li>)
              })}
            </ul>
          </nav>
        </div>
        :
        <div className={style.burgerMenu}>
          <div className={style.menuImage}>
            <img src={menu} onClick={()=>setMenuActive(true)} alt=""/>
          </div>
          <div className={menuActive? `${style.burgerMenuNavigation} ${style.activeMenu}`: style.burgerMenuNavigation}>
            <div className={style.background} onClick={()=>setMenuActive(false)}></div>
            <nav>
              <div>
                <img src={logo} alt=""/>
              </div>
              <ul>
                {menuItems.map(item => {
                  if(item.addReactScroll){
                    return (
                      <li key={item.value}>
                        <Link to={item.addReactScroll.linkTo} activeClass={style.active} smooth={true} spy={true} offset={-60} duration={500} onClick={()=>slideIn()}>
                          {item.value}
                        </Link>
                      </li>
                    )
                  }else{
                    return (
                      <li key={item.value}>
                        <Link to={'about_me'} smooth={true} spy={true} offset={-60} duration={500} onClick={()=>slideIn()}>{item.value}</Link>
                      </li>
                    )
                  }}
                )}
              </ul>
            </nav>
          </div>
        </div>
      }
    </div>
  );
}

export default Header;
