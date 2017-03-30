import React, {Component} from 'react';
import {
	Text,
	AppRegistry,
	View,
	TouchableHighlight
} from 'react-native';

import store from './lib/configureStore';
import {
    Router,
    Scene} from 'react-native-router-flux';
    
import {
    Provider} from 'react-redux';
    
import Login from './containers/login';
import Register from './containers/register';
import Home from './containers/home';
console.log('class',Home);
export default function native(){
	var project = React.createClass({
		render(){
            return (<Provider store = {store}>
                    <Router sceneStyle={{ backgroundColor: 'white' }}>
                      <Scene key='root' hideNavBar>
                        <Scene key='Login'
                          component={Login}
                          type='replace' 
                          initial/>
          
                        <Scene key='Register'
                          component={Register}
                          type='replace' />
                        <Scene key='Home'
                        	component={Home}
                        	type='replace' />  
                      </Scene>
                    </Router>
                    </Provider>);
		}
	});
AppRegistry.registerComponent('projectlogin', () => project);
}

