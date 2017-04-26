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

import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FormButton from '../components/button';
import InputBox from '../components/inputBox';
import * as authAction from '../actions/authActions';
import {bindActionCreators} from 'redux';
import SimpleAlert from 'react-native-simpledialog-android';
import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
	container : {
		marginTop : 65,
		padding : 10,
		flexDirection : "column",
		justifyContent : "space-between",
		flex:1
	},
	inputContainer: {
		flex:1,
		minHeight : 200
		// backgroundColor : 'blue'
	},
	buttonContainer: {
		flex:2,
		minHeight: 100
		// backgroundColor : 'steelblue'
	},
	textContainer : {
		marginTop: 30,
		alignItems: 'center',
		padding: 10
	},
	textField : {
		fontSize : 20
	}
})
function mapStateToProps(store){
	return {
		username : store.auth.form.username,
		password : store.auth.form.password,
		email : store.auth.form.email,
		isfetching : store.auth.isfetching,
		fetched : store.auth.fetched,
		error : store.auth.error,
		registerRequested: store.auth.registerRequested,
		usernameHasError: store.auth.form.usernameHasError,
		passwordHasError: store.auth.form.passwordHasError,
		emailHasError: store.auth.form.emailHasError,
		usernameErrorMsg : store.auth.form.usernameErrorMsg,
		emailErrorMsg: store.auth.form.emailErrorMsg,
		passwordErrorMsg: store.auth.form.passwordErrorMsg
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
		if(this.props.username){
			SimpleAlert.alert('Error',this.props.usernameErrorMsg);
		} else if(this.props.password){
			SimpleAlert.alert('Error',this.props.passwordErrorMsg);
		} else if(this.props.email){
			SimpleAlert.alert('Error',this.props.emailErrorMsg);
		}else{
			this.props.actions.register(this.props.username,this.props.password,this.props.email);
		}
	}
	setInputValue(fieldName, value){
		this.props.actions.formValueChanges(fieldName, value);
	}
	render(){
		const activityIndicator  = this.props.isfetching ? (<ActivityIndicator size="large"/>) : null;
		const username = this.props.username;
		const pass = this.props.password;
		const email = this.props.email;
		return (
			<View style={styles.container}>
		        <ScrollView horizontal={false}>
				    <View style={styles.inputContainer}>
						<InputBox fieldName = {'username'} placeholderString = {'username'} setInputValue={this.setInputValue} fieldValue={this.props.username} />
					    <InputBox fieldName = {'password'} secure={true} placeholderString = {'password'} setInputValue={this.setInputValue} fieldValue={this.props.password}/>
						<InputBox fieldName = {'email'} placeholderString={"email"}  setInputValue={this.setInputValue} fieldValue={this.props.email}/>	
					</View>
					<View style={styles.buttonContainer}>
						<FormButton buttonText={'register'} onButtonPress={this.register} disable={!(username && pass && email)}/>
						<View style={styles.textContainer}>
							<Text style={styles.textField} onPress={Actions.Login}>No Account Yet? Create One</Text>
						</View>
					</View>
					{activityIndicator}
				</ScrollView>
			</View>
			   
		        );
	}
}

export default connect(mapStateToProps, mapActionsToProps)(register);