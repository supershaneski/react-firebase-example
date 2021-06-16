import React from 'react';
import ThumbItem from './ThumbItem';
import classes from './ThumbList.module.css';

function ThumbList({ data }) {

    var items = [];
                                    
    if(data.value !== null && Array.isArray(data.value)) {
        
        items = data.value;

    } else if(data.value !== null && typeof data.value === "object") {
        
        const a = data.value;

        for(var b in a) {

            items.push(a[b])
        
        }

    }
    
    return (
        <React.Fragment>
        {
            data.value !== null && 
            items.map((item, index) => {
                const angle = Math.floor(20 * Math.random()) - 10;
                return (
                    <div key={index} className={classes.container}>
                        <div className={classes.item} 
                        style={{
                            transform: `rotate(${angle}deg)` // make the angle wonky
                        }}>
                            <ThumbItem caption={item.caption} image={item.image} />
                        </div>
                    </div>
                )
            })
        }
        </React.Fragment>
    )

}

export default ThumbList;
