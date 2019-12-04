import React, {Component} from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';

export default (WeatherToggle = props => {
  return (
    <View style={styles.container}>
      <Switch onValueChange={props.toggleSwitch1} value={props.switch1Value} />
    </View>
  );
});
const styles = StyleSheet.create({
  container: {},
});
