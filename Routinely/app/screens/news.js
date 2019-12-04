import React, {Component} from 'react';
import {View, StyleSheet, Button, Text, Image, Alert} from 'react-native';
import DisplayTime from '../components/alarmRinging_components/DisplayTime';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/c137';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import {getArticles} from '../services/news-service';
import {NewsItem} from '../components/newsItem';
import {List} from 'native-base';

class NewsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            loading: true,
            png: '.png',
            data: null,

        };
    }

    componentDidMount(){
        getArticles().then(data => {
            this.setState({data: data});
            console.log(data);
        }, error => {
            Alert.alert('Error', 'something went wrong! '+ error)
        }
        )
    }

    render() {
        return (
            <View>
               <List
               dataArray={this.state.data}
               renderRow={(item) => {
                   return <NewsItem data={item}/>
               }}
               />
            
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default NewsScreen;
