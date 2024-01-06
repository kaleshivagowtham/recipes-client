import { useEffect, useState , useMemo} from "react";
import styles from './styles.module.css';
import Link from "next/link";
import { routes } from "@/utils/routes";
import axios from "axios";
import NotificationComponent from "../NotificationComponent";

export default function HomeComponent () {

    const getAllRecipeUrl = `${routes.baseUrl}${routes.api.getallrecipe}`;

    const categories = [{image : '/category1.jpg',name : 'Quick & Easy'},{image : '/category1.jpg',name : 'Dinner'},{image : '/category1.jpg',name : 'Vegetarian'},
                    {image : '/category1.jpg',name : 'Healthy'},{image : '/category1.jpg',name : 'Meal Prep'},{image : '/category1.jpg',name : 'Soups'},
                    {image : '/category1.jpg',name : 'Salads'}];

    const [latestList, setLatestList] = useState([{image : '/category1.jpg', createdOn:'December 14 2023', title:'Super Creamy White Chicken Chili with Seasoned Tots', paras : 'This White Chicken Chili is THE BOMB. Chicken, white beans, and green chiles folded up in a creamy soup blanket and topped with golden, crispity seasoned tots, cilantro, green onion, and hot sauce. WOW. Top combo', tags : ['pepper','potato', 'tomato','spicy']},
                                                {image : '/category1.jpg', createdOn:'December 14 2023', title:'Super Creamy White Chicken Chili with Seasoned Tots', paras : 'This White Chicken Chili is THE BOMB. Chicken, white beans, and green chiles folded up in a creamy soup blanket and topped with golden, crispity seasoned tots, cilantro, green onion, and hot sauce. WOW. Top combo', tags : ['pepper','potato', 'tomato','spicy']},
                                                {image : '', createdOn:'December 14 2023', title:'Super Creamy White Chicken Chili with Seasoned Tots', paras : 'This White Chicken Chili is THE BOMB. Chicken, white beans, and green chiles folded up in a creamy soup blanket and topped with golden, crispity seasoned tots, cilantro, green onion, and hot sauce. WOW. Top combo', tags : ['pepper','potato', 'tomato','spicy']},
                                                {image : '/category1.jpg', createdOn:'December 14 2023', title:'Super Creamy White Chicken Chili with Seasoned Tots', paras : 'This White Chicken Chili is THE BOMB. Chicken, white beans, and green chiles folded up in a creamy soup blanket and topped with golden, crispity seasoned tots, cilantro, green onion, and hot sauce. WOW. Top combo', tags : ['pepper','potato', 'tomato','spicy']},
                                                {image : '/category1.jpg', createdOn:'December 14 2023', title:'Super Creamy White Chicken Chili with Seasoned Tots', paras : 'This White Chicken Chili is THE BOMB. Chicken, white beans, and green chiles folded up in a creamy soup blanket and topped with golden, crispity seasoned tots, cilantro, green onion, and hot sauce. WOW. Top combo', tags : ['pepper','potato', 'tomato','spicy']},
                                            ])
    const [impImg, setImpImg] = useState('maleImg');

    const [name, setName] = useState('');
    const [i, setI] = useState(-1);
    const nm = `NO ONE IS \nBORN A GREAT COOK \nONE LEARNS BY DOING`;


    useEffect(() => {
        setI(0);
    },[]);

    useEffect(() => {
        setTimeout(() => {
            impImg === 'maleImg' ? setImpImg('femaleImg') : setImpImg('maleImg');
        },3000)
    },[impImg])

    useEffect(() => {
        const response = axios.get(getAllRecipeUrl)
        .then(resp => {
            setLatestList(resp.data);
            console.log(resp.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    },[])

    const nameAdder = useMemo (() => {
        if(i < 49){
            setTimeout(() => {
                setName(name + nm[i]);
                    setI(i+1);
            },200)
        }
        else {
            setTimeout(() => {
                setName('');
                setI(0);
            },10000)
        }
    },[i]);

    return (
        <div className={`${styles.wholeCont}`}>
            <div className={`${styles.topCont}`}>
                <p className={styles.topContText}>{name}</p>
                <img className={`${styles.topContImg} ${impImg === 'maleImg' ? styles.imgImp : ''}`} alt='cook image' 
                    src='/maleCooking.png' id='maleImg'
                />
                <img className={`${styles.topContImg} ${impImg === 'femaleImg' ? styles.imgImp : ''}`} alt='cook image' 
                    src='/femaleCooking.png' id='femaleImg'
                />
            </div>
            <div className={`${styles.midCont}`}>
                <div className={`${styles.slideCont}`}>
                {
                    categories?.map((item) => {
                        return (
                                <div key={item} className={styles.eachCategory}>
                                    <img className={styles.eachCategoryImg} alt={item.name} 
                                        src={item.image}
                                    />
                                    <p className={styles.eachCategoryName}>{item.name}</p>
                                </div>)
                    })
                }
                </div>
                <Link href='/newrecipe' className={styles.newRecipeButton}>
                    Write new blog
                </Link>
                <div className={`${styles.listCont}`}>
                    <div className={`${styles.listLeftCont}`}>
                    <p className={styles.listTitle}>THE LATEST & GREATEST</p>
                    {
                        latestList?.map((item) => {
                            return (
                                <Link key={item} className={styles.leftEachItem}
                                    href= {`recipe/${item._id}`}>
                                    <div className={styles.leftEachItemImgCont}>
                                        <img className={styles.leftEachItemImg} 
                                            src={item.image ? item.image : '/foodIcon.png'} alt={item.title}
                                        />
                                    </div>
                                    <div className={styles.leftEachItemTextCont}>
                                        <p className={styles.eachItemDate}>{item.createdOn}</p>
                                        <p className={styles.eachItemTitle}>{item.title}</p>
                                        <p className={styles.eachItemDesc}>{item.paras}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    </div>
                    <div className={`${styles.listRightCont}`}>

                    </div>
                </div>
            </div>
        </div>
    )
}