import React, {Component} from 'react';
import {View, Button, Platform, UIManager} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class TimePicker extends Component {
  state = {
    date: new Date('2020-06-12T14:42:42'),
    mode: 'date',
    show: false,
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };
  componentDidMount() {
    this.time;
  }
  render() {
    const {show, date, mode} = this.state;

    return (
      <View>
        <View>
          <Button onPress={this.datepicker} title="Show  Date" />
        </View>
        <View>
          <Button onPress={this.timepicker} title="Select Time" />
        </View>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.setDate}
          />
        )}
      </View>
    );
  }
}
