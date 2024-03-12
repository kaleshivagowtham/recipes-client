import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import MyRecipesComponent from '@/components/MyRecipesComponent';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { routes } from '@/utils/routes';
import AuthorProfile from '@/components/AuthoProfile';

export default function Writer() {

    return (
        <div className={styles.wholeCont}>
            <AuthorProfile />
        </div>
    )
}