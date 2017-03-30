import React, {Component} from 'react'
import { View,
		Text,
		TouchableHighlight,
		StyleSheet
		} from 'react-native'
	
const styles = StyleSheet.create({
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
		
	}
});
		
export default class FormButton extends Component {
	constructor(props){
		super(props);
	}
	
	render(){
		return (
	        <TouchableHighlight style={styles.buttonStyle} underlayColor='#cce6ff'>
	        	<Text onPress={this.props.onButtonPress}>{this.props.buttonText}</Text>
	        </TouchableHighlight>
		        );
	}
}