import React, {Component} from 'react';
import {View, StyleSheet, Button, Text, Image} from 'react-native';
import DisplayTime from '../components/alarmRinging_components/DisplayTime';
import AwesomeButtonBlue from 'react-native-really-awesome-button/src/themes/c137';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

class AlarmRingingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: true,
      relativePath: 'https://www.weatherbit.io/static/img/icons/',
      png: '.png',
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
          weatherConditionsNowCode: responseJson.data[0].weather.icon,
          weatherNowIconLink:
            this.state.relativePath +
            responseJson.data[0].weather.icon +
            this.state.png,
          temperature6Hrs: responseJson.data[5].temp,
          precipitation6Hrs: responseJson.data[5].precip,
          weatherConditions6Hrs: responseJson.data[5].weather.description,
          weatherConditions6HrsCode: responseJson.data[5].weather.icon,
          weather6HrsIconLink:
            this.state.relativePath +
            responseJson.data[5].weather.icon +
            this.state.png,
          temperature12Hrs: responseJson.data[11].temp,
          precipitation12Hrs: responseJson.data[11].precip,
          weatherConditions12Hrs: responseJson.data[11].weather.description,
          weatherConditions12HrsCode: responseJson.data[11].weather.icon,
          weather12HrsIconLink:
            this.state.relativePath +
            responseJson.data[11].weather.icon +
            this.state.png,
        });
        console.log('Now', this.state.weatherNowIconLink);
        console.log('6Hr', this.state.weather6HrsIconLink);
        console.log('12Hr', this.state.weather12HrsIconLink);
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
            <Image
              style={styles.img}
              source={{uri: this.state.weatherNowIconLink}}
            />
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
            <Image
              style={styles.img}
              source={{uri: this.state.weather6HrsIconLink}}
            />
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
            <Image
              style={styles.img}
              source={{uri: this.state.weather12HrsIconLink}}
            />
            <Text style={styles.conditions}>
              {this.state.weatherConditions12Hrs}
            </Text>
            <Text style={styles.temp}>Temp {this.state.temperature12Hrs}</Text>
            <Text style={styles.rain}>
              Rain: {this.state.precipitation12Hrs}%
            </Text>
          </View>
        </View>
        <AwesomeButtonRick
          width={250}
          title="DisableAlarm"
          style={styles.TurnOff}
          onPress={() => this.props.navigation.navigate('Calendar')}>
          Turn Off
        </AwesomeButtonRick>
        <AwesomeButtonBlue
          width={250}
          title="DisableAlarm"
          style={styles.TurnOff}
          onPress={() => this.props.navigation.navigate('Alarm')}>
          Snooze
        </AwesomeButtonBlue>
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
    marginLeft: 30,
    marginRight: 30,
  },
  forecast: {
    textAlign: 'center',
    flexDirection: 'column',
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  time: {
    textAlign: 'center',
    fontSize: 14,
  },
  temp: {
    textAlign: 'center',
    fontSize: 16,
  },
  rain: {
    textAlign: 'center',
    fontSize: 16,
  },
  conditions: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 3,
  },
  img: {
    width: 80,
    height: 80,
  },
  TurnOff: {
    display: 'flex',
    alignContent: 'center',
    marginLeft: 80,
    marginTop: 10,
  },
});

export default AlarmRingingScreen;
