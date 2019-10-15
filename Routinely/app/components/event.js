import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import DayPicker from './alarm_components/DayPicker';
import TimePicker from './alarm_components/TimePicker';
import {Divider} from 'react-native-elements';
import TitleInput from './alarm_components/TitleInput';
import { Hoshi } from 'react-native-textinput-effects';
import DateTimePicker from '@react-native-community/datetimepicker';
import events from './calendar';

const utcDateToString = (momentInUTC: moment): string => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    // console.warn(s);
    return s;
  };

class EventScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,
    title: null,
    notes: null,};
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  timepicker = () => {
    this.show('time');
  }
  componentDidMount(){
    this.time;
  }
  render() {
    const { show, date, mode, title, notes} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card1}>
            <Hoshi label={'Title'} borderColor={'#2E68FF'} maskColor={'#blue'} value={title} />
        </View>
        <View style={styles.card1}>
            <Hoshi label={'Notes'} borderColor={'#2E68FF'} maskColor={'#blue'} value={notes} />
        </View>
        <View style={styles.pick}>
        <View>
          <Button onPress={this.datepicker} title="Show  Date" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Select Time" />
        </View>
        { show && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
      </View>
        <Button
          onPress={() => {
            EventScreen.addToCalendar(this.title, this.time);}}
          title="Add to calendar"
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
      .then((eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }) => {
        // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
        // These are two different identifiers on iOS.
        // On Android, where they are both equal and represent the event id, also strings.
        // when { action: 'CANCELED' } is returned, the dialog was dismissed
        console.warn(JSON.stringify(eventInfo));
      })
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
  pick:{
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