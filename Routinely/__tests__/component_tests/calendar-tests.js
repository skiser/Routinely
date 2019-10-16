/**
 * @format
 */

import 'react-native';
import React from 'react';
import Calendar from '../../app/components/calendar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Calendar Screenshot', () => {
    const snap = renderer.create(<Calendar/>).toJSON();
    expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const cal = renderer.create(<Calendar/>).getInstance();

});
