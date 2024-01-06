import {useEffect, useMemo, useState} from 'react';
import styles from './styles.module.css';
import {useDispatch , useSelector} from 'react-redux';
import { closeSearchModal, openSearchModal } from '../../features/modal/searchModalSlice';
import { routes } from '@/utils/routes';
import axios from 'axios';
import Link from 'next/link';

export default function SearchComponent(props) {

    const searchUrl = `${routes.baseUrl}${routes.api.search}`;

    // useEffect(() => {
    //     setTimeout(() => {
    //         getTrendingBlogs();
    //     },1000)
    // })

    const dispatch = useDispatch();

    const {isSearchModalOpen} = useSelector(store => store.searchModal);

    const [searchResult , setSearchResult] = useState([]);
    const [tagsResult , setTrendingSearch] = useState([]);
    const [searchText, setSearchText] = useState('');

    const searchHandler = (e) => {
        setSearchText(e.target.value);
    }

    const searchIconClickHandler = (e) => {
        isSearchModalOpen ? fetchSearchResultHandler() : dispatch(openSearchModal());
    }

    const fetchResult = useMemo( () => { 
        const response = axios.post(searchUrl, {
            searchText : searchText
        })
        .then(resp => {
            setSearchResult(resp.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[searchText])

    return (
        <div className={`${styles.wholeCont} ${isSearchModalOpen ? styles.wholeContSelected : ''}`} 
            onClick={e => {e.stopPropagation();dispatch(openSearchModal())}}>
            <div className={styles.searchCont}>
                <input placeholder='Search'
                    className={`${isSearchModalOpen ? styles.searchBoxSelected : styles.searchBox}`}
                    onChange={e => searchHandler(e)}
                />
                <img src={isSearchModalOpen ? '/searchIcon-green.png' :'/searchIcon.png'}
                    className={styles.searchIcon}
                    alt='Search Icon'
                 />
            </div>
            {searchResult && isSearchModalOpen && <div className={styles.searchModal}>
                <div className={styles.searchResultModals}>
                    <p className={styles.searchModalTitles}>Search results</p>
                    <div className={styles.searchScrollingBox}>
                        {searchResult?.map((item) => {
                            return(
                                <Link key={item} className={styles.eachSearchResultBox}
                                    href={`/recipe/${item._id}`} onClick={e => {e.stopPropagation(),dispatch(closeSearchModal())}}
                                    >
                                    {/* <img src='/trendingIcon.png' className={styles.trendingIconImg}/> */}
                                    <p className={styles.eachSearchResult} >{item.title}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {/* <div className={`${styles.searchResultModals} ${styles.mobileModeTrending}`}>
                    <p className={styles.searchModalTitles}>Trending </p>
                    <div className={styles.searchScrollingBox}>
                        {tagsResult.map((item) => {
                            return(
                                <div key={item} className={styles.eachSearchResultBox}>
                                    <img src='/trendingIcon.png' className={styles.trendingIconImg}/>
                                    <p className={styles.eachSearchResult}>{item.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
            </div>}
        </div>
    )
}