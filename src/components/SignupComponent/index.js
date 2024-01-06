import Link from 'next/link';
import styles from './styles.module.css';
import { useRef, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {routes} from '@/utils/routes';
import { openLoginModal } from '@/features/modal/loginModalSlice';
import { closeSignupModal } from '@/features/modal/signupModalSlice';
import { tokenAction } from '@/features/modal/loginSlice';
import { useDispatch } from 'react-redux';
import NotificationComponent from '../NotificationComponent';
import { useRouter } from 'next/router';

export default function SignupComponent() {

    const signupURL = `${routes.baseUrl}${routes.api.signup}`;

    const router = useRouter();

    const dispatch = useDispatch();

    const inputRef = useRef();
    const confrmP = useRef();

    useEffect(() =>{
        inputRef.current.focus();
    },[])

    const [selected, setSelected] = useState('name');
    const [signupCreds, setSignupCreds] = useState({name : '' , email : '' , password : ''});
    const [hidePassword , setHidePassword] = useState(true);
    const [passwordConfirmed , setPasswordConfirmed] = useState();
    const [confirmPass , setConfirmPass] = useState();
    const [signup, setSignup] = useState(false);

    const inputHandler = (e) => {

        const temp = {...signupCreds};
        if(e.target.name == 'name')
            temp.name = e.target.value;
        if(e.target.name === 'email'){
            temp.email = e.target.value;
        }
        if(e.target.name === 'password'){
            temp.password = e.target.value;
        }
        setSignupCreds(temp);
    }

    const confrm = useMemo(() => {
        if(confirmPass === signupCreds.password)
            setPasswordConfirmed(true);
        else
            setPasswordConfirmed(false);
    },[confirmPass,signupCreds.password])

    const signupHandler = () => {

        if(passwordConfirmed) {
            const response = axios.post(signupURL, {
                signupCreds : signupCreds
            })
            .then(resp => {
                if(resp.data.message === 'Signin successful'){
                    setSignup(true);
                    dispatch(tokenAction(resp.data.token));
                    router.reload();
                    dispatch(closeSignupModal());
                }
                else
                    console.log('not saved');
            })
            .catch(err => console.log("ERR: ",err.message));
        }
    }

    return (
        <div className={styles.wholeCont} onClick={e => dispatch(closeSignupModal())}>
            {signup && <NotificationComponent  message={`User saved \n Please Refresh to continue`} imp ='3'/>}
            <div className={styles.registrationCont} onClick={e => e.stopPropagation()}>
                <label className={`${styles.inputCont} ${selected === 'name'? styles.inputContClicked : ''}`} 
                    onClick={e => {e.stopPropagation(),setSelected('name')}}>
                    <p className={`${styles.inputTitle} ${selected === 'name'|| signupCreds.email != ''  ? styles.inputTitleClicked : ''}`}>Name</p>
                    <input className={`${styles.inputBox} ${selected === 'name' ? styles.inputBoxClicked : ''}`}
                        name='name'
                        ref={inputRef}
                        onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                    />
                </label>
                <label className={`${styles.inputCont} ${selected === 'email'? styles.inputContClicked : ''}`} 
                    onClick={e => {e.stopPropagation(),setSelected('email')}}>
                    <p className={`${styles.inputTitle} ${selected === 'email'|| signupCreds.email != ''  ? styles.inputTitleClicked : ''}`}>Email</p>
                    <input className={`${styles.inputBox} ${selected === 'email' ? styles.inputBoxClicked : ''}`}
                        name='email'
                        ref={inputRef}
                        onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                    />
                </label>
                <label className={`${styles.inputCont} ${selected === 'password'? styles.inputContClicked : ''} ${confirmPass ? (!passwordConfirmed ? styles.inputContWrong : styles.inputContRight) : ''}`}
                    onClick={e => {e.stopPropagation(),setSelected('password')}}>
                    <p className={`${styles.inputTitle} ${selected === 'password'|| signupCreds.password != ''  ? styles.inputTitleClicked : ''}`}>Password</p>
                    <input className={`${styles.inputBox} ${selected === 'password' ? styles.inputBoxClicked : ''} `}
                        name='password'
                        onChange={(e) => {e.stopPropagation(),inputHandler(e)}}
                        type={hidePassword ? "password" :"text"}
                    />
                    <img src='/passwordShow.png' className={styles.passwordShowBtn} alt='Password hide button' 
                        onClick = {e => {e.stopPropagation(),setHidePassword(!hidePassword)}}
                    />
                </label>
                <label className={`${styles.inputCont} ${selected === 'confirmPassword'? styles.inputContClicked : ''} ${confirmPass ? (!passwordConfirmed ? styles.inputContWrong : styles.inputContRight) : ''}`} 
                    onClick={e => {e.stopPropagation(),setSelected('confirmPassword')}}>
                    <p className={`${styles.inputTitle} ${selected === 'confirmPassword'|| confirmPass  ? styles.inputTitleClicked : ''}`}>Confirm Password</p>
                    <input className={`${styles.inputBox} ${selected === 'confirmPassword' ? styles.inputBoxClicked : ''} `}
                        name='confirmPassword'
                        ref={confrmP}
                        onChange={(e) => {e.stopPropagation(),setConfirmPass(e.target.value)}}
                        type={hidePassword ? "password" :"text"}
                    />
                    <img src='/passwordShow.png' className={styles.passwordShowBtn} alt='Password hide button' 
                        onClick = {e => {e.stopPropagation(),setHidePassword(!hidePassword)}}
                    />
                </label>
                <div className={styles.signupButton} onClick={signupHandler}>
                    Sign up
                </div>
                <div className={styles.bottomTextCont} onClick={e => {dispatch(openLoginModal()),dispatch(closeSignupModal())}}>
                    <p className={styles.bottomText}>Already have an Account?</p>
                    <p className={styles.bottomTextRed}>Login In</p>
                </div>
                <div className={styles.orDiv}>
                    <hr className={styles.line}/>
                    <p className={styles.orText}>OR</p>
                    <hr className={styles.line}/>
                </div>
                <div className={styles.bottomCont}>
                    <img className={styles.eachAuthIcon}
                        src='/googleAuthIcon.png' alt='google authentication icon' />
                    <img className={styles.eachAuthIcon}
                        src='/AppleAuthIcon.png' alt='google authentication icon' />
                    <img className={styles.eachAuthIcon}
                        src='/phoneAuthIcon.png' alt='google authentication icon' />
                </div>
            </div>
        </div>
    )
}