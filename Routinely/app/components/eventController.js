import React, { Component } from 'react';
import { AppRegistry, Text, View, TextInput, StyleSheet, Button, SafeAreaView, Image, TouchableHighlight} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import moment from 'moment';

const utcDateToString = (momentInUTC: moment): string => {
  let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  // console.warn(s);
  return s;
};

export default class eventController extends Component{
    state = {
        title: "",
       /*  startTime: "",
        endTime: "",
        notes: "",
        backgroundColor: "green",
        tintColor: "orange",
        titleColor: "blue", */
    }

}