import { useEffect, useState } from "react";
import styles from './styles.module.css';

export default function NotificationComponent({message , imp}) {

    const [i , setI] = useState(0);

    useEffect(() => {
        setI(5000);
    },[])

    useEffect(() => {
        if(i >= 0) {
            setTimeout(() => {
                setI(i-1);
            },1);
        }
    },[i])

    const lineStyle  = {
        backgroundColor : imp === '3' ? 'red' : imp === '2' ? 'yellow' : 'green',
        width : (i/5000)*100 + '%'
    }

    const boxStyle = {
        display : i > 0 ? 'flex' : 'none'
    }

    return (
        <div className={styles.wholeCont} style={boxStyle}>
            <p className={styles.message}>{message}</p>
            <div className={styles.coloredTimer} style={lineStyle}/>
        </div>
    )
}