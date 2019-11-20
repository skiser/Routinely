
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


class quoteScreen extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = {
      quotes: '',
    };
  }

    getQuotes = async quotesRetrieved => {
        this.state.quotes = iquotes.random();
        console.log(this.state.quotes);
        quotesRetrieved(this.state.quotes);

    }

    onQuotesRetrieved = quotes => {
        //console.log("event list:" +eventList);
        this.setState(prevState => ({
            quotes: (prevState.quotes = quotes),
        }));
    };

    componentDidMount() {
        this.getQuotes(this.onQuotesRetrieved);
    }

    render() {
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


