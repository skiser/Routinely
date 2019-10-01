import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, StyleSheet, Button } from 'react-native';


class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Text
        style = {styles.login}>Login</Text>
        <Text
        style = {styles.email}
        > Enter Email </Text>

        <TextInput
        style = {styles.emailIn}
          placeholder = "bsoto@ycp.edu"
        />
        <Text
        style = {styles.password}
        >
        Enter Password </Text>
        <TextInput
          style = {styles.passIn}
          placeholder = "Pa55w0rd"
        />
         <Button
          title="Calendar"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  login:{
    textAlign: 'center',
    padding: 20,
    fontSize: 30,
    fontWeight:'700',
  },

  email:{
    fontSize: 24,
    fontWeight: '600',
  },

  emailIn:{
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  },

  password:{
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },

  passIn:{
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  }

});

export default LoginScreen;
