import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './screens/calendar';
import AlarmScreen from './screens/alarm';
import AlarmRingingScreen from './screens/alarmRinging';
import EventScreen from './screens/event';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const AppStack = createStackNavigator(
  {
    Alarm: AlarmScreen,
    AlarmRinging: AlarmRingingScreen,
    Calendar: CalendarScreen,
    Event: EventScreen,
  },
  {
    initialRouteName: 'Alarm',
    initialRouteName: 'AlarmRinging',
    initialRouteName: 'Calendar',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      //Calendar: CalendarScreen,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
