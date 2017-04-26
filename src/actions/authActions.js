'use strict';
 
import  BackendFactory from '../lib/backendFactory'
import {appAuthToken} from '../lib/AppAuthToken'
import { Actions } from 'react-native-router-flux'

export function formValueChanges(fieldName, value){
	return {
		type : fieldName+ '_entered',
		payload : value
	}	
}

export function loginRequest(){
	return {
		type:'loginRequested'
	}
}

export function saveSessionToken(json){
	return appAuthToken.storeSessionToken(json);
}

export function loginSuccess(json){
	return {
		type: 'LOGIN_SUCCESS',
		payload : json
	}	
}

export function loginFailure(error){
	return {
		type: 'LOGIN_FAILED',
		payload : error
	}	
}

export function login(username, password){
	return (dispatch) => {
		dispatch(loginRequest());
		return BackendFactory().login({username, password})
		.then(function (json) {
	        return saveSessionToken(json)
	          .then(function () {
	            dispatch(loginSuccess(json))
	            // navigate to Tabbar
	            Actions.Home()
	          })
	    })
	    .catch((error) => {
	       dispatch(loginFailure(error))
	    })
	}
}

export function registerRequest(){
	return {
		type : 'registerRequested'
	}
}

export function RegisterSuccess(json){
	return {
		type : 'REGISTER_SUCCESS',
		payload : json
	}
}

export function registerFailure(error){
	return {
		type: 'REGISTER_FAILED',
		payload: error
	}	
}

export function register(username, password, email){
	return (dispatch) => {
		dispatch(registerRequest());
		return BackendFactory().signup({username, password, email})
		.then(function(json){
			return saveSessionToken(json)
			.then(function(){
				dispatch(RegisterSuccess(json))
				Actions.Login()
			})
		})
		.catch((error)=>{
			dispatch(registerFailure(error))
		})
	}
}

export function fieldValidation(data){
	return {
		type : 'validation',
		payload : data
	}
}
export function forgotPasswordRequest(){
	return {
		type : 'RESET_PASSWORD_REQUESTED'
	}
}
export function forgotPasswordFailed(error){
	return {
		type: 'FORGOTPASSWORD_FAILED',
		payload : error
	}
}
export function resetPasswordSuccess(json){
	return {
		type : 'RESET_PASSWORD_SUCCESS'
	}
}
export function forgetPassword(email){
	return function(dispatch){
		dispatch(forgotPasswordRequest());
		return BackendFactory().resetPassword({email})
		.then(() => {
				dispatch(resetPasswordSuccess())
				Actions.Login();
		})
		.catch((error)=>{
			dispatch(forgotPasswordFailed(error));
		})
	}
}
// module.exports = {
// 	formValueChanges
// }