
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

    getQuoteList = async QuoteRetrieved => {
       try{ 
        quotesRef.onSnapshot(snapshot => {
            this.setState({quoteList: []});
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
            this.state.quoteList.forEach(item => {
                if (item.date === this.state.date) {
                    console.log("matches date");
                }
                else{
                    console.log("no quote");
                    this.writeQuote();
                    this.getQuoteList();
                }
            });
        });
        }catch(err) {
            console.log('Error getting documents', err);
        };

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
                console.log("no quote");
                this.writeQuote();
            }
        });
    }
    

    render() { 
        this.getTodaysquote();
        return (
            <View>
                <Text style={styles.quoteTitle}> Quote of the Day:</Text>
                <Text style={styles.quote}> {this.state.todaysquote.quote} </Text>
                <Text style={styles.quoteTitle}> Author: </Text>
                <Text style={styles.quote}> {this.state.todaysquote.author} </Text>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    quoteTitle: {
        fontSize: 25,
        marginTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
    },
    quote: {
        fontSize: 20,
        marginTop: 15,
        paddingRight: 10,
        paddingLeft: 10,
    },
});

export default quoteScreen;