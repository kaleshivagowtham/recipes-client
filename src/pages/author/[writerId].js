import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import MyRecipesComponent from '@/components/MyRecipesComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { routes } from '@/utils/routes';

export default function Writer() {

    const router = useRouter();

    const [writerId, setWriterId] = useState('');

    const {isLoggedIn} = useSelector(store => store.loggedIn);

    useEffect (() => {
        setWriterId(router.query.recipeId);
    },[router.query.writerId])

    return (
        <div className={styles.wholeCont}>
            <MyRecipesComponent writerId={writerId}/>
        </div>
    )
}