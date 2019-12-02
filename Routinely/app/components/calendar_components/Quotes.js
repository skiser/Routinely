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

class Quotes extends Component {
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
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Quotes')}
          title={'Quotes'}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 15,
              }}>
              Quote of the Day
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Quotes')}
          title={'Quotes'}
          style={{paddingLeft: 320, paddingTop: 20}}>
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
AppRegistry.registerComponent('Quotes', () => Quotes);

const styles = StyleSheet.create({});
export default withNavigation(Quotes);
