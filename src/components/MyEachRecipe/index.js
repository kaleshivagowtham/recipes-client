import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Link from "next/link"
import axios from 'axios';
import { routes } from '@/utils/routes';

export default function MyEachRecipe ({eachRecipe}) {

    const eachRecipeURL = routes.baseUrl+ routes.api.getrecipe;
    const [recipe, setRecipe] = useState({
        'title' : 'title is for ever',
        desc : 'lorem ipsum'
    });

    useEffect(() => {
        axios.post(eachRecipeURL, {
            recipeTitle : eachRecipe.replace(/ /g, '-')
        })
        .then(resp => {
            setRecipe(resp.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[])

    return (
        <Link href={'../recipe/'+eachRecipe.replace(/ /g, '-')}
            className={styles.eachRecipeCont}
            // style={{backgroundImage:` url(${recipe?.titleImg})`}}
        >
            <img src={recipe?.titleImg} alt={eachRecipe + 'Image'} 
                className={styles.eachRecipeTitleImg}
            />
            <h2 className={styles.eachRecipeTitle}>{eachRecipe}</h2>
            <p className={styles.eachRecipeDesc}>{recipe?.paras}</p>
        </Link>
    )
}