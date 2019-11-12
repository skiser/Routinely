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
              onPress={() => this.props.navigation.navigate('Task')}>
              <Image
                style={styles.icon}
                source={require('../components/img/DailyToDoButton.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <Button
          title="Back"
          color="#90A4AE"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
        <Button
          title="Notes"
          color="#90A4AE"
          onPress={() => this.props.navigation.navigate('Notes')}
        />
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
    width: 180,
    height: 100,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
  },
  MenuButton: {
    backgroundColor: 'red',
    width: '45%',
    height: '35%',
    borderRadius: 10,
    margin: 10,
  },
});
export default MenuScreen;
