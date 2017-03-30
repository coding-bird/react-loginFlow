'use strict'

import authAction from '../actions/authActions';

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
	switch(action.type){
		case 'username_entered': 
			return {...state, form: { ...state.form, username:action.payload}};
		case 'password_entered': 
			return {...state, form: {...state.form, password :action.payload}};
		case 'email_entered':
			return {...state, form: {...state.form, email: action.payload}};
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
		case 'validation': 
			switch(action.payload.fieldName){
				case 'username': 
					return {...state, form : {...state.form, usernameHasError: !action.payload.status, usernameErrorMsg: action.payload.msg}}
				case 'password':
					return {...state, form : {...state.form, passwordHasError: !action.payload.status, passwordErrorMsg: action.payload.msg}}
				case 'email':
					return {...state, form : {...state.form, emailHasError: !action.payload.status, emailErrorMsg: action.payload.msg}}
			}
	}	
	return state;
}


