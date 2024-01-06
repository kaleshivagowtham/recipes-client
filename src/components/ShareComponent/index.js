import {useEffect, useState} from 'react';
import styles from './styles.module.css';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function ShareComponent() {

    // const {asPath} = useRouter();

    const [currentUrl , setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    })

    const handleFacebookShare = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        window.open(facebookUrl, '_blank');
    }

    const handleTwitterShare = () => {
        const text = encodeURIComponent('Check out this awesome website!');
        const twitterUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${text}`;
        window.open(twitterUrl, '_blank');
    }

    const handleLinkedInShare = () => {
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
        window.open(linkedInUrl, '_blank');
    }

    const handleWhatsAppShare = () => {
        const whatsAppUrl = `https://api.whatsapp.com/send?text=${currentUrl}`;
        window.open(whatsAppUrl, '_blank');
    }

    return (
        <div className={styles.wholeCont}>
            {/* <Link href={"https://api.whatsapp.com/send?text=" + currentUrl} legacyBehavior> */}
                <div className={styles.eachMediaCont} onClick={e => handleWhatsAppShare()}
                    style={{borderRadius : "25px 0 0 0" , backgroundColor:"#25D366"}}>
                    <img src='/whatsAppLogo.png' className={styles.eachMediaImage} />
                </div>
            {/* </Link> */}

            {/* <Link href={"https://graph.facebook.com/?ids=" + currentUrl} legacyBehavior> */}
                <div className={styles.eachMediaCont} onClick={e => handleFacebookShare()}
                    style={{ backgroundColor:"#4267B2"}}>
                    <img src='/facebookLogo.png' className={styles.eachMediaImage} />
                </div>
            {/* </Link> */}
            {/* <Link href={"https://twitter.com/intent/tweet?text=" + currentUrl} legacyBehavior> */}
            {/* <Link href={"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+"+&redirect_uri="+currentUrl} legacyBehavior> */}
                <div className={styles.eachMediaCont} onClick={e => handleTwitterShare()}
                    style={{backgroundColor:"#1DA1F2"}}>
                    <img src='/twitterLogo.png' className={styles.eachMediaImage} />
                </div>
            {/* </Link> */}
            {/* <Link href={"https://www.linkedin.com/sharing/share-offsite/?url="+ currentUrl} legacyBehavior> */}
            {/* <Link href={"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+"+&redirect_uri="+currentUrl} legacyBehavior> */}
                <div className={styles.eachMediaCont} onClick={e => handleLinkedInShare()}
                    style={{borderRadius : "0 0 0 25px" , backgroundColor:"#0077b5"}}>
                    <img src='/linkedinLogo.png' className={styles.eachMediaImage} />
                </div>
            {/* </Link> */}
        </div>
    )
}