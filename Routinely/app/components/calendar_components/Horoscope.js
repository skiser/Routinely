import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import {Divider} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

class Horoscope extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          height: 50,
          borderRadius: 10,
          marginTop: 5,
          marginBottom: 5,
        }}>
        <View style={styles.dot}>
          <Text />
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('TodayHoroscope')}
          title={'Horoscope'}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 5,
              }}>
              Horoscope of the Day
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('TodayHoroscope')}
          title={'Horoscope'}
          style={{paddingLeft: 180, paddingTop: 20}}>
          <View>
            <Image
              style={styles.icon}
              source={require('Routinely/app/components/img/next.png')}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
AppRegistry.registerComponent('Horoscope', () => Horoscope);

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#9852f9',
    width: 10,
    height: 10,
    paddingTop: 20,
    marginTop: 15,
    marginLeft: 5,
    borderRadius: 5,
  },
});
export default withNavigation(Horoscope);
