
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

const user = [{"email": ''}];
if(firebase.auth().currentUser !== null){
    const currentUser = firebase.auth().currentUser;
    user.email= currentUser.email;
}

const ref = firestore()
    .collection('users')
    .doc(user.email)
    .collection('tasks');

class task extends React.Component {
    state = {
        list:[],
        taskList: [],
        setTask: '',
        task: '',
        title: '',
        note: '',
    };
    addTask = async (title, note) => {
        try {
            const date = new Date(Date.now());
            console.log("date: " + date);
            await ref.add({
                title: title,
                note: note,
                createdAt: date,
                complete: false,
            });
        } catch (error) {
            console.log('addTask failed');
        }
        this.setState({title: ''});
        this.setState( {note: ''});
        this.props.navigation.navigate('Tasks');

    };

    render() {
        return (
            <View style={styles.container}>
                    <Hoshi
                        style={styles.card1}
                        placeholder={task.title}
                        label={'Enter Title'}
                        onChangeText={title => this.setState({title})}
                        value={this.state.title}
                        borderColor={'#2E68FF'}
                        maskColor={'#blue'}
                    />
                    <Hoshi
                        style={styles.card1}
                        placeholder={task.title}
                        label={'Enter Task Name'}
                        onChangeText={note => this.setState({note})}
                        value={this.state.note}
                        borderColor={'#2E68FF'}
                        maskColor={'#blue'}
                    />
                    <AwesomeButtonBlue
                        width={75}
                        title="addTitle"
                        onPress={() => this.addTask(this.state.title, this.state.note)}>
                        Add
                    </AwesomeButtonBlue>
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

export default task;


