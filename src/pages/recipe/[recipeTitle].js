import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import RecipeComponent from '../../components/RecipeComponent';
import axios from 'axios';

export default function Recipe() {

    const router = useRouter();
    const [recipeTitle, setRecipeTitle] = useState('');

    useEffect (() => {
        setRecipeTitle(router.query.recipeTitle);
    },[router.query.recipeTitle])

    return (
        <div className={styles.wholeCont}>
            <RecipeComponent recipeTitle={recipeTitle?.replace(/-/g, ' ')}/>
        </div>
    )
}