import React, {Component} from 'react';
import {
	Text,
	View,
	TextInput
} from 'react-native';

export default class FormInput extends Component {
	constructor(props){
		super(props);
	}
	
	
	render(){
		return (
	        <View>
	        	<Text>{this.props.fieldName}</Text>
	        	<TextInput 
	        	name= {this.props.fieldName}
	        	placeholder={this.props.placeholderString} 
	        	onChangeText = {(inputData) => {
	        		this.props.setInputValue(this.props.fieldName, inputData)
	        	}}
	        	secureTextEntry = {this.props.secure}
	        	value = {this.props.fieldValue}
	        	/>
	        </View>
		        );
	}
}	