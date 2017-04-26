'use strict';

export default function validate(state, action){
	let valid,resp;
	switch(action.fieldName){
		case 'username' : 
			valid = /^[a-zA-Z0-9]{6,12}$/.test(action.value);
			// resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide appropriate user name'}; 
			// return resp;
			if(valid){
				return {...state, form : {...state.form, usernameHasError : false, usernameErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, usernameHasError : true, usernameErrorMsg : 'username should be of 6 to 12 characters'}}
			}

		case 'password' :
			// status = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(action.value);
			// resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide appropriate password'}; 
			valid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(action.value);
			if(valid){
				return {...state, form : {...state.form, passwordHasError : false, passwordErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, passwordHasError : true, passwordErrorMsg : 'password should have number followed by a special character and a character'}}
			}

		case 'email' :
			// status = action.value ? true : false; 
			// resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide email'};
			// return resp;
			valid = action.value ? true : false;
			if(valid){
				return {...state, form : {...state.form, emailHasError : false, emailErrorMsg : ''}}
			} else{
				return {...state, form : {...state.form, emailHasError : true, emailErrorMsg : 'provide a valid email id'}}
			}
	}
}