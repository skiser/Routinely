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

class Notes extends Component {
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
          onPress={() => this.props.navigation.navigate('Notes')}
          title={'Notes'}>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                paddingTop: 15,
                paddingLeft: 5,
              }}>
              Notes
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Notes')}
          title={'Notes'}
          style={{paddingLeft: 300, paddingTop: 20}}>
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
AppRegistry.registerComponent('Notes', () => Notes);

const styles = StyleSheet.create({
  dot: {
    backgroundColor: '#268E1E',
    width: 10,
    height: 10,
    paddingTop: 20,
    marginTop: 15,
    marginLeft: 5,
    borderRadius: 5,
  },
});
export default withNavigation(Notes);
