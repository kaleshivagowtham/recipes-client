import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import RecipeComponent from '../../components/RecipeComponent';
import axios from 'axios';

export default function Recipe() {

    return (
        <div className={styles.wholeCont}>
            <RecipeComponent />
        </div>
    )
}