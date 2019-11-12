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
  ListRenderItem, TouchableHighlight, Image,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import Swipeout from 'react-native-swipeout'

const user = firebase.auth().currentUser;

const ref = firestore()
    .collection('users')
    .doc(user.email)
    .collection('tasks');

class tasks extends React.Component {
  state = {
    list:[],
    taskList: [],
    setTask: '',
    task: '',
  };

  getTasks = async taskRetrieved => {
    try {
      ref.onSnapshot(querySnapshot => {
        console.log(querySnapshot);
        this.setState({taskList: []});
        querySnapshot.forEach(tasks => {
          console.log("data: " +tasks.data());
          this.state.taskList.push(tasks.data());
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
        onPress: () => {this.deleteTask(item)},
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
