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
import NotesScreen from './screens/notes';
import WeatherScreen from './screens/weather';
import NoteScreen from './screens/note';
import QuoteScreen from './screens/quotes';
import HoroscopeScreen from './screens/horoscope';
import NewsScreen from './screens/news';
import TodayHoroscopeScreen from './screens/todayHoroscope';


const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);
console.disableYellowBox = true;
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
    Notes: NotesScreen,
    Note: NoteScreen,
    News: NewsScreen,
    Weather: WeatherScreen,
    Quotes: QuoteScreen,
    Horoscope: HoroscopeScreen,
    TodayHoroscope: TodayHoroscopeScreen,
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
