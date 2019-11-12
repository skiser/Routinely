import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';

class MenuScreen extends Component {
  render() {
    return (
      <View>
        <View style={styles.row}>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Alarm')}>
              <Image
                style={styles.icon}
                source={require('../components/img/AlarmButton.png')}
              />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Event')}>
              <Image
                style={styles.icon}
                source={require('../components/img/EventButton.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Tasks')}>
              <Image
                style={styles.icon}
                source={require('../components/img/DailyToDoButton.png')}
              />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Notes')}>
              <Image
                style={styles.icon}
                source={require('../components/img/NotesButton.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 5,
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 100,
    marginLeft: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
  },
  MenuButton: {
    backgroundColor: 'red',
    width: '50%',
    height: '40%',
    borderRadius: 14,
    margin: 10,
  },
});
export default MenuScreen;
