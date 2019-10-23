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
        <View style={styles.block}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Task')}>
            <Image
              style={styles.contain}
              source={require('../components/img/clipboard.png')}
            />

          </TouchableHighlight>
          <Text style={styles.title}> To-Do List </Text>
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Event')}>
          <Image
            style={styles.contain}
            source={require('../components/img/plus.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Task')}>
          <Image
            style={styles.clip}
            source={require('../components/img/clipboard.png')}
          />
        </TouchableHighlight>
        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    margin: 15,
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    paddingTop: 15,
    fontSize: 18,
    color: 'white',
  },
  plus: {
    width: 20,
    height: 20,
    marginLeft: 350,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 5,
    alignItems: 'center',
  },
  contain: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  clip: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginBottom: 10,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
export default MenuScreen;
