import { useState } from "react";
import styles from './styles.module.css'

export default function ForgotPasswordComponent({forgotPassword , setForgotPassword}) {

    return (
        <div className={styles.modalCont} onClick={e => e.stopPropagation()}>
            <button className={styles.backToLoginBtn} onClick={e => setForgotPassword(false)}>back to login</button>
        </div>
    )
}