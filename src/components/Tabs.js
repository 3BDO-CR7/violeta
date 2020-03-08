import React, { Component } from "react";
import {Button, Icon, Footer, FooterTab, Toast, Text, Title} from 'native-base'
import styles from '../../assets/style';
import i18n from "../../locale/i18n";
import {connect} from "react-redux";
import {chooseLang, profile, userLogin} from "../actions";

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageName        : this.props.routeName,
        }
    }

    chickUser(page){

        this.props.navigation.navigate(page);

    }

    render() {

        return (

            <Footer style={styles.view_Footer}>
                <FooterTab style={[styles.footer_Tab]}>
                    <Button onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon style={[ styles.textSize_18 , {color : this.state.pageName === 'Home'? '#f9e24b' : '#ddd'}]} type="FontAwesome5" name="home" />
                        <Text style={[styles.textRegular , styles.text_White, styles.textSize_10, styles.textCenter, {color : this.state.pageName === 'Home'? '#f9e24b' : '#ddd'}]}>{ i18n.t('home') }</Text>
                    </Button>
                    <Button onPress={() => this.chickUser('ManageRequests')}>
                        <Icon style={[ styles.textSize_18 , {color : this.state.pageName === 'ManageRequests'? '#f9e24b' : '#ddd'}]} type="FontAwesome" name='list-ul' />
                        <Text style={[styles.textRegular , styles.textSize_10, styles.textCenter, {color : this.state.pageName === 'ManageRequests'? '#f9e24b' : '#ddd'}]}>{ i18n.t('marequests') }</Text>
                    </Button>
                    <Button onPress={() => this.chickUser('Accounts')}>
                        <Icon style={[ styles.textSize_18 ,{color : this.state.pageName === 'Accounts'? '#f9e24b' : '#ddd'}]} type="Octicons" name='checklist' />
                        <Text style={[styles.textRegular , styles.textSize_10, styles.textCenter, {color : this.state.pageName === 'Accounts'? '#f9e24b' : '#ddd'}]}>{ i18n.t('accounts') }</Text>
                    </Button>
                    <Button onPress={() => this.chickUser('Profile')}>
                        <Icon style={[ styles.textSize_18 ,{color : this.state.pageName === 'Profile'? '#f9e24b' : '#ddd'}]} type="FontAwesome5" name='user-alt' />
                        <Text style={[styles.textRegular , styles.textSize_10, styles.textCenter, {color : this.state.pageName === 'Profile'? '#f9e24b' : '#ddd'}]}>{ i18n.t('myAcc') }</Text>
                    </Button>
                </FooterTab>
            </Footer>

        );
    }
}

export default Tabs;
