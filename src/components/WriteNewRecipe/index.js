import { useState,useEffect, useRef, useMemo } from 'react';
import styles from './styles.module.css';
import Head from 'next/head';
import {useDispatch , useSelector} from 'react-redux';
import { openLoginModal } from '../../features/modal/loginModalSlice';
import { redirect } from 'next/dist/server/api-utils';
import {routes} from '@/utils/routes';
import axios from 'axios';
import NotificationComponent from '../NotificationComponent';
import useLocalStorage from '@/utils/useLocalStorage';
import { useRouter } from 'next/router';
import {storage} from '../../utils/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function WriteNewRecipe() {

    const router = useRouter();
    const paraText = useRef();
    const tagsInputRef = useRef();
    const ingredientInputRef = useRef();

    console.log("storage : ",storage);

    const recipeAddURL = `${routes.baseUrl}${routes.api.addRecipe}`;
    console.log(recipeAddURL)

    const dispatch = useDispatch();

    const {isLoggedIn} = useSelector(store => store.loggedIn);
    const {isLoginModalOpen} = useSelector(store => store.loginModal);
    const {userName} = useSelector(store => store.loggedIn);

    const [percent, setPercent] = useState();

    useEffect(() => {
        if(isLoggedIn === false)
        {
            setTimeout(() => {
                dispatch(openLoginModal());
            },50);
        }
    },[isLoginModalOpen]);

    useEffect(() => {
        const temp = newRecipe;
        newRecipe.writerId = userName;
        setNewRecipe(temp);
    },[userName]);

    const [newRecipe , setNewRecipe] = useState({'writerId' : '',
                                             'title' : '',
                                             'paras' : '',
                                             'titleImg' : '',
                                             'tags' : [],
                                             'ingredients' : [],
                                             'likedBy' : [],
                                             'createdOn' : []
                                            });
    const [mainImg, setMainImg] = useState();
    const [currFocus, setCurrFocus] = useState(0);
    const [posted , setPosted] = useState(false);
    const [currTag, setCurrTag] = useState('');
    const [currIngredient, setCurrIngredient] = useState('');

    useEffect(() => {
        if(paraText !== null && paraText.current !== null && paraText.current.style !== null)
            paraText.current.style.height = paraText?.current.scrollHeight+"px";
    },[newRecipe.paras])


    const titleHandler = (e) => {
        const temp = {...newRecipe};
        temp.title = e.target.value;
        setNewRecipe(temp);
    }

    const imageHandler = (e) => {
        // const temp = {...newRecipe};
        // temp.titleImg = e.target.files[0];
        // setNewRecipe(temp);
        setMainImg(e.target.files[0]);
    }

    const paraWriter = (e) => {
        const temp = {...newRecipe};
        temp.paras = e.target.value;
        setNewRecipe(temp);
    }

    useEffect(() => {
        if(posted !== false)
            router.replace(`/recipe/${posted}`);
    },[posted])

    console.log("NewRecipe: ", newRecipe);

    const submitHandler = async (e) => {
        if(isLoggedIn === false)
            dispatch(openLoginModal());
        else if(newRecipe.title === '') {
            alert("Title missing");
            return;
        }
        else if(newRecipe.paras === '') {
            alert("Paras missing");
        }
        else {
            if(mainImg) {
                const storageRef = ref(storage, `/blogs-images/${mainImg.name}`);
                const uploadTask = uploadBytesResumable(storageRef, mainImg);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes)*100
                        );
                        setPercent(percent);
                    },
                    (err) => {
                        console.log(err);
                        alert("The image is not saved!")
                        return;
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            const temp = newRecipe;
                            temp.titleImg = url;
                            setNewRecipe(temp);
                        })
                        .then(() => {
                            axios.post( recipeAddURL , {
                                    newRecipe : newRecipe,
                                    token : useLocalStorage.getItemFromLocalStorage("jwt_auth_token")
                            })
                            .then( resp => {
                                if(resp.data.message === 'Recipe saved')
                                {
                                    console.log("Recipe Saved");
                                    setPosted(newRecipe.title.replace('/ /g', '-'));
                                }
                                else if(resp.data.message === 'No Title!')
                                {
                                    alert("Pleas enter a title")
                                }
                                else if(resp.data.message === 'No Content!')
                                {
                                    console.log("No Content!")
                                }
                                else if(resp.data.message === 'Title already exists')
                                {
                                    alert("Title already exists");
                                }
                            })
                            .catch(err => console.log(err));
                        });
                    }
                )
            }
        }
    }

    const tagsClickHandler = (e) => {
        e.stopPropagation();

    }

    const tagsContClickHandler = (e) => {
        e.stopPropagation();
        setCurrFocus('tags');
        tagsInputRef.current.focus();
    }

    const tagsInputEnterHandler = (e) => {
        if(e.key === 'Enter') {
            if(newRecipe.tags.includes(currTag)) {
                console.log("Already added");
            }
            else if(newRecipe.tags.length === 10)
                console.log("Only 10 allowed");
            else {
                const temp = {...newRecipe};
                temp.tags.push(currTag.toLowerCase());
                setNewRecipe(temp);
                e.target.value = '';
            }
        }
    }

    // const deleteTagHandler = (e,thisTag) => {
    //     const temp = {...newRecipe};
    //     console.log(thisTag);
    //     temp.tags.filter( tag => {
    //         return tag === thisTag;
    //     })
    //     setNewRecipe(temp);
    // }

    const ingredientsClickHandler = (e) => {
        e.stopPropagation();
    }

    const ingredientsContClickHandler = (e) => {
        e.stopPropagation();
        setCurrFocus('ingredients');
        ingredientInputRef.current.focus();
    }

    const ingredientsInputEnterHandler = (e) => {
        if(e.key === 'Enter') {
            if(newRecipe.ingredients.includes(currIngredient)) {
                console.log("Already added");
            }
            else {
                const temp = {...newRecipe};
                temp.ingredients.push(currIngredient.toLowerCase());
                setNewRecipe(temp);
                e.target.value = '';
            }
        }
    }

    return(
        <div className={styles.wholeCont} onClick={e => setCurrFocus(null)}>
            <Head>
                <title>Write recipe</title>
                <link rel="profile image" href="/favicon.ico" />
                <meta charset="UTF-8" />
                <meta name="description" content="Web developer portfolio website"/>
                <meta name="keywords" content="food, recipe, foodgods, cusine, indian, italian, chineses, food, recipes"/>
                <meta name="author" content="Shiva Gowtham Kale"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* <div className={styles.leftCont}>
            </div> */}
            {/* {posted && <NotificationComponent message='The story has been saved' />} */}
            <div className={styles.cont}>
                {/* <div className={styles.numberOfParasCont}>
                    <p className={styles.numberOfParas}>Paras : {paras.length}</p>
                </div> */}
                <div className={styles.titleCont} onClick={e => {e.stopPropagation(),setCurrFocus('title')}}>
                {currFocus === 'title' || newRecipe.title === ''
                  ?
                    <textarea placeholder='Enter the title here' className={styles.titleInput} 
                        onChange={e => titleHandler(e)} value={newRecipe.title}
                    />
                  :
                    <h1 className={styles.title}>{newRecipe.title}</h1>
                }
                </div>
                {
                    mainImg
                    ?
                    <div className={`${styles.imageCont} ${mainImg !== '' ? styles.imageContUploaded : ''}`}>
                        <img src={newRecipe.titleImg === '' ? URL.createObjectURL(mainImg) : newRecipe.titleImg} alt='Title Image' className={styles.titleImg}/>
                        <label className={styles.imageChangeCont} onChange={e => imageHandler(e)}>
                            <input type='file' accept='image.jpeg, image/png' className={styles.uploadChangeInput} />
                            {/* <button className={styles.uploadChangeBtn}>Change Image</button> */}
                            <img src='/cameraIcon.png' alt='camera icon' className={styles.uploadChangeImg}/>
                        </label>
                    </div>
                    :
                    <label className={styles.imageCont} onChange={e => imageHandler(e)}>
                        <input type='file' accept='image.jpeg, image/png' className={styles.uploadInput} />
                        <button className={styles.uploadBtn}>Upload Image</button>
                    </label>
                }

                <div className={styles.tagsCont} onClick={tagsContClickHandler}>
                    {
                        newRecipe.tags?.map((eachTag, i) => {
                            return (
                                <div key={eachTag} className={styles.eachTagCont} onClick={tagsClickHandler}>
                                    <p className={styles.eachTagText}>{eachTag}</p>
                                    <img className={styles.crossImg} onClick={e => deleteTagHandler(e,eachTag)}
                                        src='/crossIcon.png' alt='close button icon'
                                    />
                                </div>
                            )
                        })
                    }
                    <input className={`${styles.eachTagInput} ${currFocus === 'tags' || newRecipe.tags.length === 0 ? styles.eachTagInputFocus : ''}`} 
                    ref={tagsInputRef} placeholder="Please click 'Enter' to add tag" id='tags'
                        onChange={e=> setCurrTag(e.target.value)} onKeyDown={tagsInputEnterHandler}
                    />
                </div>
                <div className={styles.tagsCont} onClick={ingredientsContClickHandler}>
                    {
                        newRecipe.ingredients?.map((eachIngredient, i) => {
                            return (
                                <div key={eachIngredient} className={styles.eachTagCont} onClick={ingredientsClickHandler}>
                                    <p className={styles.eachTagText}>{eachIngredient}</p>
                                    <img className={styles.crossImg} onClick={e => deleteTagHandler(e,eachIngredient)}
                                        src='/crossIcon.png' alt='close button icon' 
                                    />
                                </div>
                            )
                        })
                    }
                    <input className={`${styles.eachTagInput} ${currFocus === 'ingredients' || newRecipe.ingredients.length === 0 ? styles.eachTagInputFocus : ''}`} ref={ingredientInputRef}
                        placeholder="Please click 'Enter' to add tag" id='ingredients'
                        onChange={e=> setCurrIngredient(e.target.value)} onKeyDown={ingredientsInputEnterHandler}
                    />
                </div>

                {currFocus === 'paragraph' || newRecipe.paras === ''
                  ?
                    <textarea onChange={e => paraWriter(e)} name='paragraph' onClick={e => {e.stopPropagation(),setCurrFocus('paragraph')}}
                        placeholder='Start typing here' value={newRecipe.paras} ref={paraText}
                        // style={{height : `${paraText.current.scrollHeight+"px"}`}}
                        className={`${styles.paraTextArea} ${newRecipe.paras === '' || currFocus === 'paragraph'  ? styles.paraTextAreaFocus : ''}`}
                    />
                  :
                  <p className={styles.paras} onClick={e => {e.stopPropagation(), setCurrFocus('paragraph')}}>{newRecipe.paras}</p>
                }
                <button className={styles.submitBtn} onClick={e => submitHandler(e)}>Submit</button>
            </div>
        </div>
    )
}