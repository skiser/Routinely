
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
import { useMyuseQuoteOfTheDayHook } from '@uhl7792/react-use-quote-of-the-day'
 

const user = [{"email": ''}];

const date = new Date();
const month = date.getMonth() + 1; //months from 1-12
const day = date.getDate();
const year = date.getFullYear();

const originaldate = year + '-' + month + '-' + day;

const quote = iquotes.random();

class quoteScreen extends React.Component {
    
    

    constructor(props) {
    super(props);
    this.state = {
      quotes: quote,
      original: originaldate,
    };
    }
    

    /* getQuotes = () => {
        const month = this.state.quotes.date.getMonth() + 1; //months from 1-12
            const day = this.state.quotes.date.getDate();
            const year = this.state.quotes.date.getFullYear();
            const quotedate = year + '-' + month + '-' + day;
            console.log(quotedate+" and "+this.state.today);
            if (quotedate == this.state.today){
                return;
            }
            else{
                this.setState(this.state.quotes = iquotes.random());
                console.log(this.state.quotes);
                this.state.quotes.date = new Date();

            }
    
    }

    componentDidMount() {
        this.getQuotes();
    
    }*/

    render() {
        const today = new Date();
        const month = today.getMonth() + 1; //months from 1-12
        const day = today.getDate();
        const year = today.getFullYear();
        const newdate = year + '-' + month + '-' + day;
        console.log(newdate+" and "+this.state.original);
        
        if (newdate != this.state.original){
            this.state.quote = iquotes.random();
        }

        return (
            <View>
                <Text style={styles.tasks}> Quote of the Day:</Text>
                <Text style={styles.tasks}> {this.state.quotes.quote} </Text>
                <Text style={styles.tasks}> Author: {this.state.quotes.author} </Text>
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


