import React, {Component} from 'react';
import {
	Text,
	View,
	TextInput,
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	inputBoxContainer : {
		marginTop : 10
	}
})

export default class FormInput extends Component {
	constructor(props){
		super(props);
	}
	
	
	render(){
		return (
	        <View style={styles.inputBoxContainer}>
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