/**
 * @format
 */

import 'react-native';
import React from 'react';
import Calendar from '../../app/screens/calendar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Calendar Screenshot', () => {
    //const snap = renderer.create(<Calendar/>).toJSON();
    //expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const cal = renderer.create(<Calendar/>).getInstance();
    const data= [{chosenDate: new Date("Tue Feb 23 2016 20:11:42 GMT+0200 (EET)")} ,
        {chosenDate: new Date("Fri Feb 26 2016 20:11:42 GMT+0200 (EET)")},
        {chosenDate: new Date("Thurs Feb 25 2016 20:11:42 GMT+0200 (EET)")},
        {chosenDate: new Date("Wed Feb 24 2016 20:11:42 GMT+0200 (EET)")}];
    data.sort(cal.sortEvents());
    expect(data).toEqual([{chosenDate: new Date("Tue Feb 23 2016 20:11:42 GMT+0200 (EET)")} ,
        {chosenDate: new Date("Wed Feb 24 2016 20:11:42 GMT+0200 (EET)")},
        {chosenDate: new Date("Thurs Feb 25 2016 20:11:42 GMT+0200 (EET)")},
        {chosenDate: new Date("Fri Feb 26 2016 20:11:42 GMT+0200 (EET)")}])

});
