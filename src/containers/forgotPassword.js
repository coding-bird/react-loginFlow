'use strict';
import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator
} from 'react-native';

import * as authAction from '../actions/authActions';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FormButton from '../components/button';
import InputBox from '../components/inputBox';
import SimpleAlert from 'react-native-simpledialog-android';
import {bindActionCreators} from 'redux';

const styles = StyleSheet.create({
	container : {
		marginTop: 65,
		flex : 1
	}
});
function mapStateToProps(store){
	return {
		email : store.auth.form.email,
		emailHasError : store.auth.form.emailHasError,
		emailErrorMsg : store.auth.form.emailErrorMsg,
		error : store.auth.error,
		isfetching : store.auth.isfetching,
		fetched : store.auth.fetched
	}
}
function mapDispatchToProps(dispatch){
	return {
		actions : bindActionCreators(authAction, dispatch)
	}
}
class forgotPassword extends Component {
	constructor(props){
		super(props);
		this.setInputValue = this.setInputValue.bind(this);
		this.forgetPasswordClicked = this.forgetPasswordClicked.bind(this);
	}
	forgetPasswordClicked(){
		if(this.props.emailHasError){
			SimpleAlert.alert("Error",this.props.emailErrorMsg);
		} else{
			this.props.actions.forgetPassword(this.props.email);	
		}
	}
	setInputValue(fieldName, value){
		this.props.actions.formValueChanges(fieldName, value);
	}
	render(){
		const disable = this.props.email ? true : false;
		const Activityindicator = this.props.isfetching ? (<ActivityIndicator size='large'/>): null;
		this.props.error ? SimpleAlert.alert("Error","sone error occureed"): null;
		return (
		        <View style={styles.container}>
		        	<InputBox fieldName={'email'} placeholderString={'email'} setInputValue={this.setInputValue} secure={false} fieldValue={this.props.email}/>
		        	<FormButton buttonText={'change Password'} onButtonPress={this.forgetPasswordClicked} disable={!disable}  />
		        	{Activityindicator}
		        </View>);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(forgotPassword);