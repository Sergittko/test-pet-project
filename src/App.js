import React, { useLayoutEffect, useState } from 'react';
import Header from './components/Header/Header';
import Description from './components/MainContent/Description/Description';
import Info from './components/MainContent/Info/Info';
import UserContainer from './components/MainContent/Users/UserContainer';
import RegistrationContainer from './components/MainContent/Registration/RegistrationContainer';
import Footer from './components/Footer/Footer';
import style from './App.module.css';

function App(props) {
  const [width, setWidth] = useState(null);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className={style.app_container}>
      <div className={style.header}>
        <Header width={width}/>
      </div>
      <div className={style.main_section}>
        <div className={style.descriptionContainer}>
          <Description width={width}/>
        </div>
        <Info width={width}/>
        <UserContainer width={width}/>
        <RegistrationContainer />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
