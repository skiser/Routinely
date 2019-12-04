
import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {
    TextInput,
    RefreshControl,
    Text,
    FlatList,
    View,
    StyleSheet,
    ListRenderItem,
    TouchableHighlight,
    Image,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';


const user = [{"email": ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

class horoscopeScreen extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: '',
        sign: '',
        relativePath: 'https://horoscope-free-api.herokuapp.com',
    };
    }

    addHoroscope = () => {
    //const title = this.state.title.toString();
    const addHoroscope = firestore()
      .collection('users')
      .doc(user.email)

    try {
      addHoroscope
        .set({
          sign: this.state.sign,
        })
        .then(ref => {
          console.log('Added doc w ID: ', ref.id);
        });
    } catch (error) {
      console.error(error);
    }
    this.props.navigation.navigate('Calendar');
  };

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
                onPress={() => this.setState({sign:'Aries'})}>
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
                onPress={() => this.setState({sign:'Aries'})}>
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
              onPress={() => this.setState({sign:'Aries'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Aries (March 21 - April 19)'}
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
                onPress={() => this.setState({sign:'Taurus'})}>
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
                onPress={() => this.setState({sign:'Taurus'})}>
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
              onPress={() => this.setState({sign:'Taurus'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Taurus (April 20 - May 20)'}
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
                onPress={() => this.setState({sign:'Gemini'})}>
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
                onPress={() => this.setState({sign:'Gemini'})}>
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
              onPress={() => this.setState({sign:'Gemini'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Gemini (May 21 - Jun 20)'}
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
                onPress={() => this.setState({sign:'Cancer'})}>
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
                onPress={() => this.setState({sign:'Cancer'})}>
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
              onPress={() => this.setState({sign:'Cancer'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Cancer (Jun 21 - Jul 22)'}
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
                onPress={() => this.setState({sign:'Virgo'})}>
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
                onPress={() => this.setState({sign:'Virgo'})}>
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
              onPress={() => this.setState({sign:'Virgo'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Virgo (Aug 23 - Sept 22)'}
              </Text>
            </TouchableHighlight>
            </View>      
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
                onPress={() => this.setState({sign:'Libra'})}>
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
                onPress={() => this.setState({sign:'Libra'})}>
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
              onPress={() => this.setState({sign:'Libra'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Libra (Sept 23 - Oct 22)'}
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
                onPress={() => this.setState({sign:'Scorpio'})}>
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
                onPress={() => this.setState({sign:'Scorpio'})}>
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
              onPress={() => this.setState({sign:'Scorpio'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Scorpio (Oct 23 - Nov 21)'}
              </Text>
            </TouchableHighlight>
            </View>      
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
                onPress={() => this.setState({sign:'Sagittarius'})}>
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
                onPress={() => this.setState({sign:'Sagittarius'})}>
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
              onPress={() => this.setState({sign:'Sagittarius'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Sagittarius (Nov 22 - Dec 21)'}
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
                onPress={() => this.setState({sign:'Capricorn'})}>
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
                onPress={() => this.setState({sign:'Capricorn'})}>
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
              onPress={() => this.setState({sign:'Capricorn'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Capricorn (Dec 22 - Jan 19)'}
              </Text>
            </TouchableHighlight>
            </View>      
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
                onPress={() => this.setState({sign:'Aquarius'})}>
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
                onPress={() => this.setState({sign:'Aquarius'})}>
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
              onPress={() => this.setState({sign:'Aquarius'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Aquarius (Jan 20 - Feb 18)'}
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
                onPress={() => this.setState({sign:'Pisces'})}>
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
                onPress={() => this.setState({sign:'Pisces'})}>
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
              onPress={() => this.setState({sign:'Pisces'})}>
              <Text
                style={{
                  paddingLeft: 10,
                  paddingBottom: 5,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                {'Pisces (Feb 19 - March 20'}
              </Text>
            </TouchableHighlight>
            </View>
            </View>      
            <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.addHoroscope()}>
                Set Horoscope
                </AwesomeButtonBlue>
            </View>
            </View>
            </View>

        );
    }
    
}

const styles = StyleSheet.create({
    quoteTitle: {
        fontSize: 25,
        marginTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
    },
    quote: {
        fontSize: 20,
        marginTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
    },
});

export default horoscopeScreen;


