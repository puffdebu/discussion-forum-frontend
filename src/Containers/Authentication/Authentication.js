import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Aux from '../../Hoc/Auxiliary';
import styles from './Authentication.module.css';
import Input from '../../Components/UI/Input/Input';
import * as actionCreators from '../../store/actions/index';

const useStyles = makeStyles({
    root1 : {
        width : '150px',
        backgroundColor: 'rgba(44, 61, 85, 1)',
        fontWeight : 'bold',
        borderRadius : '6px',
        '&:hover': {
            background: 'rgb(59, 27, 199)',
         }
    },
    root2 : {
        width : '60px',
        backgroundColor: 'rgba(44, 61, 84, 0)',
        fontWeight : 'bold',
        borderRadius : '6px',
        '&:hover': {
            background: 'rgb(59, 27, 199)',
         }
    }
})


const Authentication = (props) => {
    const classes = useStyles();
    const [formData,setFormData] = useState({
        email : {
            label : 'Please enter your Email!',
            name : 'email',
            type : 'email',
            value : '',
            touched : false,
            isValid : false,
            validation : {
                minLength : 1,
            }
        },
        password : {
            label : 'Your Password',
            name : 'password',
            type : 'password',
            value : '',
            touched : false,
            isValid : false,
            validation : {
                minLength : 6,
            }
        },
        name : {
            label : 'Your Name',
            name : 'name',
            type : 'text',
            value : '',
            touched : false,
            isValid : false,
        }
    });
    const [signUp,setSignUp] = useState(true);
    const [formValid,setFormValid] = useState(false);


    useEffect(() => {
        if(props.isLoggedIn === true){
            props.history.push('/discussion');
        }
    },[props.isLoggedIn]);

    const toggleSignUp =() => {
        setSignUp(!signUp);
    };
    

    const checkValidation = (val,validation) => {
        if(!validation)
        return true;
        let isValid = true;
        if(validation.minLength){
            isValid = isValid && val.length >=validation.minLength;
        };
        return isValid;
    }

    const checkCompleteForm = (form) => {
        let isVal = true;
        Object.keys(form).forEach(formEle => {
            isVal = isVal && form[formEle].isValid;
        });
        return isVal;
    }

    const onFormChange = (event,name) => {
        const newFormData = {...formData};
        Object.keys(formData).forEach(formElement => {
            newFormData[formElement] = {...formData[formElement]};
        });
        newFormData[name].value = event.target.value;
        newFormData[name].touched = true;
        newFormData[name].isValid = checkValidation(event.target.value,newFormData[name].validation);
        setFormValid(checkCompleteForm(newFormData));
        setFormData(newFormData);
    }
    const onSubmit = () => {
        props.signIn(formData.email.value,formData.password.value,formData.name.value,signUp);
    };
    let loginIn = <p>Already a User? Login <Button className={classes.root2}onClick={toggleSignUp}>here </Button>.</p>
    let signIn = <p>Visiting for the first time ? Sign Up <Button className={classes.root2} onClick={toggleSignUp}>Here</Button></p>
    let error = null;
    if(props.error){
        let errorMessage = props.error.split('_').join(' ')
        error = <div className={styles.error}>{errorMessage}</div>
    }
    let formUi = (
        <div className={styles.Authentication}>
                {Object.keys(formData).map(formElement => (
                   <Input
                     key={formElement}
                     value={formData[formElement].value}
                     name={formData[formElement].name}
                     isValid={formData[formElement].isValid}
                     touched={formData[formElement].touched}
                     changed={(event,name) => onFormChange(event,name)}
                     type={formData[formElement].type}
                     label={formData[formElement].label}
                    />
                ))}
            {signUp ? loginIn : signIn}
            <Button 
                className={classes.root1}
                disabled={!formValid}
                onClick={onSubmit}
            >
                {signUp ? <div>Sign Up!</div> : <div>Login In!</div>}
            </Button>
        </div>       
    );
    if(props.loading){
        formUi = <div className={styles.spinner}> <CircularProgress /> </div>
    }
    return (
        <Aux>
            {formUi}
            {error}
        </Aux>
    );
};


const mapStateToProps = state =>{
    return {
        isLoggedIn : state.isLoggedIn,
        error : state.error,
        loading : state.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn : (email,password,userName,signUp) => dispatch(actionCreators.auth(email,password,userName,signUp))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Authentication);