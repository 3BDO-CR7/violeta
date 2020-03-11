import axios from 'axios';
import CONST from '../consts'
import {AsyncStorage} from "react-native";


export const profile = ( id, lang ) => {

    return (dispatch) => {
        axios({
            method  : 'POST',
            url     : CONST.url + 'profileDetailes',
            data    : {user_id : id , lang: lang},
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data});
            console.log('response_data', response.data.data)
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
                lang                : data.lang,
                user_id             : data.user_id,
                id_image            : data.id_image,
                license_image       : data.license_image,
                phone               : data.phone,
            }}).then(response => {

                const data = response.data;
                dispatch({type: 'update_profile', data})

            }).catch(() => {

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
