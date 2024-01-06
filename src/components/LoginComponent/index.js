import styles from './styles.module.css';
import { openLoginModal , closeLoginModal } from '../../features/modal/loginModalSlice';
import {openSignupModal} from '../../features/modal/signupModalSlice';
import { useSelector ,useDispatch } from 'react-redux';
import { rememberTheUser } from '../../features/modal/rememberLoginSlice';
import { useState, useRef, useEffect } from 'react';
import {loginAction, tokenAction} from '../../features/modal/loginSlice';
import ForgotPasswordComponent from '../ForgotPasswordComponent';
// import useLocalStorage from '../../utils/useLocalStorage';
import axios from 'axios';
import { routes } from '@/utils/routes';

export default function LoginComponent() {


    const inputRef = useRef();

    const loginUrl = `${routes.baseUrl}${routes.api.login}`;

    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const [incorrect , setIncorrect] = useState(false);

    const [loginCreds , setLoginCreds] = useState({email : '',password : ''});
    const [selected, setSelected] = useState('email');
    const [hidePassword , setHidePassword] = useState(true);

    useEffect(() => {
        inputRef.current.focus();
    },[])

    const inputHandler = (e) => {

        const temp = {...loginCreds};
        if(e.target.name === 'email'){
            temp.email = e.target.value;
        }
        if(e.target.name === 'password'){
            temp.password = e.target.value;
        }
        setLoginCreds(temp);
    }

    const submitHandler = async () => {
        const response = await axios.post(loginUrl , {
                loginCreds : loginCreds
        })
        .then( resp => {
            if(resp.data.message === 'Login successful')
            {
                // console.log(resp.data.token);
                dispatch(loginAction(resp.data.savedUser));
                dispatch(tokenAction(resp.data.token));
                dispatch(closeLoginModal());
            }
            else if(resp.data.message === 'Login unsuccessful')
            {
                setIncorrect(true);
            }
        })
        .catch(err => console.log(err))
    }

    const registerHandler = () => {
        dispatch(closeLoginModal());
        dispatch(openSignupModal());
    }

    return(
        <div className={styles.wholeCont} onClick={e => dispatch(closeLoginModal())}>
            <div className={styles.modalCont} onClick={e => e.stopPropagation()}>
                <label className={`${styles.inputCont} ${selected === 'email'? styles.inputContClicked : ''}`} onClick={e => setSelected('email')}>
                    <p className={`${styles.inputTitle} ${selected === 'email'|| loginCreds.email != ''  ? styles.inputTitleClicked : ''}`}>Email</p>
                    <input className={`${styles.inputBox} ${selected === 'email' ? styles.inputBoxClicked : ''}`}
                    name='email'
                    ref={inputRef}
                    onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                    />
                </label>
                <label className={`${styles.inputCont} ${selected === 'password'? styles.inputContClicked : ''}`} onClick={e => setSelected('password')}>
                    <p className={`${styles.inputTitle} ${selected === 'password'|| loginCreds.password != ''  ? styles.inputTitleClicked : ''}`}>Password</p>
                    <input className={`${styles.inputBox} ${selected === 'password' ? styles.inputBoxClicked : ''}`}
                        name='password'
                        onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                        type={hidePassword ? "password" :"text"}
                    />
                    <img src='/passwordShow.png' className={styles.passwordShowBtn} alt='Password hide button' 
                        onClick = {e => {setHidePassword(!hidePassword)}}
                    />
                </label>
                {incorrect && <p className={styles.incorrectText}>Incorrect email or password</p>}
                <button className={styles.submitBtn} onClick={e => submitHandler()}>SIGN IN</button>
                <p className={styles.rememberMeText}>Not a member?</p>
                <p className={styles.forgotPassText} onClick={e => registerHandler()}>Register</p>
            </div>
        </div>
    )
}