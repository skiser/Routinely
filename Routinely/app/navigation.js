import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/components/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './app/components/calendar';
import AlarmScreen from './app/components/alarm';

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
        initialRouteName: "Auth"
      }
    )
  );