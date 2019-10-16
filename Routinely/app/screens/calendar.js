import React, {Component} from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import _ from 'lodash';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import BottomBar from '../components/calendar_components/BottomBar';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const events = getAllEvents();

const utcDateToString = (momentInUTC: moment): string => {
  // console.warn(s);
  return moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

function getAllEvents() {
  const eventsRef = firestore()
    .collection('users')
    .doc('skiser')
    .collection('event');
  const allEvents = eventsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        console.log(doc.id, '=>', doc.title);
      });
    })
    .catch(err => {
      console.log('Error getting docs', err);
    });
}

class CalendarScreen extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }*/
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert(item.notes);
  }
  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }
  renderEvent = events => {
    if (_.isEmpty(this.events)) {
      return this.renderEmptyItem();
    }
    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(events.title)}
        style={styles.item}>
        <Text style={styles.itemTitleText}>{events.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked = {};
    for (var i = 0; i < events.length; i++) {
      // only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      }
    }
    return marked;
  };

  getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  render() {
    return (
      <CalendarProvider
        date={today}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        theme={{todayButtonTextColor: '#0059ff'}}
        showTodayButton
        disabledOpacity={0.6}
        // todayBottomMargin={16}
      >
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Event')}>
          <Image
            style={styles.plus}
            source={require('../components/img/plus.png')}
          />
        </TouchableHighlight>
        <ExpandableCalendar
          firstDay={1}
          theme={this.getTheme()}
          leftArrowImageSource={require('../components/img/previous.png')}
          rightArrowImageSource={require('../components/img/next.png')}
        />
        <AgendaList
          renderEvent={this.renderEvent}
          // sectionStyle={styles.section}
        />
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Calendar')}>
              <Image
                style={styles.contain}
                source={require('../components/img/calendar.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Alarm')}>
              <Image
                style={styles.contain}
                source={require('../components/img/alarm.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                this.signOut;
              }}>
              <Image
                style={styles.contain}
                source={require('../components/img/logout.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Event')}>
              <Image
                style={styles.contain}
                source={require('../components/img/plus.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  plus: {
    width: 20,
    height: 20,
    marginLeft: 350,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 5,
    alignItems: 'center',
  },
  contain: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14,
  },
});

export default CalendarScreen;
