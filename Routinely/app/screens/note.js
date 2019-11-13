
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

const notesRef = firestore()
      .collection('users')
      .doc(user.email)
      .collection('notes');

class note extends React.Component {
    state = {
        list:[],
        noteList: [],
        setNote: '',
        note: '',
        title: '',
    };
    addNote = async note => {
    try {
      notesRef
      .doc()
      .set({
        title: this.state.note,
        complete: false,
      })

    } catch (error) {
      console.log('addNote failed');
    }
    this.setState({note: ''});
    this.props.navigation.navigate('Notes');
  };

    render() {
        return (
            <View style={styles.container}>
                    <Hoshi
                        style={styles.card1}
                        placeholder={note.title}
                        label={'Enter Note'}
                        onChangeText={note => this.setState({note})}
                        value={this.state.note}
                        borderColor={'#2E68FF'}
                        maskColor={'#blue'}
                    />
                    <AwesomeButtonBlue
                        width={75}
                        title="addTitle"
                        onPress={() => this.addNote(this.state.note)}>
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

export default note;


