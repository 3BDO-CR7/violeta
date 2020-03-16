import axios from 'axios';
import { AsyncStorage } from 'react-native';
import CONST from '../consts';
import {Toast} from "native-base";

export const userLogin = ({phone, password, deviceId, type}, lang) => {
    return (dispatch) => {

        dispatch({type: 'login_user'});

        axios.post(
            CONST.url + 'logIn',
            {phone, password, lang, device_id: deviceId}).then( response => {
            Toast.show({
                text: response.data.msg,
                type: response.data.status === '1' ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });

            handelLogin(dispatch, response.data)
        } )
            .catch(
                error => console.warn(error.data)
            );
    };
};

export const tempAuth = () => {
    return (dispatch) => {
        dispatch({type: 'temp_auth'});
    };
};

const handelLogin = (dispatch, data) => {
    if (!data.success){
        loginFailed(dispatch, data)
    }else{
        loginSuccess(dispatch, data)
    }
};


const loginSuccess = (dispatch, data) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.token))
        .then(() => dispatch({type: 'login_success', data }));
};

const loginFailed = (dispatch, error) => {
    dispatch({type: 'login_failed', error});
};
