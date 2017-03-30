import React, {Component} from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class register extends Component {
	constructor(props){
		super(props);
		this.state = {
			username : "",
			password : "",
			email : ""
		}
	}
	RegisterUser(){
		let username = this.state.username;
		let password = this.state.password;
		let email = this.state.email;
		return ;
	}
	render(){
		return (
		    <View>
			<TextInput placeholder="username" value={this.state.username} onChangeText = {(text) => this.setState({username: text})}/>	
			<TextInput placeholder="username" value={this.state.password} secureTextEntry onChangeText = {(password) => this.setState({password: password})}/>		   
			<TextInput placeholder="email" value={this.state.email} onChangeText = {(email) => this.setState({email: email})}/>	
			   
			<TouchableHighlight underlayColor='#dddddd'>
				<Text onPress= {this.RegisterUser.bind(this)}>Register</Text>
			</TouchableHighlight>	
			</View>   
		        );
	}
}