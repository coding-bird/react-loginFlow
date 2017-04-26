'use strict';

import CONFIG from './config'
import axios from 'axios'
import _ from 'underscore'

export class Hapi {
	initialize(token){
		if(!_.isNull(token) && _.isUndefined(token.sessionToken)) {
	      throw new Error('TokenMissing')
	    }
	    this._sessionToken =
	      _.isNull(token) ? null : token.sessionToken.sessionToken

	    this.API_BASE_URL = CONFIG.backend.hapiLocal
	          ? CONFIG.HAPI.local.url
	          : CONFIG.HAPI.remote.url
	}
	
	async login (data) {
	    return await this._fetch({
		    method: 'POST',
		    url: '/account/login',
		    body: data
	    })
		.then((res) => {
	        if (res.status === 200 || res.status === 201) {
		        return res.json
	        } else {
		        throw (res.json)
	        }
	    })
	    .catch((error) => {
		    throw (error)
		})
    }
    
    async signup (data) {
	    return await this._fetch({
	    	method: 'POST',
	    	url: '/account/register',
	     	body: data
	    })
	    .then((res) => {
        	if (res.status === 200 || res.status === 201) {
				return res.json
	        } else {
				throw res.json
	        }
	    })
	    .catch((error) => {
	        throw (error)
	    })
	}
	
	async resetPassword (data) {
    	return await this._fetch({
			method: 'POST',
			url: '/account/resetPasswordRequest',
			body: data
    	})
		.then((response) => {
		if ((response.status === 200 || response.status === 201)) {
			return {}
		} else {
			var res = JSON.parse(response._bodyInit)
			throw (res)
		}
		})
		.catch((error) => {
			throw (error)
		})
  	}
  
	async _fetch (opts) {
	    opts = _.extend({
	      method: 'GET',
	      url: null,
	      body: null,
	      callback: null
	    }, opts)

	    var reqOpts = {
	      method: opts.method,
	      headers: {
	      }
	    }

	    if (this._sessionToken) {
	      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
	    }

	    if (opts.method === 'POST' || opts.method === 'PUT') {
	      reqOpts.headers['Accept'] = 'application/json'
	      reqOpts.headers['Content-Type'] = 'application/json'
	    }

	    if (opts.body) {
	      reqOpts.body = JSON.stringify(opts.body)
	    }

	    let url = this.API_BASE_URL + opts.url
	    let res = {}

	    let response = await fetch(url, reqOpts)
	    res.status = response.status
	    res.code = response.code

	    return response.json()
	      .then((json) => {
	        res.json = json
	        return res
	    })
	}
}

export let hapi = new Hapi();