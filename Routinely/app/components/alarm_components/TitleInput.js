import React, {Component} from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';

export default class TitleInput extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card1}>
          <Hoshi label={'Title'} borderColor={'#2E68FF'} maskColor={'#blue'} />
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('TitleInput', () => TitleInput);

const styles = StyleSheet.create({
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 50,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  card1: {
    paddingVertical: 16,
    width: 350,
  },
  container: {
    flexDirection: 'row',
<<<<<<< HEAD
    padding: 10
  }
=======
    padding: 10,
  },
>>>>>>> 80a47c46bb76690e1d08aa6cb4de99dc71757ede
});
