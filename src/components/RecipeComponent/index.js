import { useEffect, useState } from "react";
import styles from './styles.module.css';
import axios from "axios";
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import { closeLoginModal, openLoginModal } from "../../features/modal/loginModalSlice";
import {routes} from '../../utils/routes';
import useLocalStorage from "@/utils/useLocalStorage";

export default function RecipeComponent({recipeId}) {

    const getRecipeUrl = `${routes.baseUrl}${routes.api.getrecipe}`;
    const checkLikedUrl = `${routes.baseUrl}${routes.api.checkLiked}`;
    const changeLikedUrl = `${routes.baseUrl}${routes.api.changeLiked}`;
    const checkIfWriterUrl = `${routes.baseUrl}${routes.api.checkIfWriter}`;

    const dispatch = useDispatch();

    const {isLoggedIn, userName} = useSelector(store => store.loggedIn);

    const [currFocus, setCurrFocus] = useState('');
    const [s,b] = useState();

    const [recipe, setRecipe] = useState({'writtenBy' : '',
                                        'title' : '',
                                        'paras' : '',
                                        'titleImg' : '',
                                        'createdOn' : '',
                                        'likedBy' : [],
                                        'comments' : [{'commentBy':'a','comment' : '','date':'','time' : ''},
                                                    {'commentBy':'b', 'comment' : '','date' : '','time' : ''},
                                                    {'commentBy':'c', 'comment' : '', 'date' : '','time' : ''}]
                                        });

    const [likedByMe, setLikedByMe] = useState(false);
    const [isWriter , setIsWriter] = useState(false);

    useEffect(() => {
        const response = axios.post(getRecipeUrl , {
            recipeId : recipeId
        })
        .then(res => {
            setRecipe(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[recipeId])

    useEffect(() => {
        const response = axios.post(checkLikedUrl , {
            token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token"),
            recipeId : recipe._id
        }).then(resp => {
            setLikedByMe(resp.data.likedByMe);
        })
        .catch(err => {
            console.log(err.message);
        })

        const writerCheckResponse = axios.post(checkIfWriterUrl , {
            token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token"),
            writtenBy : recipe.writtenBy
        }).then(resp => {
            setIsWriter(resp.data.isWriter);
        })
        .catch(err => {
            console.log(err.message);
        })

    },[recipe, isLoggedIn])

    const likeHandler = async () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else {
            const likedCheck = await axios.post(changeLikedUrl ,{
                recipeId : recipe._id,
                token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
            })
            .then (res => {
                if(res.data.likedByMe === false){
                    setLikedByMe(false);
                }
                else
                    setLikedByMe(true);
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    const commentsHandler = async () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else{
            const likedCheck = await axios.post(likeUrl ,{
                userName : userName,
                recipeId : recipeId
            })
            .then (res => {
                if(res.data === 'No')
                    recipe.comments.push(userName);
                else
                    console.log("already liked")
            })
            .catch((err) => {
                console.log(err.message);
            })
        }
    }

    const bookmarkHandler = () => {
        if(isLoggedIn === false){
            dispatch(openLoginModal());
        }
        else{
            likes.push('') // push the user id
        }
    }

    return (
        <div className={styles.wholeCont}>
            <div className={styles.toolBox}>
                <div className={styles.likeCont} onClick={likeHandler}>
                    <img src={ likedByMe ? '/likedIcon.png' : '/likeIcon.png'} 
                        className={styles.likeIcon}
                        />
                    <p className={styles.numberOfLikes}>{recipe.likedBy?.length}</p>
                </div>
                {/* <div className={styles.likeCont} onClick={commentsHandler}>
                    <img src='/commentIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{recipe.comments.length}</p>
                </div> */}
                {/* <div className={styles.likeCont} onClick={bookmarkHandler}>
                    <img src='/bookmarkIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{story.likes}</p>
                </div> */}
                {/* <div className={styles.likeCont}>
                    <img src='/likeIcon.png' className={styles.likeIcon}/>
                    <p className={styles.numberOfLikes}>{recipe.likes.length}</p>
                </div> */}
            </div>
            <div className={styles.cont}>
                    <h1 className={styles.title}>{recipe.title}</h1>
                    <Link className={styles.writtenByCont} href={`/profile/${recipe.writtenBy}`}>
                        <img src={recipe.titleImg === '' ? '/loginIcon.png' : '/loginIcon.png'} 
                            className={styles.writerAvatar}  alt='writer profile picture'
                        />
                        <p className={styles.writtenBy}>{userName}</p>
                    </Link>
                    <div className={styles.imageCont}>
                        <img src={'/homePageBackground.jpeg'} alt='Title Image' className={styles.titleImg}/>
                    </div>
                
                  <p className={styles.paras}>{recipe.paras}</p>
            </div>
            {isWriter && 
                <Link className={styles.updateBtn} href={`/update/${recipeId}`} >Update</Link> 
            }
        </div>
    )
}