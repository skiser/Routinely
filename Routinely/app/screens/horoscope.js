
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
              marginTop: 5,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Aries'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Aries'})}>
              <Text
                style={{
                  paddingLeft: 45,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Aries'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 5,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(March 21 - April 19)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#268E1E',
              margin: 10,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Taurus'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/Notes.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Taurus'})}>
              <Text
                style={{
                  paddingLeft: 35,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Taurus'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(April 20 - May 20)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 10,
              width: 125,
              height: 150,
              marginLeft: 5,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Gemini'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Gemini'})}>
              <Text
                style={{
                  paddingLeft: 35,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Gemini'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Gemini'})}>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(May 21 - June 20)'}
              </Text>
            </TouchableHighlight>
          </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 5,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Cancer'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Cancer'})}>
              <Text
                style={{
                  paddingLeft: 35,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Cancer'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 10,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(June 21 - July 22)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#268E1E',
              margin: 10,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Leo'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/Notes.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Leo'})}>
              <Text
                style={{
                  paddingLeft: 45,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Leo'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 12,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(July 23 - Aug 22)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 10,
              width: 125,
              height: 150,
              marginLeft: 5,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Virgo'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Virgo'})}>
              <Text
                style={{
                  paddingLeft: 40,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Virgo'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 12,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Aug 23 - Sept 22)'}
              </Text>
            </TouchableHighlight>
          </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 5,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Libra'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Libra'})}>
              <Text
                style={{
                  paddingLeft: 45,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Libra'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 12,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Sept 23 - Oct 22)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#268E1E',
              margin: 10,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Scorpio'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/Notes.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Scorpio'})}>
              <Text
                style={{
                  paddingLeft: 35,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Scorpio'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 14,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Oct 23 - Nov 21)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 10,
              width: 125,
              height: 150,
              marginLeft: 5,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Sagittarius'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Sagittarius'})}>
              <Text
                style={{
                  paddingLeft: 25,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Sagittarius'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Sagittarius'})}>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 14,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Nov 22 - Dec 21)'}
              </Text>
            </TouchableHighlight>
          </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 5,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Capricorn'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Capricorn'})}>
              <Text
                style={{
                  paddingLeft: 25,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Capricorn'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 14,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Dec 22 - Jan 19)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              backgroundColor: '#268E1E',
              margin: 10,
              width: 125,
              height: 150,
              marginLeft: 10,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Aquarius'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 10,
                  }}
                  source={require('../components/img/Notes.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Aquarius'})}>
              <Text
                style={{
                  paddingLeft: 30,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Aquarius'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Jan 20 - Feb 18)'}
              </Text>
            </TouchableHighlight>
          </View>
          <View
              style={{
              backgroundColor: '#6096FD',
              marginTop: 10,
              width: 125,
              height: 150,
              marginLeft: 5,
              borderRadius: 100,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor={'grey'}
                onPress={() => this.setState({sign:'Pisces'})}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    marginLeft: 35,
                    marginBottom: 5,
                  }}
                  source={require('../components/img/alarm.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableHighlight
              underlayColor={'grey'}
              onPress={() => this.setState({sign:'Pisces'})}>
              <Text
                style={{
                  paddingLeft: 40,
                  paddingBottom: 1,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 18,
                }}>
                {'Pisces'}
              </Text>
              </TouchableHighlight>
              <TouchableHighlight>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 8,
                  paddingBottom: 0,
                  color: 'white',
                  fontWeight: 'normal',
                  fontSize: 12,
                }}>
                {'(Feb 19 - March 20)'}
              </Text>
            </TouchableHighlight>
          </View>
          </View>
          <View style={{paddingLeft: 35}}>
           <AwesomeButtonBlue
          width={350}
          title="add Horoscope"
          onPress={() => this.addHoroscope()}>
          Edit Horoscope
        </AwesomeButtonBlue>
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


