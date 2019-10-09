import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './components/login';
import {createStackNavigator} from 'react-navigation-stack';
<<<<<<< HEAD:Routinely/Navigation.js
import CalendarScreen from './app/components/calendar';
import AlarmScreen from './app/components/alarm';
import AlarmRingingScreen from './app/components/alarmRinging';
=======
import CalendarScreen from './components/calendar';
import AlarmScreen from './components/alarm';
>>>>>>> cb3e52e2da9d8829c9f583957a959a568f4378e8:Routinely/app/navigation.js

const AuthStack = createStackNavigator(
    {
      Login: LoginScreen,
    },
    {
      headerMode: "none",
      initialRouteName: "Login"
    }
  ); 

const AppStack = createStackNavigator(
{
    Alarm: AlarmScreen,
    AlarmRinging: AlarmRingingScreen,
    Calendar: CalendarScreen,
},
{
    initialRouteName: "Alarm",
    initialRouteName: "AlarmRinging",
    initialRouteName: "Calendar",
    //aheaderMode: "none"
}
);


export default createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack,
        //Calendar: CalendarScreen,
      },
      {
        initialRouteName: "Auth"
      }
    )
  );