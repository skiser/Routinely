
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
    
    /*(): void {
        fetch('https://horoscope-free-api.herokuapp.com/?time=today&sign='+this.state.sign)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading:false,
                data:responseJson.data
            }, function(){

            });
        })
        .catch((error) => {
            console.error(error);
        });

    }*/

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
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Aries'})}>
                Aries (March 21 - April 19)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Taurus'})}>
                Taurus (April 20 - May 20)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Gemini'})}>
                Gemini (May 21 - Jun 20)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Cancer'})}>
                Cancer (Jun 21 - Jul 22)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Virgo'})}>
                Virgo (Aug 23 - Sept 22)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Libra'})}>
                Libra (Sept 23 - Oct 22)
                </AwesomeButtonBlue><AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Scorpio'})}>
                Scorpio (Oct 23 - Nov 21)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Sagittarius'})}>
                Sagittarius (Nov 22 - Dec 21)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Capricorn'})}>
                Capricorn (Dec 22 - Jan 19)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Aquarius'})}>
                Aquarius (Jan 20 - Feb 18)
                </AwesomeButtonBlue>
                <AwesomeButtonBlue
                width={250}
                onPress={() => this.setState({sign:'Pisces'})}>
                Pisces (Feb 19 - March 20)
                </AwesomeButtonBlue>

                <AwesomeButtonBlue
                width={250}
                onPress={() => this.addHoroscope()}>
                Set Horoscope
                </AwesomeButtonBlue>

                {/* <Text style={styles.quoteTitle}> Your Horoscope of the Day:</Text>
                <Text style={styles.quote}> {JSON.stringify(this.state.data)} </Text> */}
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


