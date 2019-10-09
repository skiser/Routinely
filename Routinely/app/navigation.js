import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './components/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './components/calendar';
import AlarmScreen from './components/alarm';
import EventScreen from './components/event';

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
    Calendar: CalendarScreen,
    Event: EventScreen,
},
{
    initialRouteName: "Alarm",
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
        initialRouteName: "App"
      }
    )
  );