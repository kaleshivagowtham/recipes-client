import {useEffect, useState} from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { routes } from '@/utils/routes';
import Head from 'next/head';
import Link from 'next/link';
import MyEachRecipe from '../MyEachRecipe';


export default function AuthorProfile() {

    const authorAPI = routes.baseUrl + routes.api.getAuthor;

    const router = useRouter();

    const [authorName, setAuthorName] = useState();
    const [author, setAuthor] = useState({
        fullName : 'Shiva Gowtham Kale',
        desc : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        myRecipes : ['The Perfect Homemade Pizza!'],
    });

    useEffect(() => {
        setAuthorName(router.query.authorName);
    },[])

    useEffect(() => {
        axios.post(authorAPI, {authorName})
        .then(resp => {
            setAuthor(resp.data)
        })
        .catch(err => {
            console.log(err.message);
        })
    },[authorName])

  return (
    <div className={styles.wholeCont}>
        <Head>
            <title>{author.fullName}</title>
            <link rel="profile image" href="/favicon.ico" />
            <meta charset="UTF-8" />
            <meta name="description" content="author portfolio website"/>
            <meta name="keywords" content="food, recipe, foodgods, cusine, indian, italian, chineses, food, recipes"/>
            <meta name="author" content="Shiva Gowtham Kale"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <div className={styles.leftCont}>
            <div className={styles.imgCont}>
                <img src={author?.profilePic ? author.profilePic : '/loginIcon.png'} className={styles.authorImg} />
            </div>
            <h1 className={styles.authorName}>{author?.fullName}</h1>
            <p className={styles.authorDesc}>{author?.desc}</p>
        </div>
        <div className={styles.rightCont}>
            <h1 className={styles.authorFullName}>{author?.fullName}</h1>
            <p className={styles.authorFullDesc}>{author?.desc}</p>
            <p className={styles.myRecipes}>My recipes</p>
            <div className={styles.rightBottomCont}>
            {
                author?.myRecipes?.map((eachRecipe) => {
                    return (
                        <div key={eachRecipe}>
                            <MyEachRecipe eachRecipe={eachRecipe} />
                        </div>
                    )
                })
            }
            </div>
        </div>
    </div>
  )
}