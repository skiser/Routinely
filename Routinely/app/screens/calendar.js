import React, {Component} from 'react';
import {Alert, Button, FlatList, Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';
import {AgendaList, CalendarProvider, ExpandableCalendar,} from 'react-native-calendars';
import _ from 'lodash';
import moment from 'moment';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {Divider} from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Notes from 'Routinely/app/components/calendar_components/Notes.js';
import iquotes from 'iquotes';
import DropdownMenu from 'react-native-dropdown-menu';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";


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

const quote = iquotes.random();


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

const signRef = firestore()
  .collection('users')
  .doc(user.email);

const quotesRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('quotes');

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
      sign: '',
      isLoading: true,
      data: '',
      quoteList: [],
      todaysquote: '',
      todaysauthor: '',
      date: todayfull,
      quote: quote,
      text: '',
      ofday: true,
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
            this.state.wholeList.push({
              title: event.chosenDate.toDate().toDateString(),
              data: [event],
            });
          } else if (
            this.state.wholeList.every(
              item => item.title !== event.chosenDate.toDate().toDateString(),
            )
          ) {
            this.state.wholeList.push({
              title: event.chosenDate.toDate().toDateString(),
              data: [event],
            });
          } else {
            this.state.wholeList.forEach(item => {
              if (item.title === event.chosenDate.toDate().toDateString()) {
                item.data.push(event);
              }
            });
          }
        });
        this.state.wholeList.forEach(item => {
        });
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
        });
        alarmRetrieved(this.state.alarmList);
      });
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  getSign = ()=> {
    let getSign = signRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState({sign:doc.data()})
          console.log(this.state.sign.sign);
          this.getHoroscope();
         }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
  };

  getHoroscope = () =>{
    fetch('https://horoscope-free-api.herokuapp.com/?time=today&sign='+this.state.sign.sign)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading:false,
                data:responseJson.data
            }, function(){
        
            });
            console.log("horoscope: " +this.state.data + " sign: " + this.state.sign.sign);
            //oroscopeRetrieved(this.state.data);
        })
        .catch((error) => {
            console.error(error);
        });

  };

  onEventsRetrieved = eventList => {
    this.setState(prevState => ({
      eventList: (prevState.eventList = eventList),
    }));
  };

  onTasksRetrieved = taskList => {
    this.setState(prevState => ({
      taskList: (prevState.taskList = taskList),
    }));
  };

  onAlarmsRetrieved = alarmList => {
    this.setState(prevState => ({
      alarmList: (prevState.alarmList = alarmList),
    }));
  };

  onSignRetrieved = sign => {
    this.setState(prevState => ({
      sign: (prevState.sign = sign),
    }));
  };

  writeQuote = () =>{
    try{
    quotesRef.doc().set({
        quote: this.state.quote,
        date: this.state.date,
    })
    }
    catch(error){
        console.log('addQuote failed');
    }
  };

  getQuoteList = () => {
    try{ 
    quotesRef.onSnapshot(snapshot => {
        this.setState({quoteList: []});
        if (snapshot.empty) {
            console.log('No matching documents.');
            this.writeQuote();
            this.getQuoteList();
        } 
        snapshot.forEach(doc => {
            this.state.quoteList.push(doc.data());
        });
        console.log(this.state.quoteList);
    });
    }catch(err) {
        console.log('Error getting documents', err);
    };

  };

  onQuoteRetrieved = quoteList => {
    //console.log("event list:" +eventList);
    this.setState(prevState => ({
        quoteList: (prevState.quoteList = quoteList),
    }));
  };

  componentDidMount() {
    this.getEvents(this.onEventsRetrieved);
    this.getTasks(this.onTasksRetrieved);
    this.getAlarms(this.onAlarmsRetrieved);
    this.getSign();
    this.getQuoteList(this.onQuoteRetrieved);
  };

  buttonPressed(id) {
    Alert.alert(id);
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  getTodays() {
    const todayevent = this.state.eventList;

    todayevent.forEach(event => {
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();

      const markdate = year + '-' + month + '-' + day;
      if (markdate == todayfull) {
        this.state.todayevent.push(event);
      }
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

      marked[markdate] = {marked: true, dotColor: '#6096FD'};
      console.log('successfully added');
    });
    const alarm = this.state.alarmList;
    alarm.forEach(event => {
      // only mark dates with data
      const month = event.chosenDate.toDate().getUTCMonth() + 1; //months from 1-12
      const day = event.chosenDate.toDate().getUTCDate();
      const year = event.chosenDate.toDate().getUTCFullYear();

      const markdate = year + '-' + month + '-' + day;

      marked[markdate] = {marked: true, dotColor: '#F3AE42'};
      console.log('successfully added');
    });
    return marked;
  };

  edittingAlarm = item => {
    const index = this.state.alarmList.indexOf(item);
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
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    const eventdate = yyyy + '-' + mm + '-' + dd;


    this.getTodaysquote();
    
    const today = new Date();
    const dd2 = String(today.getDate()).padStart(2, '0');
    const mm2 = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy2 = today.getFullYear();
    const todayfull = yyyy2 + '-' + mm2 + '-' + dd2;

    console.log(eventdate);

    const daily = <MenuProvider style={{ flexDirection: "column", padding: 5 }}>
        <Menu onSelect={value => alert(`${value}`)}>
          <MenuTrigger  >
          <Text style={styles.headerText}>Todays Quote/Horoscope</Text>
          </MenuTrigger  >

          <MenuOptions>
            <MenuOption value={this.state.todaysquote.quote}>
              <Text style={styles.menuContent}>Quote</Text>
            </MenuOption>
            <MenuOption value={this.state.data}>
              <Text style={styles.menuContent}>Horoscope</Text>
            </MenuOption>
          </MenuOptions>

        </Menu>
        </MenuProvider>;

    let message = null; 
    if(eventdate === todayfull){
      message = daily;
    }
    else{
      message = null;
    }


    return (
      <View>
        <Text
          style={{
            marginBottom: 5,
            marginTop: 5,
            paddingTop: 5,
            backgroundColor: '#FFFFFF',
          }}>
          {monthNames[date.getMonth()]} {date.getDate()}{' '}
          {dayNames[date.getDay()]}
        </Text>
        <View>
          {message}
        </View>
        

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
  };

  deleteTask = item => {
    const index = this.state.taskList.indexOf(item);
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
    console.log('success');
  };

  deleteAlarm = item => {
    const index = this.state.alarmList.indexOf(item);
    this.state.taskList.splice(index, 1);
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

  
  getTodaysquote(){
        this.state.quoteList.forEach(item => {
            if (item.date === this.state.date) {
                this.state.todaysquote = item.quote;
                //console.log("this is the quote for today"+this.state.todaysquote.author);
                this.state.todaysauthor = item.quote.author;
            }
            else{
              this.state.todaysquote = this.state.quote;
              this.state.todaysauthor = this.state.quote.author;
            }
        });
  }

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
                return this.listDay(item);
              }}
            />
            <FlatList
              data={this.state.taskList}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.listTasks(item);
              }}
            />

            <FlatList
              data={this.state.alarmList}
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
    borderRadius: 0,
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
  headerText: {
    fontSize: 15,
    margin: 10,
    fontWeight: "bold",
    height: 50,
    bottom: 5,
  },
  menuContent: {
    color: "#000",
    padding: 2,
    fontSize: 10,
    width: 400,
  }
});

export default CalendarScreen;
