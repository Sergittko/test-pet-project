import style from './Registration.module.scss';
import {useState, useEffect} from 'react';
import Button from '../../common/Button';
import {Link} from 'react-scroll';
import { Form, Field } from 'react-final-form';
import { connect } from "react-redux";
import { saveNewUserTh } from '../../../redux/users_reducer';
import formatString from "format-string-by-pattern";

const required = visited => value =>(visited && !value)? 'This field is requiered': undefined;
const minValue = min => value => isNaN(value) || value >= min ? undefined : `Should start +380`;
const nameLength = visited => value => ((60 < value?.length || value?.length < 2) && visited)? 'Name should be 2-60 characters' : undefined;

const nameValidation = visited => value => {
  if (visited && !value) return 'This field is requiered';
  if (60 < value?.length || value?.length < 2) return 'Name should be 2-60 characters';
  return undefined;
}

const phoneValidation = visited => value => {
  if (visited && !value) return 'This field is requiered';
  if (visited && isNaN(value)) return 'Enter only numbers';
  return undefined;
}


const fileValidation = (visited, file) => value => {
  const reader = new FileReader();
  reader.onload = (value) => {
    const image = new Image();
    image.src = value.target.result;
    image.onload = () => {
      if (image.width < 70 || image.height < 70) return 'Resolution should be at least 70x70'
    };
  };
  if (typeof value === 'object') return reader.readAsDataURL(value);
  if (file.size > 5000000) return 'Size must not exceed 5MB';
  return undefined;
}

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true }}>
    {({ meta: { error } }) => (error ? <span className={style.input_error}>{error}</span> : null)}
  </Field>
);

const Registration = props => {
  let [fileName, changeFileName] = useState('Upload your photo');
  let [fileNameChanged, isFileNameChanged] = useState(false);
  let [modal, changeModalDisplay] = useState(false);
  
  useEffect(() => {
    if (modal) document.body.style.overflow = 'hidden';
    if (!modal) document.body.style.overflow = 'unset';
  }, [modal])

  let onSubmit = (formData, form) => {
    props.saveNewUserTh(props.token, {...formData, photo: fileName}, props.count)
    .then(resp => { if(resp) {changeModalDisplay(true); form.reset()}})
  }

  return (
    <div className={style.registration_container} id='sign_up'>
      <h1>Register to get a work</h1>
      <h2>Your personal data is stored according to the Privacy Policy</h2>

      <Form onSubmit={onSubmit}>
      {({ handleSubmit, visited })=>(
        <form onSubmit={handleSubmit} className={style.registration_section}>
          <div className={style.input_container}>
            <div className={style.input_item}>
              <Error name="name" />
              <Field component="input"
                     type="text"
                     name="name"
                     id='name'
                     autoComplete="off"
                     placeholder='n'
                     validate={nameValidation(visited['name'])}/>
              <label id="form" htmlFor="name">Your name</label>
            </div>

            <div className={style.input_item}>
              <Error name="email" />
              <Field component="input"
                     type="text"
                     name="email"
                     id='email'
                     autoComplete="off"
                     pattern='^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$'
                     validate={required(visited['email'])}
                     placeholder='e'/>
              <label htmlFor="email">Email</label>
            </div>

            <div className={style.input_item}>
              <Error name="phone" />
              <Field component="input"
                     type="text"
                     name="phone"
                     id='phone'
                     autoComplete="off"
                     pattern='^[\+]{0,1}380([0-9]{9})$'
                     parse={formatString("+380XXXXXXXXX")}
                     placeholder='p'
                     maxLength='13'
                     validate={phoneValidation(visited['phone'])}/>
              <label htmlFor="phone">Phone</label>
            </div>

          </div>
          <div className={style.radio_container}>
            <p>Select your position</p>
            <span className={style.im_buttons}>
              <label className={style.button, style.radio}>
                <Field component="input" value='1' className={style.button} name="position_id" type="radio"/>
                <span>Frontend developer</span>
              </label>
              <label className={style.button, style.radio}>
                <Field component="input" value='2' className={style.button} name="position_id" type="radio"/>
                <span>Backend developer</span>
              </label>
              <label className={style.button, style.radio}>
                <Field component="input" value='4' className={style.button} name="position_id" type="radio"/>
                <span>Designer</span>
              </label>
              <label className={style.button, style.radio}>
                <Field component="input" value='3' className={style.button} name="position_id" type="radio"/>
                <span>QA</span>
              </label>
            </span>
          </div>

          <div className={style.file_container}>
            <Error name="photo" />
            <Field
              component="input"
              type="file"
              name="photo"
              onChange={(e)=>{changeFileName(e.target.files[0]); isFileNameChanged(true)}}
              className={style.input_file}
              id="uploadPhoto"
              validate={fileValidation(visited.photo, fileName)}/>
            <label className={style.input_file_label} htmlFor="uploadPhoto">Upload</label>
            <span className={`${style.span_text} ${fileNameChanged ? style.fileNameChanged : null}`} id="file_name">{fileNameChanged ? fileName.name: fileName}</span>
          </div>
          <div>
            <Button text={'Sign up'}/>
          </div>
        </form>
      )}
      </Form>


      {modal ? <div className={style.modal}>
        <div className={style.modal_container}>
          <h1>Congratulations</h1>
          <p>You have successfully passed the registration</p>
          <div>
            <Button onClick={()=>changeModalDisplay(false)} text={
              <Link onClick={()=>changeModalDisplay(false)} to={'users'} smooth={true} offset={-60} duration={500}>
                Great
              </Link>
            }/>
          </div>
        </div>
      </div> : null}
    </div>
  );
}

export default Registration;
