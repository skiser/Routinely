import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/components/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './app/components/calendar';
import AlarmScreen from './app/components/alarm';
import AlarmRingingScreen from './app/components/alarmRinging';

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