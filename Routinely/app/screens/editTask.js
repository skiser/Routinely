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
  ListRenderItem,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
const user = firebase.auth().currentUser;
const ref = firestore()
    .collection('users')
    .doc(user.email)
    .collection('tasks');

class editTasksScreen extends React.Component {
  state = {
    list:[],
    taskList: [],
    setTask: '',
    task: '',
  };
  addTask = async task => {
    try {
      await ref.add({
        title: task,
        complete: false,
      });
    } catch (error) {
      console.log('addTask failed');
    }
    this.setState({task: ''});
    this.props.navigation.navigate('Calendar', {task: task});

  };

  getTasks = taskRetrieved => {
    try {
    //this.state.taskList=[];
      ref.onSnapshot(querySnapshot => {
        querySnapshot.forEach(task => {
          console.log("data"+task.data());
          this.state.taskList.push(task.data());
        });
        taskRetrieved(this.state.taskList);
      });
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  onTasksRetrieved = taskList => {
//console.log("tasks: "+taskList);
    this.setState(prevState => ({
      taskList: (prevState.taskList = taskList),
    }));
  };

  componentDidMount() {
    this.getTasks(this.onTasksRetrieved);
  }
  render() {
    const task = this.props.navigation.getParam('task');
    return (
        <View style={styles.container}>
          <View style={styles.inputRow}>
            <Hoshi
                style={styles.card1}
                placeholder={task.title}
                label={'Enter Task Name'}
                onChangeText={task => this.setState({task})}
                value={this.state.task}
                borderColor={'#2E68FF'}
                maskColor={'#blue'}
            />
            <AwesomeButtonBlue
                width={75}
                title="addTitle"
                onPress={() => this.addTask(this.state.task)}>
              Add
            </AwesomeButtonBlue>
          </View>
          <FlatList
              data={this.state.taskList}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
//console.log("item " +item);
                return <Text style={styles.tasks}> {item.title}</Text> ;
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

export default editTasksScreen;
