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
  Button,
  TouchableOpacity,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import {HeaderTitle} from 'react-navigation-stack';

const user = [{email: ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

class notes extends React.Component {
  state = {
    list: [],
    noteList: [],
    setNote: '',
    note: '',
  };
  addNote = async note => {
    try {
      await ref.add({
        title: note,
        complete: false,
      });
    } catch (error) {
      console.log('addNote failed');
    }
    this.setState({note: ''});
  };
  getNotes = noteRetrieved => {
    try {
      //this.state.noteList=[];
      ref.onSnapshot(querySnapshot => {
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
  onNotesRetrieved = noteList => {
    //console.log("notes: "+noteList);
    this.setState(prevState => ({
      noteList: (prevState.noteList = noteList),
    }));
  };
  componentDidMount() {
    this.getNotes(this.onNotesRetrieved);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.card1}
            onChangeText={note => this.setState({note})}
            value={this.state.note}
            multiline
            numberOfLines={36}
          />
          <AwesomeButtonBlue
            width={70}
            title="addTitle"
            onPress={() => this.addNote(this.state.note)}>
            SAVE
          </AwesomeButtonBlue>
        </View>
        <FlatList
          data={this.state.noteList}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            //console.log("item " +item);
            return <Text style={styles.notes}> {item.title}</Text>;
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
