import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from './styles.module.css';
import { setSelected } from '../../features/modal/navbarSideSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import { routes } from '@/utils/routes';
import axios from 'axios';

export default function MyRecipesComponent({writerId}) {

    const checkIfAuthorUrl = `${routes.baseUrl}${routes.api.checkIfWriter}`;
    const authorRecipesUrl = `${routes.baseUrl}${routes.api.getwriterrecipes}`;

    const dispatch = useDispatch();

    const {isLoggedIn , userName} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal)

    // useEffect(() => {
    //     if(isLoggedIn === false){
    //         setTimeout(() => {
    //             dispatch(openLoginModal());
    //         },50)}
    // },[isLoginModalOpen]);

    useEffect(() => {
        const response = axios.post(checkIfAuthorUrl , {
            writerId : writerId
        })
        .then(resp => {
            if(resp.data.isWriter === true)
                setIsWriter(true);
            else
                setIsWriter(false);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[writerId]);


    // const [myStories , setMyStories] = useState([{'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},
    //                                         {'title' : 'blog 1',
    //                                          'paras' : 'aaaaaaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaaa ',
    //                                          'titleImg' : '/homePageBackground.jpeg'},]);

    const [authorRecipes , setAuthorRecipes] = useState(['']);
    const [isWriter , setIsWriter] = useState(false);
            
    useEffect(() => {
        const response = axios.post(authorRecipesUrl , {
                "writerId" : writerId
        })
        .then(resp => {
            setAuthorRecipes(resp.data.storiesList);
        })
        .catch(err => console.log(err));
    },[])

    return (
        <div className={styles.wholeCont}>
            <Head>
                <title>Write recipe</title>
                <link rel="profile image" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="description" content="Web developer portfolio website"/>
                <meta name="keywords" content="food, recipe, foodgods, cusine, indian, italian, chineses, food, recipes"/>
                <meta name="author" content="Shiva Gowtham Kale"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div className={styles.topCont}>
            </div>
            <div className={styles.bottomCont}>
                <div className={styles.blogsCont}>
                    {
                        authorRecipes?.map((item) => {
                            return (
                                <div key={item} className={styles.eachBlogCont}>
                                    <div className={styles.eachBlogImgCont}>
                                        <img src={item.titleImg ? item.titleImg : '/foodIcon.png'} alt='Title image' className={styles.eachBlogImg} />
                                    </div>
                                    <div className={styles.eachBlogTextCont}>
                                        <h4 className={styles.blogTitle}>{item.title}</h4>
                                        <div className={styles.eachBlogContentCont}>
                                            <p className={styles.blogContent}>{item.paras}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.tagsCont}>
                    
                </div>
            </div>
        </div>
    )
}