import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/blue';
import {
  Alert,
  TextInput,
  RefreshControl,
  Text,
  FlatList,
  View,
  StyleSheet,
  ListRenderItem,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import {HeaderTitle} from 'react-navigation-stack';
import Swipeout from 'react-native-swipeout';

const user = [{email: ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

const notesRef = firestore()
      .collection('users')
      .doc(user.email)
      .collection('notes');

class notes extends React.Component {
  state = {
    list: [],
    noteList: [],
    setNote: '',
    note: '',
  };
  onNotesRetrieved = noteList => {
    this.setState(prevState => ({
      noteList: (prevState.noteList = noteList),
    }));
  };

  componentDidMount() {
    this.getNotes(this.onNotesRetrieved);
  };

  addNote(){
    this.props.navigation.navigate('Note');
  }
  getNotes = noteRetrieved => {
    try { 
      //this.state.noteList=[];
      notesRef.onSnapshot(querySnapshot => {
        this.setState({noteList: []});
        querySnapshot.forEach(note => {
          console.log('data' + note.data());
          this.state.noteList.push(note.data());
        });
        noteRetrieved(this.state.noteList);
      });
    } catch (error) {
      console.log('problem retrieving notes');
    }
  };

  editNote = item => {
    const index = this.state.noteList.indexOf(item);
    console.log('item:' + item);
    this.state.noteList.splice(index, 1);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('notes')
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
            .collection('notes')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    //const events = firestore().collection('users').doc(user.email).collection('events').doc(item.title).delete();
    this.props.navigation.navigate('Note', {note: item});
  };

  deleteNote = item => {
    const index = this.state.noteList.indexOf(item);
    //console.log(index);
    console.log(item);
    this.state.noteList.splice(index, 1);
    //console.log("deleting:" +item.title);
    let query = firestore()
      .collection('users')
      .doc(user.email)
      .collection('notes')
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
            .collection('notes')
            .doc(doc.id)
            .delete();
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    console.log('success');
  };

  listNotes = item => {
    const swipeBtns = [
      {
        onPress:  () => {
          Alert.alert('Edit?', 'Are you sure you want to edit this item?', [
            {
              text: 'No',
              onPress: () => console.log('cancelled'),
            },
            {
              text: 'Yes',
              onPress: () => this.editNote(item),
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
              onPress: () => this.deleteNote(item),
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
          <Text style={styles.itemTitleText}> {item.title} </Text>
        </View>
      </Swipeout>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <AwesomeButtonBlue
            width={70}
            title="addTitle"
            onPress={() => this.addNote()}>
            Add A Note
          </AwesomeButtonBlue>
        </View>
        <FlatList
          data={this.state.noteList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return this.listNotes(item);
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
  notes: {
    fontSize: 25,
    marginTop: 15,
  },
});

export default notes;
