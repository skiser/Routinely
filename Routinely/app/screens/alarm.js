import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Button,
  DatePickerIOS,
} from 'react-native';
import DayPicker from '../components/alarm_components/DayPicker';
import RepeatDiv from '../components/alarm_components/RepeatDiv';
import SnoozeDuration from '../components/alarm_components/SnoozeDuration';
import {Divider} from 'react-native-elements';
import ColorPicker from '../components/alarm_components/ColorPicker';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

const utcDateToString = (momentInUTC: moment): string => {
  let time = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return time;
};

const user = firebase.auth().currentUser;

class AlarmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      chosenDate: new Date(),
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false,
      Snooze2: false,
      Snooze5: false,
      Snooze10: false,
      Pressed: true,
    };
    //this.setDate = this.setDate.bind(this);
  }

  onButtonPress = day => {
    this.setState({
      day: true,
    });
  };

  addAlarm = async title => {
    //const title = this.state.title.toString();
    const addAlarm = firestore()
      .collection('users')
      .doc(user.email)
      .collection('alarms');
    try {
      addAlarm
        .doc()
        .set({
          title: this.state.title,
          chosenDate: this.state.chosenDate,
          Sun: this.state.Sun,
          Mon: this.state.Mon,
          Tue: this.state.Tue,
          Wed: this.state.Wed,
          Thu: this.state.Thu,
          Fri: this.state.Fri,
          Sat: this.state.Sat,
          Snooze2: this.state.Snooze2,
          Snooze5: this.state.Snooze5,
          Snooze10: this.state.Snooze10,
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
      <View style={styles.container}>
        <View style={styles.card1}>
          <Hoshi
            label={'Title'}
            onChangeText={title => this.setState({title})}
            value={this.state.title}
            borderColor={'#2E68FF'}
            maskColor={'#blue'}
          />
        </View>
        <View>
          <DatePickerIOS
            mode={'time'}
            date={this.state.chosenDate}
            onDateChange={chosenDate => this.setState({chosenDate})}
          />
        </View>
        <RepeatDiv />
        <Divider />
        <View style={styles.containerDate}>
          <Button
            buttonStyle={styles.dayBox}
            title="S"
            onPress={() => this.setState(prevState => ({Sun: !prevState.Sun}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="M"
            onPress={() => this.setState(prevState => ({Mon: !prevState.Mon}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="T"
            onPress={() => this.setState(prevState => ({Tue: !prevState.Tue}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="W"
            onPress={() => this.setState(prevState => ({Wed: !prevState.Wed}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="T"
            onPress={() => this.setState(prevState => ({Thu: !prevState.Thu}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            title="F"
            onPress={() => this.setState(prevState => ({Fri: !prevState.Fri}))}
          />
          <Button
            buttonStyle={styles.dayBox}
            backgroundColor={'red'}
            title="S"
            onPress={() => this.setState(prevState => ({Sat: !prevState.Sat}))}
          />
        </View>
        <Divider />
        <ColorPicker />
        <AwesomeButtonBlue
          width={350}
          title="addAlarm"
          onPress={() => this.addAlarm(this.state.title)}>
          Add Alarm
        </AwesomeButtonBlue>
        <Button
          title={'Ring'}
          onPress={() => this.props.navigation.navigate('AlarmRinging')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dayBox: {
    backgroundColor: 'lightgrey',
    borderColor: 'white',
    color: 'red',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    overflow: 'hidden',
    padding: 8,
    textAlign: 'center',
    width: 40,
    height: 40,
    flexDirection: 'row',
  },
  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  pick: {
    width: 600,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingLeft: 10,
    paddingRight: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 50,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  card1: {
    paddingVertical: 16,
    width: 350,
  },
  submit: {
    paddingVertical: 16,
    width: 350,
  },
});
export default AlarmScreen;
