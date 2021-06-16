import React, { useState, useEffect } from 'react';
import classes from './ThumbItem.module.css';
import storage from '../storage';
import { DIR_CLOUD_STORAGE } from '../App';

function ThumbItem({ caption, image }) {

    const [imgSrc, setImgSrc] = useState(image ? process.env.PUBLIC_URL + `/rotate.gif` : '')
    
    useEffect(() => {

        if(image) {

            const storageRef = storage.ref()

            storageRef.child(`${DIR_CLOUD_STORAGE}/${image}`).getDownloadURL()
                .then(url => {

                    setImgSrc(url)

                }).catch(error => {

                    console.log(error)

                })

        }

    }, [image])


    return (
        <div className={classes.container}>
            {
                imgSrc &&
                <img alt="" className={classes.image} src={imgSrc} />
            }
            <div className={classes.captionDiv}>
                <div className={classes.caption}>
                    <span>{ caption }</span>
                </div>
            </div>
        </div>
    )
}

export default ThumbItem;