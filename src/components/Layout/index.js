import { useState, useEffect, useMemo } from "react";
import styles from './styles.module.css';
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";
import { closeSearchModal } from "@/features/modal/searchModalSlice";
import { closeLoginModal } from "@/features/modal/loginModalSlice";
import { loginAction } from "@/features/modal/loginSlice";
import LoginComponent from "../LoginComponent";
import SignupComponent from "../SignupComponent";
import ShareComponent from "../ShareComponent";
import { routes } from "@/utils/routes";
import axios from "axios";
import NotificationComponent from "../NotificationComponent";
import useLocalStorage from "@/utils/useLocalStorage";


export default function Layout({children}) {

    const dispatch = useDispatch();

    const baseUrl = `${routes.baseUrl}`;

    const {isSearchModelOpen} = useSelector(store => store.searchModal);
    const {isLoggedIn, jwt_auth_token} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {isSignupModalOpen} = useSelector(store => store.signupModal)

    const [mousePos, setMousePos] = useState({x:60, y:60});

    const [totalHeight, setTotalHeight] = useState(0);
    const [scrollUp, setScrollUp] = useState(0);

    const [jwt, setJwt] = useState();

    useEffect(() => {
        setJwt(useLocalStorage.getItemFromLocalStorage("jwt_auth_token"));
    },[jwt_auth_token]);

    const checkAuth =  useMemo(() => {
        if(isLoggedIn === false) {
            const response = axios.post(baseUrl , {
                token : jwt
            }).then(resp => {
                if(resp.data.authorized === true)
                    dispatch(loginAction(resp.data.user));
            }).catch((err) => {
                console.log("ERROR : ",err);
            })
        }
    },[jwt])

    useEffect(() => {
            setTotalHeight(document.getElementById('layoutId').offsetHeight - window.innerHeight )
    },[])

    useEffect(() => {
            setMousePos({x:document.body.clientX, y: document.body.clientY});

    },[])

    useEffect(() => {
        const scrollListener = (e) => {
                setScrollUp(window.scrollY);
        }

        document.addEventListener("scroll", scrollListener);
        return(() => {
            document.removeEventListener("scroll", scrollListener);
        })

    })


    useEffect(() => {
        // Custom cursor operator
        const updateMouseLoc = (e) => {
            setMousePos({ x: e.clientX - 20, y: e.clientY - 20 });
        };

        document.body.addEventListener('mousemove', updateMouseLoc);
        return () => { document.body.removeEventListener('mousemove',updateMouseLoc); }
    },[]);

    const updateMouseLocClick = (e) => {
        setMousePos({ x: e.clientX - 25, y: e.clientY - 25 });
    }

    const cursorStyle = {
        left : mousePos.x ,
        top : mousePos.y 
    }

    const cursorDotStyle = {
        left : mousePos.x + 15,
        top : mousePos.y + 15
    }

    const topScrollBarStyle = {
        width : `${(scrollUp * 79)/totalHeight}%`
    }

    return (
        <div className={styles.wholeCont} id='layoutId' onClick={e => dispatch(closeSearchModal())}>
            <NavBar scrollUp={scrollUp} totalHeight={totalHeight} />
            <ShareComponent />
            {/* {isLoggedIn && <NotificationComponent message='loggedin sucessfully' imp='1'/> } */}
            <hr className={`${styles.topScrollBar} ${scrollUp > 0 ? styles.topScrollBarOnScroll : ''}`} style={topScrollBarStyle}></hr>
            {isLoginModalOpen && <LoginComponent />}
            {isSignupModalOpen && <SignupComponent />}

            <div className={`${styles.mouseDiv} `} style={cursorStyle} onClick={updateMouseLocClick}></div>
            <div className={`${styles.mouseDotDiv} `} style={cursorDotStyle} onClick={updateMouseLocClick}></div>
            <div className={styles.childCont}>
                <main>{children}</main>
            </div>

            <Footer />
        </div>
    )
}