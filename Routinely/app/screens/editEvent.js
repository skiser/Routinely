import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, Platform, UIManager, DatePickerIOS,} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import DayPicker from '../components/alarm_components/DayPicker';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Hoshi} from 'react-native-textinput-effects';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import RepeatDiv from '../components/alarm_components/RepeatDiv';
import {Divider} from 'react-native-elements';

const user = firebase.auth().currentUser;

class EditEventScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      title: '',
      notes: '',
    };
    //this.setDate = this.setDate.bind(this);
  }



  onButtonPress = (day) => {
    this.setState({
      day: true
    });
  }

  editEvent = async (title) => {
    //const title = this.state.title.toString();
    const editEvent = firestore().collection('users').doc(user.email).collection('events');
    try {
      //console.log(title);
      editEvent.doc(event.title).update({
        title: this.state.title,
      })
        .then(ref => {
          console.log('Edited doc w ID: ', ref.id);
        });
    } catch (error) {
      console.error(error);
    }
    this.props.navigation.navigate('Calendar');
  };

  //console.log(this.props.event)
  render() {
    const event = this.props.navigation.getParam('event');
    return (
      <View style={styles.container}>
        <View style={styles.card1}>
          <Hoshi
            label={'Edit Title:'}
            value={event.title}
            onChangeText={title => event.title}
            borderColor={'#2E68FF'}
            maskColor={'#blue'}
          />
          <Hoshi
            label={'Edit Notes:'}
            onChangeText={notes => event.notes}
            value={event.notes}
            borderColor={'#2E68FF'}
            maskColor={'#blue'}
          />
        </View>
        <RepeatDiv />
        <Divider />
        <AwesomeButtonBlue
          width={350}
          title="editEvent"
          onPress={() => this.editEvent(event.title)}>
          
          Edit Event
        </AwesomeButtonBlue>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  dayBox: {
    backgroundColor: 'lightgrey',
    borderColor: 'white',
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

export default EditEventScreen;
