import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import TimePicker from './alarm_components/TimePicker';
import DayPicker from './alarm_components/DayPicker';
import eventController from './eventController';


const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

class EventScreen extends Component {
  render() {
    const {title, startTime, endTime, notes, backgroundColor,tintColor, titleColor} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Event title: </Text>
        <View style={styles.text}>
          <TextInput
            style={{
              height: 40,
              width: '100%',
              marginTop: 30,
              marginHorizontal: 15,
            }}
            placeholder="enter event title"
            onChangeText={title => this.setState({title})}
            value={this.state.title}
          />
        </View>
        <Text style={styles.welcome}>Event ID: </Text>
        <View style={styles.text}>
          <TextInput
            style={{
              height: 40,
              width: '100%',
              marginTop: 30,
              marginHorizontal: 15,
            }}
            placeholder="enter event id"
            onChangeText={id => this.setState({id})}
            value={this.state.id}
          />
        </View>
        <View style={styles.picker}>
          <DayPicker />
          <TimePicker />
        </View>
        <Button
          onPress={() => {
            EventScreen.addToCalendar(eventTitle, nowUTC);
          }}
          title="Add to calendar"
        />
        <Button
          onPress={() => {
            EventScreen.editCalendarEventWithId(this.state.id);
          }}
          title="Edit event with this id"
        />
        <Button
          onPress={() => {
            EventScreen.showCalendarEventWithId(this.state.text);
          }}
          title="Show event with this id"
        />
      </View>
    );
  }

  static addToCalendar = (title: string, startDateUTC: moment) => {
    const eventConfig = {
      title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
      notes: 'tasty!',
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
        titleColor: 'blue',
      },
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then(
        (eventInfo: {
          calendarItemIdentifier: string,
          eventIdentifier: string,
        }) => {
          // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
          // These are two different identifiers on iOS.
          // On Android, where they are both equal and represent the event id, also strings.
          // when { action: 'CANCELED' } is returned, the dialog was dismissed
          console.warn(JSON.stringify(eventInfo));
        },
      )
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };

  static editCalendarEventWithId = (eventId: string) => {
    const eventConfig = {
      eventId,
    };

    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then(eventInfo => {
        console.warn(JSON.stringify(eventInfo));
      })
      .catch((error: string) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });
  };
}

const styles = StyleSheet.create({
  pick: {
    width: 600,
  },
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  card1: {
    paddingVertical: 16,
    width: 350,
  },
});
export default EventScreen;
