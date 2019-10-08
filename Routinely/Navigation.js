import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/components/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './app/components/calendar';
import AlarmScreen from './app/components/alarm';
import EventScreen from './app/components/event';

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