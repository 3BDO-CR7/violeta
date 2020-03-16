import axios from 'axios';
import CONST from '../consts'
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const profile = ( { user_id, lang } ) => {

    return (dispatch) => {
        axios({
            method  : 'POST',
            url     : CONST.url + 'profileDetailes',
            data    : {user_id : user_id , lang: lang},
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data});
        })
    }
};



export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url     : CONST.url + 'updateProfile',
            method  : 'POST',
            data: {
                name                : data.name,
                avatar              : data.avatar,
                email               : data.email,
                city_id             : data.city_id,
                nationality         : data.nationality,
                lang                : data.lang,
                user_id             : data.user_id,
                id_image            : data.id_image,
                license_image       : data.license_image,
                phone               : data.phone,
            }}).then(response => {

                const data = response.data;
                dispatch({type: 'update_profile', data});

                Toast.show({
                    text: response.data.message,
                    type: response.data.status == 1 ? "success" : "danger",
                    duration: 3000,
                    textStyle   : {
                        color       : "white",
                        fontFamily  : 'cairo',
                        textAlign   : 'center'
                    }
                });

            })
    }
};


export const logout = () => {
    return (dispatch) =>
    {
        AsyncStorage.clear();
        dispatch({type: 'logout'});
    }
};
