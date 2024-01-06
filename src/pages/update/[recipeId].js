import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import UpdateRecipeComponent from '../../components/UpdateRecipeComponent';

export default function Recipe() {

    const router = useRouter();
    const [recipeId, setRecipeId] = useState('');

    useEffect (() => {
        setRecipeId(router.query.recipeId);
        console.log("recipeId is : ", recipeId);
    },[router.query.recipeId])

    return (
        <div className={styles.wholeCont}>
            <UpdateRecipeComponent recipeId={recipeId}/>
        </div>
    )
}