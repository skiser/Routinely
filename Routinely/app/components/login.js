import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('Login', () => Login);
