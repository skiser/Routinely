import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './app/components/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './app/components/calendar';

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

    Calendar: CalendarScreen,
},
{
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