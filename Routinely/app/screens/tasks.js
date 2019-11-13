import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';

import {
  TextInput,
  RefreshControl,
  Text,
  FlatList,
  View,
  StyleSheet,
  ListRenderItem, TouchableHighlight, Image, Alert,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import Swipeout from 'react-native-swipeout'

const user = [{"email": ''}];
if(firebase.auth().currentUser !== null){
  const currentUser = firebase.auth().currentUser;
  user.email= currentUser.email;
}

const ref = firestore()
    .collection('users')
    .doc(user.email)
    .collection('tasks');
const date = new Date();

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

class tasks extends React.Component {
  state = {
    list:[],
    taskList: [],
    setTask: '',
    task: '',
    sortedDates:[],
    createdAt: date,
  };
  date_sort_asc =  (date1, date2) =>{
    if (date1 > date2) return 1;
    if (date1 < date2) return -1;
    return 0;
  };

  sortTasks =  (date1, date2) =>{
    if (date1.createdAt.toDate() > date2.createdAt.toDate()) return -1;
    if (date1.createdAt.toDate() < date2.createdAt.toDate()) return 1;
    return 0;
  };

  getTasks = async taskRetrieved => {
    try {
      ref.onSnapshot(querySnapshot => {
        this.setState({taskList: []});
        this.setState({sortedDates: []});
        querySnapshot.forEach(tasks => {
          this.state.taskList.push(tasks.data());
        });
        this.state.taskList.forEach(task => {
            this.state.sortedDates.push(task.createdAt.toDate());}
        );
        this.state.taskList.sort(this.sortTasks);
        this.state.sortedDates.sort(this.date_sort_asc);

        this.state.sortedDates.forEach(date => {
          console.log("sorted: "+ dayNames[date.getDay()]);
        });

        taskRetrieved(this.state.taskList);
      });
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  deleteTask = async item => {
    const index = this.state.taskList.indexOf(item);
    console.log("title: " + item);
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
            firestore().collection('users').doc(user.email).collection('tasks').doc(doc.id).delete();
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    console.log("success");
  };

  editTask = item => {};

  onTasksRetrieved = taskList => {
    this.setState(prevState => ({
      taskList: (prevState.taskList = taskList),
    }));
  };

  componentDidMount() {
    this.getTasks(this.onTasksRetrieved);
  };

  addTasks(){
    this.props.navigation.navigate('Task');
  }

  listTasks = item =>  {
    const swipeBtns = [
      {
        onPress: (item) => {this.editTask(item)},
        text: 'Edit',
        backgroundColor: '#166EE5',
      },
      {
        onPress: () => {
          Alert.alert(
              'Delete?',
              'Are you sure you want to delete this item?',
              [
                {
                  text: 'No', onPress: () =>
                      console.log('cancelled')

                },
                {
                  text: 'Yes', onPress: () =>
                      this.deleteTask(item)
                }
              ]
          )
        },
        text: 'Delete',
        backgroundColor: '#F0050F',
      }
    ];

    return (
        <Swipeout
            right = {swipeBtns}
            autoClose="true"
            backgroundColor="transparent"
            sensitivity={100}
            buttonWidth={50}>
          <View>
            <Text style={styles.tasks}> {item.title} </Text>
          </View>
        </Swipeout>
    );
  };

  render() {

    return (
        <View style={styles.container}>
          <View style={styles.inputRow}>
            <AwesomeButtonBlue
                width={75}
                title="addTitle"
                onPress={() => this.addTasks()}>
              Add
            </AwesomeButtonBlue>
          </View>
          <FlatList
              data={this.state.taskList}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return this.listTasks(item)
              }}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 25,
  },
  card1: {
    paddingVertical: 16,
    width: 275,
  },
  tasks: {
    fontSize: 25,
    marginTop: 15,
  },
});

export default tasks;
