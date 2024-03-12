import { useEffect, useState } from "react";
import styles from './styles.module.css';
import SearchComponent from "../SearchComponent/indix";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "@/features/modal/loginModalSlice";
import { logoutAction } from "@/features/modal/loginSlice";
import useLocalStorage from "@/utils/useLocalStorage";

export default function NavBar ({scrollUp, totalHeight}) {

    const dispatch = useDispatch();

    const {} = useSelector(store => store.loginModal);
    const {isLoggedIn, userEmail, userName, userProfilePic} = useSelector(store => store.loggedIn);

    const logoutHandler = () => {
        dispatch(logoutAction());
        useLocalStorage.clearLocalStorage();
    }

    return (
        <nav className={`${styles.wholeCont} ${scrollUp > 0 ? styles.wholeContScroll : ''}`}>
            {/* <div className={styles.logoCont}> */}
                <img className={styles.logoImg} 
                    src='/ecowiserLogo.png' alt="Ecowiser Logo"
                />
            {/* </div> */}
            <div className={styles.menuCont}>
                <SearchComponent />
                {
                    isLoggedIn
                ?
                    <div className = {styles.loginImgCont}>
                        <img src={userProfilePic ? userProfilePic : '/loginIcon.png'} className = {styles.loginImg} alt='login image'/>
                        <p className={`${styles.emailText} ${scrollUp > 0 ? styles.emailTextScroll : ''}`}>{userName}</p>
                        <div className = {styles.logoutCont} onClick={logoutHandler} >
                            <p className={styles.logoutText} >Logout</p>
                        </div>
                    </div>
                :
                    <div className = {styles.eachMenuOptionCont} onClick={e => dispatch(openLoginModal())}>
                        {/* <span className = {styles.eachMenuOptionSpan}></span> */}
                        <p className={styles.eachMenuOptionAbsolute}>Login/Signup</p>
                        <p className = {styles.eachMenuOption} >Login/Signup</p>
                    </div>
                }
            </div>
        </nav>
    )
}