'use strict';

export default function validate(fieldName, value){
	let status,resp;
	switch(fieldName){
		case 'username' : 
			status = /^[a-zA-Z0-9]{6,12}$/.test(value);
			resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide appropriate user name'}; 
			return resp;
		case 'password' :
			status = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(value);
			resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide appropriate password'}; 
			return resp;
		case 'email' :
			status = value ? true : false; 
			resp = status ? {status : true, msg : ''} : {status : false , msg : 'provide email'};
			return resp;
		default : 
			return {status : true, msg: ''}; 
	}
}