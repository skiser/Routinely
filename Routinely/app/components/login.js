import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '900148831632-ddbara9s24u173ao7bteg73kpe845lta.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '160012889513-qkt18m4n7umihpbl5vjue1ekgubrp5ve.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      console.log(userInfo);
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      await firebase.auth().signInWithCredential(credential);
      //console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('user has not signed in yet');
        this.setState({loggedIn: false});
      } else {
        // some other error
        console.log('some other error happened');
        this.setState({loggedIn: false});
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <ImageBackground source={require('./img/RoutinelyLoginBackground.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {!this.state.loggedIn && <View>
              <View style={styles.dp}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require('./img/RoutinelyR.png')}
              />
              </View>
              <View style={styles.buttonContainer}>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.firebaseGoogleLogin}
                disabled={this.state.isSigninInProgress}/>
                </View>
                </View>}
            </View>
            <View>
                {!this.state.loggedIn && <Text style={styles.textInputEnter}>You are currently logged out</Text>}
                {this.state.loggedIn && <Button onPress={this.signOut}
                  title="Signout"
                  color="#841584">
                </Button>}
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {!this.state.loggedIn && <Text>You are currently logged out</Text>}
          {this.state.loggedIn && (
            <Button onPress={this.signOut} title="Signout" color="#841584" />
          )}
        </View>
        <View>
          {this.state.loggedIn && (
            <View>
              <View style={styles.listHeader}>
                <Text>User Info</Text>
              </View>
              <View style={styles.dp}>
                <Image
                  style={{width: 100, height: 100}}
                  source={{
                    uri:
                      this.state.userInfo &&
                      this.state.userInfo.user &&
                      this.state.userInfo.user.photo,
                  }}
                />
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.message}>
                  {this.state.userInfo &&
                    this.state.userInfo.user &&
                    this.state.userInfo.user.name}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.message}>
                  {this.state.userInfo &&
                    this.state.userInfo.user &&
                    this.state.userInfo.user.email}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.title}>ID</Text>
                <Text style={styles.message}>
                  {this.state.userInfo &&
                    this.state.userInfo.user &&
                    this.state.userInfo.user.id}
                </Text>
              </View>
              <View style={styles.container}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('Calendar')}>
                    <Image
                      style={styles.contain}
                      source={require('./img/calendar.png')}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('Alarm')}>
                    <Image
                      style={styles.contain}
                      source={require('./img/alarm.png')}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('Logout')}>
                    <Image
                      style={styles.contain}
                      source={require('./img/logout.png')}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 5,
  },
  contain: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  login: {
    textAlign: 'center',
    padding: 500,
    fontSize: 30,
    fontWeight: '700',
  },
  body: {
    alignItems: 'center',
    padding: 15,
  },
  textInputEnter: {
    width: 300,
    borderRadius: 35,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    textAlign: 'center',
    paddingVertical: 16,
  },
  email: {
    fontSize: 24,
    fontWeight: '600',
  },
  emailIn: {
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  password: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },
  passIn: {
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12,
  },
  detailContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dp: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    paddingTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    marginTop: 420,
    paddingHorizontal: 24,
    justifyContent: 'center',
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 50,
    paddingLeft: 12,
    textAlign: 'left',
  },
  footerTwo: {
    fontSize: 12,
    fontWeight: '600',
    padding: 50,
    paddingRight: 12,
    textAlign: 'right',
  },
  logoText: {
    marginVertical: 50,
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(0,0,0,1)',
  },
  note: {
    marginVertical: 50,
    fontSize: 12,
    color: 'rgba(43, 43, 206, 1)',
  },
});

export default LoginScreen;
