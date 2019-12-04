import React, {Component} from 'react';
import {View, StyleSheet, Button, Text, Image, AppRegistry} from 'react-native';

export default class WeatherToday extends Component {
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
      'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?units=I&lang=en&lat=39.9625984&lon=-76.727745',
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
          temperature1Day: responseJson.data[0].temp,
          temperature1Night: responseJson.data[3].temp,
          precipitation1: responseJson.data[0].precip,
          weatherConditions1: responseJson.data[0].weather.description,
          weatherConditions1Code: responseJson.data[0].weather.icon,
          weather1IconLink:
            this.state.relativePath +
            responseJson.data[0].weather.icon +
            this.state.png,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          <Image
            style={styles.img}
            source={{uri: this.state.weather1IconLink}}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.conditions}>
              {this.state.weatherConditions1}
            </Text>
            <Text style={styles.tempHL}>
              H <Text style={styles.temp}>{this.state.temperature1Day}</Text>
            </Text>
            <Text style={styles.tempHL}>
              L <Text style={styles.temp}>{this.state.temperature1Night}</Text>
            </Text>
            <Text style={styles.rain}>Rain: {this.state.precipitation1}%</Text>
          </View>
        </View>
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
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  forecast: {},
  temp: {
    fontSize: 16,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  tempHL: {
    marginTop: 20,
    paddingLeft: 10,
    fontSize: 14,
  },
  rain: {
    fontSize: 16,
    paddingLeft: 20,
    marginTop: 20,
  },
  conditions: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    marginTop: 5,
    marginLeft: 5,
    width: 50,
    height: 50,
  },
});

AppRegistry.registerComponent('WeatherToday', () => WeatherToday);
