import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	TextInput,
	ActivityIndicator
} from 'react-native';

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FormButton from '../components/button';
import InputBox from '../components/inputBox';
import * as authAction from '../actions/authActions';
import {bindActionCreators} from 'redux';

function mapStateToProps(store){
	return {
		username : store.auth.form.username,
		password : store.auth.form.password,
		email : store.auth.form.email,
		isfetching : store.auth.isfetching,
		fetched : store.auth.fetched,
		error : store.auth.error,
		registerRequested: store.auth.registerRequested
	}
}

function mapActionsToProps(dispatch){
	return {
		actions : bindActionCreators(authAction, dispatch)
	}
}

class register extends Component {
	constructor(props){
		super(props);
		this.register = this.register.bind(this);
		this.setInputValue = this.setInputValue.bind(this);
	}
	register(){
		this.props.actions.register(this.props.username,this.props.password,this.props.email);
	}
	setInputValue(fieldName, value){
		this.props.actions.formValueChanges(fieldName, value);
	}
	render(){
		const activityIndicator  = this.props.isfetching ? (<ActivityIndicator size="large"/>) : null;
		return (
		    <View>
				<InputBox fieldName = {'username'} placeholderString = {'username'} setInputValue={this.setInputValue} fieldValue={this.props.username} />
			    <InputBox fieldName = {'password'} secure={true} placeholderString = {'password'} setInputValue={this.setInputValue} fieldValue={this.props.password}/>
				<InputBox fieldName = {'email'} placeholderString={"email"}  setInputValue={this.setInputValue} fieldValue={this.props.email}/>	
				<FormButton buttonText={'register'} onButtonPress={this.register}/>
				{activityIndicator}
			</View>   
		        );
	}
}

export default connect(mapStateToProps, mapActionsToProps)(register);