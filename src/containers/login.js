import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	TextInput,
	ActivityIndicator,
	StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormButton from '../components/button';
import InputBox from '../components/inputBox';
import * as authAction from '../actions/authActions';
import {bindActionCreators} from 'redux';
import validate from '../lib/fieldValidation';

const styles = StyleSheet.create({
	loginContainer: {
		flexDirection : 'row',
		justifyContent: 'space-between'
	}
});
console.log("******", authAction);
function mapStateToProps(store){
	return {
		username : store.auth.form.username,
		password : store.auth.form.password,
		isfetching : store.auth.isfetching,
		fetched : store.auth.fetched,
		error : store.auth.error,
		loginRequested : store.auth.loginRequested,
		usernameHasError: store.auth.form.usernameHasError,
		passwordHasError: store.auth.form.passwordHasError
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions : bindActionCreators(authAction, dispatch)
	}
}

class login extends Component {
	constructor(props){
		super(props);
		this.login = this.login.bind(this);
		this.setInputValue = this.setInputValue.bind(this);
	}
	login(){
		// alert('loginuser');
		// if(this.props.username){
		// 	let status = validate('username', this.props.username);
		// 	status.fieldName = 'username';
		// 	this.props.actions.fieldValidation(status);
		// }
		// if(this.props.usernameHasError ||this.props.passwordHasError){
		// 	alert('invalid login parameters');
		// }else{
			this.props.actions.login(this.props.username, this.props.password);	
		// }
	}
	setInputValue(fieldName, value){
		// if(fieldName == 'username' || fieldName == 'password'){
		// 	alert(fieldName+'  '+value);
		// }
		// if(fieldName == 'username'){
			this.props.actions.formValueChanges(fieldName, value);
		// }
		
	}
	render(){
		console.log(this.props.username);
		console.log(this.props.password);
		
		let activityIndicator = this.props.isfetching ? (<ActivityIndicator size="large"/>) : null ;
		return (<View style={{flex:1}}>
		        <View style={{flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'blue'}}>
			    	<InputBox fieldName = {'username'} placeholderString = {'username'} setInputValue={this.setInputValue} fieldValue={this.props.username}/>
			    	<InputBox fieldName = {'password'} secure={true} placeholderString = {'password'} setInputValue={this.setInputValue} fieldValue={this.props.password}/>
			    	<View style={styles.loginContainer}>
			    		<FormButton buttonText={'login'} onButtonPress={this.login}/>
			    		<FormButton buttonText={'go to register'} onButtonPress={Actions.Register}/>
			    	</View>
			    	{activityIndicator}
		    	</View>
		    	</View>
		        );
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(login);