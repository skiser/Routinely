import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginScreen from './screens/login';
import {createStackNavigator} from 'react-navigation-stack';
import CalendarScreen from './screens/calendar';
import AlarmScreen from './screens/alarm';
import AlarmRingingScreen from './screens/alarmRinging';
import EventScreen from './screens/event';
import TasksScreen from './screens/tasks';
import TaskScreen from './screens/task';
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
    Tasks: TasksScreen,
    Menu: MenuScreen,
    EditEvent: EditEventScreen,
    EditTask: EditTaskScreen,
    Notes: NotesScreen,
  },
  {
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
