import React, { useState } from 'react';
import classes from './AddPanel.module.css';
import Button from './Button';

function AddPanel({ show = false, onSubmit, onCancel }) {

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    if(!show) {
        return <div></div>
    }

    return (
        <div className={classes.addDiv}>
            <div className={classes.add}>
                <h4 className={classes.titleAdd}>Add New Item</h4>
                <label>Text</label><br />
                <input 
                className={classes.text} 
                type="text" 
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Enter your text here"
                /><br />
                <label>Image</label><br />
                <input 
                type="file" 
                accept="image/*"
                placeholder="Select file" 
                onChange={e => setImage(e.target.files[0])}
                /><br />
                <div className={classes.action}>
                    <Button onClick={() => onSubmit(caption, image)}>Submit</Button>
                    <Button onClick={() => onCancel()}>Cancel</Button>
                </div>
            </div>
        </div>
    )

}

export default AddPanel;