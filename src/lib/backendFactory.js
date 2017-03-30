'use strict'

import CONFIG from './config'
import {hapi} from './hapi'
console.log('hapi file', hapi);
console.log('hapi file', hapi.initialize);

export default function BackendFactory (token = null) {
  if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
    hapi.initialize(token)
    return hapi
  }
}

