import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './screens/calendar';
import AlarmScreen from './screens/alarm';
import AlarmRingingScreen from './screens/alarmRinging';
import EventScreen from './screens/event';
import TaskScreen from './screens/tasks';
import MenuScreen from './screens/menu';
import EditEventScreen from './screens/editEvent';
import EditTaskScreen from './screens/editTask';

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
    Task: TaskScreen,
    Menu: MenuScreen,
    EditEvent: EditEventScreen,
    EditTask: EditTaskScreen,
  },
  {
    initialRouteName: 'Alarm',
    initialRouteName: 'AlarmRinging',
    initialRouteName: 'Calendar',
    initialRouteName: 'Menu',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
