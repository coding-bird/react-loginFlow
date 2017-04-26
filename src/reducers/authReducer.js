'use strict'

import authAction from '../actions/authActions';
import fieldValidation from '../lib/fieldValidation';

const initialState = {
	form : {
		username : "",
		email: '',
		password : "",
		usernameHasError: false,
		usernameErrorMsg : '',
		emailHasError: false,
		emailErrorMsg: '',
		passwordHasError: false,
		passwordErrorMsg: ''
	},
	userData : {
		sessionToken : null
	},
	isfetching : false,
	fetched : false,
	error : null,
	loginRequested : false,
	registerRequested: false
}
export default function authReducer(state=initialState, action){
	let nextState,valid;
	switch(action.type){
		case 'username_entered': 
			valid = /^[a-zA-Z0-9]{6,12}$/.test(action.payload);
			if(valid){
				return {...state, form : {...state.form, username:action.payload, usernameHasError : false, usernameErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, username:action.payload, usernameHasError : true, usernameErrorMsg : 'username should be of 6 to 12 characters'}}
			}
			// return fieldValidation(nextState, {fieldname: 'username', value: action.value});
		case 'password_entered': 
			valid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(action.payload);
			if(valid){
				return {...state, form : {...state.form, password: action.payload, passwordHasError : false, passwordErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, password: action.payload, passwordHasError : true, passwordErrorMsg : 'password should have number followed by a special character and a character'}}
			}
		case 'email_entered':
			let emailUsername = (action.payload).split('@')[0];
			valid = /^([a-zA-Z](((.)[a-zA-Z0-9]+|[a-zA-Z0-9]*))+){6,30}$/.test(emailUsername);
			if(valid){
				return {...state, form : {...state.form, email:action.payload, emailHasError : false, emailErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, email:action.payload, emailHasError : true, emailErrorMsg : 'provide a valid email id'}}
			}
		case 'loginRequested': 
			return {...state, isfetching : true, error : null, loginRequested : true};
		case 'LOGIN_SUCCESS':
			return {...state, isfetching: false, fetched : true, userData : {...state.userData, sessionToken : action.payload}}
		case 'LOGIN_FAILED': 
			return {...state, isfetching: false, fetched: true, error: action.payload}
		case 'registerRequested': 
			return {...state, isfetching:true, error: null, registerRequested: true }
		case 'REGISTER_FAILED':
			return {...state, isfetching: false, fetched: true, error : action.payload}
		case 'REGISTER_SUCCESS':
			return {...state, isfetching: false, fetched: true, userData: {...state.userData, sessionToken: action.payload}}
		case 'FORGOTPASSWORD_FAILED' : 
			return {...state, isfetching : false, fetched: false, error : action.payload}
		case 'RESET_PASSWORD_SUCCESS': 
			return {...state, isfetching : false , fetched : true}
		case 'RESET_PASSWORD_REQUESTED':
			return {...state, isfetching: true, fetched : false}
	}
	return state;
}

