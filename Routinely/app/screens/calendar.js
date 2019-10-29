import React, {Component} from 'react';
import {Alert, Button, FlatList, Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import {AgendaList,CalendarProvider, ExpandableCalendar,} from 'react-native-calendars';
import _ from 'lodash';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

var events = [
  //we cant just call get dates for this 
 //getDates()
];

const utcDateToString = (momentInUTC: moment): string => {
  // console.warn(s);
  return moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

const user = firebase.auth().currentUser;

const eventsRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('event'); 

//const eventsRef = eRef.collection('event');

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

class CalendarScreen extends Component {
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };
  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };
  state = {
    eventList: [],
    setEvent: '',
    event: '',
    datelist: [],
    date: '',
  };

  getEvents = async eventRetrieved => {
    try {
      const snapshot = await eventsRef.get()
      snapshot.forEach(event => {
        this.state.eventList.push(event.data());
        console.log("this is the event " +event.get('chosenDate').toDate());
      });
      eventRetrieved(this.state.eventList);
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  getDates = () => {
    this.state.eventlist.forEach(event =>{
      events.push(event.get('chosenDate').toDate());
    })
    return events;
  };

  onEventsRetrieved = eventList => {
    console.log(eventList);
    this.setState(prevState => ({
      eventList: (prevState.eventList = eventList),
    }));
  };
  

  getAllData(){
    this.getEvents(this.onEventsRetrieved);
    //this.getDates(this.onDatesRetrieved);
  }

  componentDidMount() {
    this.getAllData();
  }
  //TODO: need to figure out how to properly do this
  buttonPressed(id) {
    Alert.alert(id);
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

  renderItem = () => {
    return (
      <FlatList
        data={this.state.eventList}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => this.itemPressed(item.title+ '   ' +item.notes)}
              style={styles.item}>
              <View>
                <Text style={styles.itemHourText}>{item.hour}</Text>
                <Text style={styles.itemDurationText}>{item.duration}</Text>
              </View>
              <Text style={styles.itemTitleText}>{item.title}     </Text>
              <Text style={styles.itemHourText}>{item.notes}      </Text>
              <Text style={styles.itemHourText}>{item.chosenDate.toDate().getHours() > 12 ?  (item.chosenDate.toDate().getHours() - 12)  : item.chosenDate.toDate().getHours()}:{item.chosenDate.toDate().getMinutes() < 10 ? ("0"+(item.chosenDate.toDate().getMinutes())):(item.chosenDate.toDate().getMinutes())}  {item.chosenDate.toDate().getHours() > 12 ?'pm':'am'}</Text>
              {/* TODO: do we want an info button or not??
              <View style={styles.itemButtonContainer}>
                <Button title={'Info'} onPress={this.buttonPressed} />
              </View> */}
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  getMarkedDates = () => {
    const marked = {};
    const mark = this.state.eventList;
    console.log(mark);
    mark.forEach(event =>{
      // only mark dates with data
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();
      
      const markdate = year + "-" + month + "-" + day;

      marked[markdate] = {marked: true};
      console.log('successfully added');
    })
    console.log(marked);
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
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          firstDay={1}
          markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          theme={this.getTheme()}
          leftArrowImageSource={require('../components/img/previous.png')}
          rightArrowImageSource={require('../components/img/next.png')}
          calendarStyle={styles.calendar}
          headerStyle={styles.calendar} // for horizontal only
        />
        <FlatList
          data={this.state.eventList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => this.itemPressed(item.title+ '   ' +item.notes)}
              style={styles.item}>
              <View>
                <Text style={styles.itemHourText}>{item.hour}</Text>
                <Text style={styles.itemDurationText}>{item.duration}</Text>
              </View>
              <Text style={styles.itemTitleText}>{item.title}     </Text>
              <Text style={styles.itemHourText}>{item.notes}      </Text>
              <Text style={styles.itemHourText}>{item.chosenDate.toDate().getUTCMonth()+1} - {item.chosenDate.toDate().getUTCDate()} - {item.chosenDate.toDate().getUTCFullYear()}   </Text>
              <Text style={styles.itemHourText}>{item.chosenDate.toDate().getHours() > 12 ?  (item.chosenDate.toDate().getHours() - 12)  : item.chosenDate.toDate().getHours()}:{item.chosenDate.toDate().getMinutes() < 10 ? ("0"+(item.chosenDate.toDate().getMinutes())):(item.chosenDate.toDate().getMinutes())}  {item.chosenDate.toDate().getHours() > 12 ?'pm':'am'}</Text>
            </TouchableOpacity>
          );
        }}
      />
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Alarm')}>
              <Image
                style={styles.contain}
                source={require('../components/img/alarm.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Menu')}>
              <Image
                style={styles.plusImage}
                source={require('../components/img/circle-plus.png')}
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
    color: 'white',
    alignItems: 'baseline',
    marginLeft: 300,
    marginBottom: 25,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 20,
    paddingBottom: 5,
    alignItems: 'center',
  },
  plusImage: {
    width: 50,
    height: 50,
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
