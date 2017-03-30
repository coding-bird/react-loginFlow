import React, {Component} from 'react'
import { View,
		Text,
		TouchableHighlight,
		StyleSheet
		} from 'react-native'
const Button = require('apsl-react-native-button')
const styles = StyleSheet.create({
	buttonContainer : {
		marginTop: 30,
		alignItems : 'center'
	},
	'buttonStyle' : {
		borderWidth : 1,
		borderRadius : 8,
		borderColor : '#3399ff',
		backgroundColor : '#3399ff',
		paddingTop: 5,
		paddingBottom : 5,
		paddingLeft : 10,
		paddingRight : 10,
		alignItems : 'center',
		height : 36,
		alignSelf : 'stretch'
	},
	buttonText: {
		fontSize : 15
	}
});
		
export default class FormButton extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return (
	        <View style={styles.buttonContainer}>
		        <Button style={styles.buttonStyle} isDisabled={this.props.disable} textStyle={styles.buttonText} onPress={this.props.onButtonPress}>{this.props.buttonText}</Button>
	        </View>
		        );
	}
}