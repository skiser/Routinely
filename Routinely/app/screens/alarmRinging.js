import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import DisplayTime from '../components/alarmRinging_components/DisplayTime';

class AlarmRingingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: true,
    };
  }
  componentDidMount(): void {
    fetch(
      'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?lang=en&hours=12&units=I&lat=39.9625984&lon=-76.727745',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
          'x-rapidapi-key':
            '9f78f19a5fmshb5fb8f8cf101477p17766bjsne3fe3b3d556f',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.city_name);
        this.setState({
          loading: false,
          dataSource: responseJson,
          city: responseJson.city_name,
          state: responseJson.state_code,
          temperatureNow: responseJson.data[0].temp,
          precipitationNow: responseJson.data[0].precip,
          weatherConditionsNow: responseJson.data[0].weather.description,

          temperature6Hrs: responseJson.data[5].temp,
          precipitation6Hrs: responseJson.data[5].precip,
          weatherConditions6Hrs: responseJson.data[5].weather.description,

          temperature12Hrs: responseJson.data[11].temp,
          precipitation12Hrs: responseJson.data[11].precip,
          weatherConditions12Hrs: responseJson.data[11].weather.description,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }
  render() {
    return (
      <View>
        <DisplayTime />
        <Text style={styles.location}>
          {this.state.city}, {this.state.state}
        </Text>
        <View style={styles.row}>
          <View style={styles.forecast}>
            <Text style={styles.time}>Right Now</Text>
            <Text style={styles.conditions}>
              {this.state.weatherConditionsNow}
            </Text>
            <Text style={styles.temp}>Temp {this.state.temperatureNow}</Text>
            <Text style={styles.rain}>
              Rain: {this.state.precipitationNow}%
            </Text>
          </View>
          <View style={styles.forecast}>
            <Text style={styles.time}>6 Hrs</Text>
            <Text style={styles.conditions}>
              {this.state.weatherConditions6Hrs}
            </Text>
            <Text style={styles.temp}>Temp {this.state.temperature6Hrs}</Text>
            <Text style={styles.rain}>
              Rain: {this.state.precipitation6Hrs}%
            </Text>
          </View>
          <View style={styles.forecast}>
            <Text style={styles.time}>12 Hrs</Text>
            <Text style={styles.conditions}>
              {' '}
              {this.state.weatherConditions12Hrs}
            </Text>
            <Text style={styles.temp}>Temp {this.state.temperature12Hrs}</Text>
            <Text style={styles.rain}>
              Rain: {this.state.precipitation12Hrs}%
            </Text>
          </View>
        </View>
        <Button
          title="Calendar"
          onPress={() => this.props.navigation.navigate('Calendar')}
        />
        <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  forecast: {
    textAlign: 'center',
    flexDirection: 'column',
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  time: {
    textAlign: 'center',
    fontSize: 12,
  },
  temp: {
    textAlign: 'center',
    fontSize: 14,
  },
  rain: {
    textAlign: 'center',
    fontSize: 14,
  },
  conditions: {
    textAlign: 'center',
    fontSize: 12,
      paddingBottom: 3,
      paddingTop: 3,
  },
});

export default AlarmRingingScreen;
