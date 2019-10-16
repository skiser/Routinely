/**
 * @format
 */

import 'react-native';
import React from 'react';
import Alarm from '../../app/screens/alarm';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Alarm Screenshot', () => {
    const snap = renderer.create(<Alarm/>).toJSON();
    expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const alarm = renderer.create(<Alarm />).getInstance();

});
