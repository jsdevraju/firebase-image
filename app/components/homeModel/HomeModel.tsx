import React from 'react'
import { ICollection } from '../../types/typescript';
import styles from './style.module.css';


interface IProps {
    imgPopUp:boolean,
    setImgPopUp:(value: boolean) => void,
    imgDetails:ICollection
}

const HomeModel:React.FC<IProps> = ({imgPopUp, setImgPopUp, imgDetails}) => {
  return (
    <>
        <div className={styles.model}>
            <div className={styles.wrapper}>
                <h1>Title: {imgDetails.title}</h1>
                <img src={imgDetails.photos} alt={imgDetails.title} />
            </div>
        </div>
        <div className={styles.overlay} onClick={() => setImgPopUp(!imgPopUp)}></div>
    </>
  )
}

export default HomeModel