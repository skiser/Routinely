import React, {Component, useState} from 'react';
import {View, StyleSheet, Button, Text, Image} from 'react-native';
import WeatherToggle from 'Routinely/app/components/WeatherToggle.js';
import {Divider} from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const user = [{email: ''}];
if (firebase.auth().currentUser !== null) {
  const currentUser = firebase.auth().currentUser;
  user.email = currentUser.email;
}

const toggleRef = firestore()
  .collection('users')
  .doc(user.email)
  .collection('dailyWeather')
  .doc('SwitchState');

class WeatherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnDefaultToggleSwitch: true,
      dataSource: [],
      loading: true,
      relativePath: 'https://www.weatherbit.io/static/img/icons/',
      png: '.png',
      boolean: '',
    };
  }
  switch1Value = toggleRef.get().then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      this.state.ToggleState = doc.data().boolean;
      console.log('Switch Value:', this.state.ToggleState);
    }
  });
  catch(error) {
    console.log('problem retrieving switch value');
  }

  toggleSwitch1 = value => {
    console.log('Toggle Value:', this.state.ToggleState);
    console.log('Value:', this.switch1Value);
    if (this.state.ToggleState === this.switch1Value) {
      try {
        toggleRef.set({
          boolean: false,
        });
        console.log('WeatherToggle Added');
      } catch (error) {
        console.log('WeatherToggle failed');
        console.log(error);
      }
    }
    if (this.state.ToggleState === false) {
      try {
        toggleRef.set({
          boolean: true,
        });
        console.log('WeatherToggle Added');
      } catch (error) {
        console.log('WeatherToggle failed');
        console.log(error);
      }
    }
    this.setState({switch1Value: value});
  };
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
          temperature2Day: responseJson.data[8].temp,
          temperature2Night: responseJson.data[11].temp,
          precipitation2: responseJson.data[8].precip,
          weatherConditions2: responseJson.data[8].weather.description,
          weatherConditions2Code: responseJson.data[8].weather.icon,
          weather2IconLink:
            this.state.relativePath +
            responseJson.data[8].weather.icon +
            this.state.png,
          temperature3Day: responseJson.data[16].temp,
          temperature3Night: responseJson.data[19].temp,
          precipitation3: responseJson.data[16].precip,
          weatherConditions3: responseJson.data[16].weather.description,
          weatherConditions3Code: responseJson.data[16].weather.icon,
          weather3IconLink:
            this.state.relativePath +
            responseJson.data[16].weather.icon +
            this.state.png,
          temperature4Day: responseJson.data[24].temp,
          temperature4Night: responseJson.data[27].temp,
          precipitation4: responseJson.data[24].precip,
          weatherConditions4: responseJson.data[24].weather.description,
          weatherConditions4Code: responseJson.data[24].weather.icon,
          weather4IconLink:
            this.state.relativePath +
            responseJson.data[24].weather.icon +
            this.state.png,
          temperature5Day: responseJson.data[32].temp,
          temperature5Night: responseJson.data[35].temp,
          precipitation5: responseJson.data[32].precip,
          weatherConditions5: responseJson.data[32].weather.description,
          weatherConditions5Code: responseJson.data[32].weather.icon,
          weather5IconLink:
            this.state.relativePath +
            responseJson.data[32].weather.icon +
            this.state.png,
        });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  render() {
    return (
      <View>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <Text style={{marginTop: 5, marginRight: 5, fontSize: 16}}>
            Enable to view today's weather in the calendar
          </Text>
          <WeatherToggle
            toggleSwitch1={this.toggleSwitch1}
            switch1Value={this.state.switch1Value}
          />
        </View>
        <View>
          <Divider />
          <Text
            style={{
              marginTop: 5,
              marginRight: 5,
              marginLeft: 15,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            5-Day Forecast
          </Text>
          <View style={styles.row}>
            <Image
              style={styles.img}
              source={{uri: this.state.weather1IconLink}}
            />
            <View>
              <Text style={styles.conditions}>
                {this.state.weatherConditions1}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.temp}>
                  Day: {this.state.temperature1Day}
                </Text>
                <Text style={styles.temp}>
                  Night: {this.state.temperature1Night}
                </Text>
                <Text style={styles.rain}>
                  Rain: {this.state.precipitation1}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image
              style={styles.img}
              source={{uri: this.state.weather2IconLink}}
            />
            <View>
              <Text style={styles.conditions}>
                {this.state.weatherConditions2}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.temp}>
                  Day: {this.state.temperature2Day}
                </Text>
                <Text style={styles.temp}>
                  Night: {this.state.temperature2Night}
                </Text>
                <Text style={styles.rain}>
                  Rain: {this.state.precipitation2}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image
              style={styles.img}
              source={{uri: this.state.weather3IconLink}}
            />
            <View>
              <Text style={styles.conditions}>
                {this.state.weatherConditions3}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.temp}>
                  Day: {this.state.temperature3Day}
                </Text>
                <Text style={styles.temp}>
                  Night: {this.state.temperature3Night}
                </Text>
                <Text style={styles.rain}>
                  Rain: {this.state.precipitation3}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image
              style={styles.img}
              source={{uri: this.state.weather4IconLink}}
            />
            <View>
              <Text style={styles.conditions}>
                {this.state.weatherConditions4}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.temp}>
                  Day: {this.state.temperature4Day}
                </Text>
                <Text style={styles.temp}>
                  Night: {this.state.temperature4Night}
                </Text>
                <Text style={styles.rain}>
                  Rain: {this.state.precipitation4}%
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Image
              style={styles.img}
              source={{uri: this.state.weather5IconLink}}
            />
            <View>
              <Text style={styles.conditions}>
                {this.state.weatherConditions5}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.temp}>
                  Day: {this.state.temperature5Day}
                </Text>
                <Text style={styles.temp}>
                  Night: {this.state.temperature5Night}
                </Text>
                <Text style={styles.rain}>
                  Rain: {this.state.precipitation5}%
                </Text>
              </View>
            </View>
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
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  forecast: {},
  temp: {
    fontSize: 16,
    paddingLeft: 20,
  },
  rain: {
    fontSize: 16,
    paddingLeft: 20,
  },
  conditions: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
    paddingLeft: 20,
  },
  img: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 5,
    width: 60,
    height: 60,
  },
});

export default WeatherScreen;
