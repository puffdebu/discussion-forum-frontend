import React, { useState} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styles from './Logout.module.css';

const Logout = (props) => {
    const [options,setOptions] = useState(false);
    let showProfileOptions = null;
    if(options) {
        showProfileOptions = (
        <div className={styles.OptionsOuterDiv}>
            <div className={styles.ProfileOptions} onClick={props.onClicked}>
                Logout    
            </div>
            <div className={styles.ProfileOptions}>
                Profile
            </div>
        </div>
        );
    };
    return (
       <li className={styles.li}>
           <AccountBoxIcon
            className={styles.IconStyling}
            fontSize="large"
            onClick={() => setOptions(!options)}
            >
             Log Out
            </AccountBoxIcon>
            {showProfileOptions}

       </li>
    );
};

export default Logout;
