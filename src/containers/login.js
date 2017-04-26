import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	TextInput,
	ActivityIndicator,
	StyleSheet,
	ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormButton from '../components/button';
import InputBox from '../components/inputBox';
import * as authAction from '../actions/authActions';
import {bindActionCreators} from 'redux';
import validate from '../lib/fieldValidation';
import SimpleAlert from 'react-native-simpledialog-android';
import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
	loginContainer : {
		marginTop: 65,
		padding : 10,
		flexDirection: 'column',
		// backgroundColor : 'steelblue',
		// justifyContent: 'space-between',
		flex : 1
	},
	inputContainer: {
		flex: 1,
		// backgroundColor: 'blue',
		minHeight: 150 
	},
	loginButtonsContainer: {
		flexDirection : 'column',
		// justifyContent: 'space-around',
		padding : 10,
		flex : 3,
		minHeight : 150,
		// backgroundColor : 'gray'
	},
	textContainer : {
		flexDirection : 'row',
		justifyContent : 'space-between',
		alignItems : 'center'
	},
	textField : {
		textAlign : 'center'
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
		passwordHasError: store.auth.form.passwordHasError,
		emailHasError: store.auth.form.emailHasError,
		usernameErrorMsg : store.auth.form.usernameErrorMsg,
		emailErrorMsg: store.auth.form.emailErrorMsg,
		passwordErrorMsg: store.auth.form.passwordErrorMsg
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
		console.log('login constructor');
	}
	login(){

		if(this.props.usernameHasError){
			SimpleAlert.alert('Error',this.props.usernameErrorMsg);
		}else if(this.props.passwordHasError){
			SimpleAlert.alert('Error',this.props.passwordErrorMsg);
		}else{
			this.props.actions.login(this.props.username, this.props.password);	
		}
	}
	setInputValue(fieldName, value){
		// if(fieldName == 'username' || fieldName == 'password'){
		// 	alert(fieldName+'  '+value);
		// }
		// if(fieldName == 'username'){
			console.log('chnaging'+ fieldName + 'in store');
			this.props.actions.formValueChanges(fieldName, value);
		// }
		
	}
	render(){
		console.log(this.props.username);
		console.log(this.props.password);
		const username = this.props.username;
		const pass = this.props.password;
		this.props.error ? SimpleAlert.alert('Error','login failed'): null;
		let activityIndicator = this.props.isfetching ? (<ActivityIndicator size="large"/>) : null ;
		return (
		        <View style={styles.loginContainer}>
			        <ScrollView horizontal={false} height={height}>
			        	<View style={styles.inputContainer}>
					    	<InputBox fieldName = {'username'} placeholderString = {'username'} setInputValue={this.setInputValue} fieldValue={this.props.username}/>
					    	<InputBox fieldName = {'password'} secure={true} placeholderString = {'password'} setInputValue={this.setInputValue} fieldValue={this.props.password}/>
					    </View>
				    	<View style={styles.loginButtonsContainer}>
				    		<FormButton buttonText={'login'} onButtonPress={this.login} disable={!(username && pass)}/>
				    		<FormButton buttonText={'sign up'} disable={false} onButtonPress={Actions.Register}/>
				    	</View>
				    	<View style={styles.textContainer}>
				    		<Text style={styles.textField} onPress={Actions.ForgotPassword}>forgot password ?</Text>
				    	</View>
				    	{activityIndicator}
				    </ScrollView>	
		    	</View>
		    	
		        );
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(login);