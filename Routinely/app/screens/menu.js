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
                style={styles.alarm}
                source={require('../components/img/AlarmButton.png')}
              />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Event')}>
              <Image
                style={styles.alarm}
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
                style={styles.alarm}
                source={require('../components/img/ToDoButton.png')}
              />
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Alarm')}>
              <Image
                style={styles.alarm}
                source={require('../components/img/AlarmButton.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('Calendar')}
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
  alarm: {
    marginRight: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
  },
});
export default MenuScreen;
