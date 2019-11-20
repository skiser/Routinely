import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import colorPicker from '../components/alarm_components/ColorPicker';

class MenuScreen extends Component {
  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#6096FD',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Event')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Event')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Event')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'Event'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#268E1E',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Notes')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/Notes.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Notes')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Notes')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'Notes'}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#E14628',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Task')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/toDo.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Task')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Task')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'To-Do List'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#F3AE42',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Alarm')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/alarm-clock.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Alarm')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Alarm')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'Alarm'}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              backgroundColor: '#7BD5F5',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Weather')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/weather.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Weather')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Weather')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'Weather'}
              </Text>
            </TouchableHighlight>
            </View>
            <View
            style={{
              backgroundColor: '#268E1E',
              width: 190,
              height: 100,
              borderRadius: 10,
              marginLeft: 10,
              marginTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Quotes')}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/alarm-clock.png')}
                />
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.props.navigation.navigate('Quotes')}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    marginLeft: 90,
                    fontWeight: 'normal',
                  }}>
                  {' + '}
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.props.navigation.navigate('Quotes')}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 24,
                }}>
                {'Quotes'}
              </Text>
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
