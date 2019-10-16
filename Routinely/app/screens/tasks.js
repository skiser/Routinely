import React from 'react';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {TextInput, Text, FlatList, Button, View, StyleSheet, ListRenderItem} from 'react-native';
const ref = firestore().collection('users/bsoto/tasks');
class tasks extends React.Component{

    state = {
            taskList: [],
            setTask: '',
            task: '',
    };
    addTask = async (task) => {
        try{
            await ref.add({
                title: task,
                complete: false,
            });

        }
        catch(error) {
            console.log("addTask failed")
        }
        this.setState({task: ''})

    };

    getTasks = async (taskRetrieved) => {
        try {
            const snapshot = await ref.get();
            snapshot.forEach(task => {
                this.state.taskList.push(task.data());
            });
            taskRetrieved(this.state.taskList);
        }
        catch (error){
            console.log("problem retrieving tasks")
        }
    };

    onTasksRetrieved = (taskList) => {
        console.log(taskList);
        this.setState(prevState => ({
            taskList: prevState.taskList = taskList
        }));
    };

    componentDidMount() {
        this.getTasks(this.onTasksRetrieved);
    }

    render() {
        return (
            <View>
            <FlatList
                data = {this.state.taskList}
                keyExtractor = {(item) => item.id}
                renderItem={({item}) => {
                    console.log(item);
                    return (
                        <Text> {item.title}</Text>
                    )
                }

                }
            />
            <TextInput
                style = {styles.container}
                placeholder="Enter Password"
                onChangeText={task => this.setState({task})}
                value={this.state.task}
            />
            <Button
                title= "add task"
                onPress={() => this.addTask(this.state.task)}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:100
    }
});

export default tasks;