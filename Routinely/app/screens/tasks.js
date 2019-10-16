import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import {
  TextInput,
  Text,
  FlatList,
  View,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';

const ref = firestore()
  .collection('users')
  .doc('cteichmann')
  .collection('tasks');

class tasks extends React.Component {
  state = {
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
  };

  getTasks = async taskRetrieved => {
    try {
      const snapshot = await ref.get();
      snapshot.forEach(task => {
        this.state.taskList.push(task.data());
      });
      taskRetrieved(this.state.taskList);
    } catch (error) {
      console.log('problem retrieving tasks');
    }
  };

  onTasksRetrieved = taskList => {
    console.log(taskList);
    this.setState(prevState => ({
      taskList: (prevState.taskList = taskList),
    }));
  };

  componentDidMount() {
    this.getTasks(this.onTasksRetrieved);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Hoshi
            style={styles.card1}
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
            console.log(item);
            return <Text> {item.title}</Text>;
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
});

export default tasks;
