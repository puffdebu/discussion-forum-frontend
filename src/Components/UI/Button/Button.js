import React from 'react';
import  { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root : {
        backgroundColor: 'rgba(44, 61, 85, 1)',
        color : 'white',
        fontWeight : 'bold',
        borderRadius : '6px',
        '&:hover': {
            background: 'rgba(44, 61, 85, 1)',
        }
    },
});

const CustomButton = (props) => {
    const classes = useStyles();
    return (
        <Button 
            {...props}
            className={[classes.root,props.className].join(' ')}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

export default CustomButton;