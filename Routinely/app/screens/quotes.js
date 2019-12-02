
import React from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import iquotes from 'iquotes';
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
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

const date = new Date();
const month = date.getMonth() + 1; //months from 1-12
const day = date.getDate();
const year = date.getFullYear();

const originaldate = year + '-' + month + '-' + day;

const quote = iquotes.random();

const quotesRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('quotes');

class quoteScreen extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      quoteList: [],
      todaysquote: '',
      todaysauthor: '',
      date: originaldate,
      quote: quote,
    };
    }

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

    getQuoteList = async QuoteRetrieved =>{
        quotesRef.onSnapshot(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                this.writeQuote();
                this.getQuoteList();
            } 
            snapshot.forEach(doc => {
                this.state.quoteList.push(doc.data());
            });
            QuoteRetrieved(this.state.quoteList);
            console.log(this.state.quoteList);

        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

    }

    onQuoteRetrieved = quoteList => {
        //console.log("event list:" +eventList);
        this.setState(prevState => ({
            quoteList: (prevState.quoteList = quoteList),
        }));
    };

    componentDidMount() {
        this.getQuoteList(this.onQuoteRetrieved);
    }

    getTodaysquote(){
        this.state.quoteList.forEach(item => {
              if (item.date === this.state.date) {
                  this.state.todaysquote = item.quote;
                  console.log("this is the quote for today"+this.state.todaysquote.author);
                  this.state.todaysauthor = item.quote.author;
              }
              else{
                  this.writeQuote();
              }
            });
    }
    

    render() { 
        this.getTodaysquote();
        return (
            <View>
                <Text style={styles.tasks}> Quote of the Day:</Text>
                <Text style={styles.tasks}> {this.state.todaysquote.quote} </Text>
                <Text style={styles.tasks}> Author: {this.state.todaysquote.author} </Text>
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

export default quoteScreen;


