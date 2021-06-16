import React from 'react';

const styles = {
    container: {
        backgroundColor: '#c0c0c0',
        borderRadius: '8px',
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    span: {
        fontSize: '4em',
        color: '#555',
    }
}

function AddButton(props) {
    return (
        <div style={styles.container} onClick={props.onClick}>
            <span style={styles.span}>&#43;</span>
        </div>
    )
}

export default AddButton;