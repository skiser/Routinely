import React, {Component} from 'react';
import {
  Alert,
  Button,
  FlatList,
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
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Divider} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Notes from 'Routinely/app/components/calendar_components/Notes.js';

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const todayfull = yyyy + '-' + mm + '-' + dd;

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
console.disableYellowBox = true;
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

var events = [];

const utcDateToString = (momentInUTC: moment): string => {
  // console.warn(s);
  return moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
};

const user = [{email: ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

const eventsRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('events')
  .orderBy('chosenDate', 'asc');

const tasksRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('tasks');

const alarmsRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('alarms');

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
const date = new Date();

class CalendarScreen extends Component {
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };
  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      taskList: [],
      setEvent: '',
      editting: '',
      todayevent: [],
      alarmList: [],
      chosenDate: date,
      week: [],
      wholeList: [{title: date, data: []}],
    };
  }
  sortEvents = (date1, date2) => {
    if (date1.chosenDate.toDate() > date2.chosenDate.toDate()) {
      return -1;
    }
    if (date1.chosenDate.toDate() < date2.chosenDate.toDate()) {
      return 1;
    }
    return 0;
  };

  getEvents = async eventRetrieved => {
    try {
      eventsRef.onSnapshot(querySnapshot => {
        this.setState({eventList: []});
        this.setState({wholeList: []});
        querySnapshot.forEach(event => {
          this.state.eventList.push(event.data());
        });
        this.setState({wholeList: []});
        this.state.eventList.forEach(event => {
          if (this.state.wholeList.length > this.state.eventList.length) {
            return;
          } else if (this.state.wholeList.length === 0) {
            const date = event.chosenDate.toDate();
            console.log('date: ' + date);
            this.state.wholeList.push({
              title: event.chosenDate.toDate().toDateString(),
              data: [event],
            });
            console.log('title: ' + event.chosenDate.toDate().toDateString());
          } else if (
            this.state.wholeList.every(
              item => item.title !== event.chosenDate.toDate().toDateString(),
            )
          ) {
            console.log('added');
            this.state.wholeList.push({
              title: event.chosenDate.toDate().toDateString(),
              data: [event],
            });
            console.log('title: ' + event.chosenDate.toDate().toDateString());
          } else {
            this.state.wholeList.forEach(item => {
              if (item.title === event.chosenDate.toDate().toDateString()) {
                console.log(
                  'title: ' + item.title + ', ' + 'event: ' + item.title,
                );
                item.data.push(event);
              }
            });
          }
        });
        /* this.state.alarmList.forEach(alarm => {
          if (this.state.wholeList.length > this.state.alarmList.length) {
            return;
          } else if (this.state.wholeList.length === 0) {
            const date = alarm.chosenDate.toDate();
            console.log('date: ' + date);
            this.state.wholeList.push({
              title: alarm.chosenDate.toDate().toDateString(),
              data: [alarm],
            });
            console.log('title: ' + alarm.chosenDate.toDate().toDateString());
          } else if (
            this.state.wholeList.every(
              item => item.title !== alarm.chosenDate.toDate().toDateString(),
            )
          ) {
            console.log('added');
            this.state.wholeList.push({
              title: alarm.chosenDate.toDate().toDateString(),
              data: [alarm],
            });
            console.log('title: ' + alarm.chosenDate.toDate().toDateString());
          } else {
            this.state.wholeList.forEach(item => {
              if (item.title === alarm.chosenDate.toDate().toDateString()) {
                console.log(
                  'title: ' + item.title + ', ' + 'event: ' + item.title,
                );
                item.data.push(alarm);
              }
            });
          }
        });
        */
        this.state.wholeList.forEach(item => {
          console.log(item);
        });

        console.log('whole: ' + this.state.wholeList);
        this.state.eventList.sort(this.sortEvents);
        eventRetrieved(this.state.eventList);
      });
    } catch (error) {
      console.log('problem retrieving events');
    }
  };

  sortTasks = (date1, date2) => {
    if (date1.createdAt.toDate() > date2.createdAt.toDate()) {
      return -1;
    }
    if (date1.createdAt.toDate() < date2.createdAt.toDate()) {
      return 1;
    }
    return 0;
  };

  getTasks = async taskRetrieved => {
    try {
      tasksRef.onSnapshot(querySnapshot => {
        this.setState({taskList: []});
        querySnapshot.forEach(tasks => {
          this.state.taskList.push(tasks.data());
          //console.log("this is the event " +event.get('chosenDate').toDate());
        });
        this.state.taskList.sort(this.sortTasks);
        taskRetrieved(this.state.taskList);
      });
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  getAlarms = async alarmRetrieved => {
    try {
      alarmsRef.onSnapshot(querySnapshot => {
        this.setState({alarmList: []});
        querySnapshot.forEach(alarms => {
          this.state.alarmList.push(alarms.data());
          //console.log("this is the event " +event.get('chosenDate').toDate());
        });
        alarmRetrieved(this.state.alarmList);
        console.log('GETTING ALARMS');
      });
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  onEventsRetrieved = eventList => {
    //console.log("event list:" +eventList);
    this.setState(prevState => ({
      eventList: (prevState.eventList = eventList),
    }));
  };

  onTasksRetrieved = taskList => {
    //console.log("event list:" +eventList);
    this.setState(prevState => ({
      taskList: (prevState.taskList = taskList),
    }));
  };

  onAlarmsRetrieved = alarmList => {
    //console.log("event list:" +eventList);
    this.setState(prevState => ({
      alarmList: (prevState.alarmList = alarmList),
    }));
  };

  componentDidMount() {
    this.getEvents(this.onEventsRetrieved);
    this.getTasks(this.onTasksRetrieved);
    this.getAlarms(this.onAlarmsRetrieved);
  }
  buttonPressed(id) {
    Alert.alert(id);
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  getTodays() {
    const todayevent = this.state.eventList;
    console.log('today: ' + todayfull);

    todayevent.forEach(event => {
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();

      const markdate = year + '-' + month + '-' + day;
      console.log(markdate);
      if (markdate == todayfull) {
        this.state.todayevent.push(event);
        console.log('added to today');
        //this.state.eventList.pop(event);
        //console.log("removed from original");
      }
      console.log('before' + this.state.eventList);
      //const groupedList = this.state.eventList.groupBy(event.chosenDate);
      //console.log("after"+groupedList);
    });
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  getMarkedDates = () => {
    const marked = {};
    const mark = this.state.eventList;
    mark.forEach(event => {
      // only mark dates with data
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();

      const markdate = year + '-' + month + '-' + day;

      marked[markdate] = {marked: true};
      console.log('successfully added');
    });
    const alarm = this.state.alarmList;
    alarm.forEach(event => {
      // only mark dates with data
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();

      const markdate = year + '-' + month + '-' + day;

      marked[markdate] = {marked: true};
      console.log('successfully added');
    });
    //console.log('Marked:' +marked);
    return marked;
  };

  edittingAlarm = item => {
    const index = this.state.alarmList.indexOf(item);
    console.log('item:' + item);
    this.state.alarmList.splice(index, 1);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('alarms')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('alarms')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    //const events = firestore().collection('users').doc(user.email).collection('events').doc(item.title).delete();
    this.props.navigation.navigate('Alarm', {alarm: item});
  };

  edittingEvent = item => {
    const index = this.state.eventList.indexOf(item);
    console.log('event:' + item);
    this.state.eventList.splice(index, 1);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('events')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('events')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    //const events = firestore().collection('users').doc(user.email).collection('events').doc(item.title).delete();
    this.props.navigation.navigate('EditEvent', {event: item});
  };

  edittingTask = item => {
    const index = this.state.taskList.indexOf(item);
    console.log('task:' + item);
    this.state.taskList.splice(index, 1);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('tasks')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('tasks')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    //const events = firestore().collection('users').doc(user.email).collection('events').doc(item.title).delete();
    this.props.navigation.navigate('EditTask', {task: item});
  };

  listTasks = item => {
    const swipeBtns = [
      {
        onPress: () => {
          Alert.alert('Edit?', 'Are you sure you want to edit this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.edittingTask(item),
            },
          ]);
        },
        text: 'Edit',
        backgroundColor: '#166EE5',
      },
      {
        onPress: () => {
          Alert.alert('Delete?', 'Are you sure you want to delete this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.deleteTask(item),
            },
          ]);
        },
        text: 'Delete',
        backgroundColor: '#F0050F',
      },
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
        sensitivity={100}
        buttonWidth={50}>
        <View style={styles.item}>
          <Text style={styles.itemTitleText}>{item.title}</Text>
          <Text style={{marginLeft: 15}}>{item.note}</Text>
        </View>
      </Swipeout>
    );
  };

  listEvents = item => {
    const swipeBtns = [
      {
        onPress: () => {
          Alert.alert('Edit?', 'Are you sure you want to edit this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.edittingEvent(item),
            },
          ]);
        },
        text: 'Edit',
        backgroundColor: '#166EE5',
      },
      {
        onPress: () => {
          Alert.alert('Delete?', 'Are you sure you want to delete this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.deleteEvent(item),
            },
          ]);
        },
        text: 'Delete',
        backgroundColor: '#F0050F',
      },
    ];
    return (
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
        sensitivity={100}
        buttonWidth={50}>
        <View style={styles.item}>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
          <Text style={styles.itemTitleText}> {item.title} </Text>
          <Text style={{marginLeft: 5}}>{item.notes} </Text>
          <Text style={styles.itemHourText}>
            {item.chosenDate.toDate().getHours() > 12
              ? item.chosenDate.toDate().getHours() - 12
              : item.chosenDate.toDate().getHours()}
            :
            {item.chosenDate.toDate().getMinutes() < 10
              ? '0' + item.chosenDate.toDate().getMinutes()
              : item.chosenDate.toDate().getMinutes()}{' '}
            {item.chosenDate.toDate().getHours() > 12 ? 'pm' : 'am'}
          </Text>
        </View>
      </Swipeout>
    );
  };

  listWhole = item => {
    const swipeBtns = [
      {
        onPress: () => {
          Alert.alert('Edit?', 'Are you sure you want to edit this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.edittingEvent(item),
            },
          ]);
        },
        text: 'Edit',
        backgroundColor: '#166EE5',
      },
      {
        onPress: () => {
          Alert.alert('Delete?', 'Are you sure you want to delete this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.deleteEvent(item),
            },
          ]);
        },
        text: 'Delete',
        backgroundColor: '#F0050F',
      },
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
        sensitivity={100}
        buttonWidth={50}>
        <View style={styles.item}>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
          <Text style={styles.itemTitleText}> {item.title} </Text>
          <Text style={{marginLeft: 5}}>{item.notes} </Text>
          <Text style={styles.itemHourText}>
            {item.chosenDate.toDate().getHours() > 12
              ? item.chosenDate.toDate().getHours() - 12
              : item.chosenDate.toDate().getHours()}
            :
            {item.chosenDate.toDate().getMinutes() < 10
              ? '0' + item.chosenDate.toDate().getMinutes()
              : item.chosenDate.toDate().getMinutes()}{' '}
            {item.chosenDate.toDate().getHours() > 12 ? 'pm' : 'am'}
          </Text>
        </View>
      </Swipeout>
    );
  };

  listDay = item => {
    const date = new Date(item.title);
    return (
      <View>
        <Text style={{marginBottom: 5, marginTop: 2}}>
          {monthNames[date.getMonth()]} {date.getDate()}-{' '}
          {dayNames[date.getDay()]}
        </Text>
        <FlatList
          style={{borderRadius: 10}}
          data={item.data}
          //keyExtractor={item => item.id}
          renderItem={({item}) => {
            return this.listWhole(item);
          }}
        />
      </View>
    );
  };

  listAlarms = item => {
    const swipeBtns = [
      {
        onPress: () => {
          Alert.alert('Edit?', 'Are you sure you want to edit this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.edittingAlarm(item),
            },
          ]);
        },
        text: 'Edit',
        backgroundColor: '#166EE5',
      },
      {
        onPress: () => {
          Alert.alert('Delete?', 'Are you sure you want to delete this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.deleteAlarm(item),
            },
          ]);
        },
        text: 'Delete',
        backgroundColor: '#F0050F',
      },
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose="true"
        backgroundColor="transparent"
        sensitivity={100}
        buttonWidth={50}
        borderRadius={10}>
        <View style={styles.item}>
          <Text style={styles.itemTitleText}> {item.title} </Text>
          <Text style={{marginLeft: 5}}>{item.notes} </Text>
          <Text style={styles.itemHourText}>
            {item.chosenDate.toDate().getHours() > 12
              ? item.chosenDate.toDate().getHours() - 12
              : item.chosenDate.toDate().getHours()}
            :
            {item.chosenDate.toDate().getMinutes() < 10
              ? '0' + item.chosenDate.toDate().getMinutes()
              : item.chosenDate.toDate().getMinutes()}{' '}
            {item.chosenDate.toDate().getHours() > 12 ? 'pm' : 'am'}
          </Text>
        </View>
      </Swipeout>
    );
  };

  deleteEvent = item => {
    const index = this.state.eventList.indexOf(item);
    //console.log(index);
    console.log(item);
    this.state.eventList.splice(index, 1);
    //console.log("deleting:" +item.title);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('events')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('events')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    //const events = firestore().collection('users').doc(user.email).collection('events').where('title', '==', item.title).get();
    console.log(events);
    //this.getEvents(this.onEventsRetrieved);
    console.log('success');
  };

  deleteTask = item => {
    const index = this.state.taskList.indexOf(item);
    //console.log(index);
    console.log(item);
    this.state.taskList.splice(index, 1);
    //console.log("deleting:" +item.title);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('tasks')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('tasks')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    console.log('success');
  };

  deleteAlarm = item => {
    const index = this.state.alarmList.indexOf(item);
    //console.log(index);
    console.log(item);
    this.state.taskList.splice(index, 1);
    //console.log("deleting:" +item.title);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('alarms')
      .where('title', '==', item.title)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach(doc => {
          firestore()
            .collection('users')
            .doc(user.email)
            .collection('alarms')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    console.log('success');
  };

  showWeek = item => {
    let today = new Date(Date.now()).getDay();
    this.state.week = [];
    for (let i = 0; i < dayNames.length; i++) {
      if (today > 6) {
        today -= 7;
        this.state.week.push(dayNames[today]);
      } else {
        this.state.week.push(dayNames[today]);
      }
      today++;
    }
    const index = dayNames.indexOf(item);
    console.log(this.state.week);

    return (
      <View>
        <Text> {this.state.week[index]} </Text>
      </View>
    );
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
        <View style={styles.greyBackground}>
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
          <View style={styles.container}>
            <Notes />
            <FlatList
              data={this.state.wholeList}
              style={{}}
              renderItem={({item}) => {
                //console.log("what: "+ item.title);
                return this.listDay(item);
              }}
            />

            {/*    <FlatList*/}
            {/*  data={this.state.eventList}*/}
            {/*  keyExtractor={item => item.id}*/}
            {/*  renderItem={({item}) => {*/}
            {/*    return (this.listEvents(item)*/}
            {/*    );*/}
            {/*  }}*/}
            {/*/>*/}
            <FlatList
              data={this.state.taskList}
              style={{borderRadius: 10, marginTop: 15}}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.listTasks(item);
              }}
            />

            <FlatList
              data={this.state.alarmList}
              style={{borderRadius: 10, marginTop: 15}}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.listAlarms(item);
              }}
            />
          </View>
        </View>
        <View style={styles.plus}>
          <View>
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
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  greyBackground: {
    backgroundColor: '#ededed',
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 25,
    top: 100,
    flex: 1,
  },
  noteSection: {
    height: 50,
    fontSize: 12,
    backgroundColor: 'white',
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderRadius: 10,
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
  plus: {
    color: 'white',
    //alignItems: 'baseline',
    position: 'absolute',
    bottom: 25,
    marginLeft: 340,
  },
  plusImage: {
    width: 60,
    height: 60,
  },
  header: {
    fontSize: 25,
  },
});

export default CalendarScreen;
