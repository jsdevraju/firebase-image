import React from "react";
import { ICollection } from "../../types/typescript";
import styles from "./style.module.css";

interface IProps {
  collection: ICollection;
  setImgDetails: ICollection | any;
  imgPopUp: boolean;
  setImgPopUp: (value: boolean) => void;
}

const HomeImageCard: React.FC<IProps> = ({
  collection,
  setImgDetails,
  imgPopUp,
  setImgPopUp,
}) => {

  const handleClick = (collection: ICollection) =>{
    setImgDetails(collection);
    setImgPopUp(!imgPopUp)
  }

  return (
    <>
      <div className={styles.boxImg} onClick={() => handleClick(collection)}>
        <img src={collection.photos} alt={collection.title} />
        <h1>{collection.title?.substring(0, 10)}...</h1>
      </div>
    </>
  );
};

export default HomeImageCard;
