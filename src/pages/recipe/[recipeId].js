import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import RecipeComponent from '../../components/RecipeComponent';

export default function Recipe() {

    const router = useRouter();
    const [recipeId, setRecipeId] = useState('');

    useEffect (() => {
        setRecipeId(router.query.recipeId);
    },[router.query.recipeId])

    return (
        <div className={styles.wholeCont}>
            <RecipeComponent recipeId={recipeId}/>
        </div>
    )
}