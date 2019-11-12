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
import NotesScreen from './screens/notes';

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
    Notes: NotesScreen,
  },
  {
    initialRouteName: 'Alarm',
    initialRouteName: 'AlarmRinging',
    initialRouteName: 'Menu',
    initialRouteName: 'Notes',
    initialRouteName: 'Calendar',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);
