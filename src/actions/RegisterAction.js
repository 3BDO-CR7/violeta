import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const register = (data, props) => {
    return (dispatch) => {

        AsyncStorage.getItem('deviceID').then(device_id => {
            axios({
                url: CONST.url + 'DelegateRegister',
                method: 'POST',
                data: {
                    avatar          : data.avatar,
                    name			: data.name,
                    email			: data.email,
                    phone		    : data.phone,
                    nationality		: data.nationality,
                    city_id			: data.city_id,
                    password		: data.password,
                    id_image	    : data.id_image,
                    license_image	: data.license_image,
                    lang 			: data.lang,
                    device_id,
                }
            }).then(response => {

                dispatch({type: 'register', payload: response.data});

                if (response.data.status == 1){
                    props.navigation.navigate('ActiveAccount', {
                        code			: response.data.data.code,
                        user_id			: response.data.data.id,
                        phone			: data.phone,
                        password		: data.password,
                        deviceId		: device_id
                    });
                }

                Toast.show({
                    text        	: response.data.msg,
                    type			: response.data.status == 1 ? "success" : "danger",
                    duration    	: 3000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'cairo',
                        textAlign   	: 'center'
                    }
                });

            })
        })

    }
};
