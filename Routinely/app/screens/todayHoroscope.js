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

const user = [{"email": ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

const signRef = firestore()
  .collection('users')
  .doc(user.email);

class todayHoroscopeScreen extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
        sign: '',
        data: '',
    };
    }

    getSign = () => {
    let getSign = signRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({sign: doc.data()});
          console.log(this.state.sign.sign);
          this.getHoroscope();
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    };

    getHoroscope = () => {
        if(this.state.sign.sign === null){
            this.state.data = "Please pick your horoscope on the Menu Page!";
        }
        fetch('https://horoscope-free-api.herokuapp.com/?time=today&sign=' +this.state.sign.sign,)
        .then(response => response.json())
        .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            data: responseJson.data,
          },
          function() {},
        );
        console.log(
          'horoscope: ' + this.state.data + ' sign: ' + this.state.sign.sign,
        );
        //oroscopeRetrieved(this.state.data);
      })
      .catch(error => {
        console.error(error);
      });
    };

    onSignRetrieved = sign => {
        this.setState(prevState => ({
            sign: (prevState.sign = sign),
        }));
    };


    componentDidMount() {
        this.getSign();
    }



    render() { 

        return (
            <View>
                <Text style={styles.quoteTitle}> Horoscope of the Day:</Text>
                <Text style={styles.quote}> {this.state.data} </Text>
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

export default todayHoroscopeScreen;