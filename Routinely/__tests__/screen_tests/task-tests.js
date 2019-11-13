/**
 * @format
 */

import 'react-native';
import React from 'react';
import Task from '../../app/screens/tasks';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Task Screenshot', () => {
    //const snap = renderer.create(<Task/>).toJSON();
    //expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const task = renderer.create(<Task />).getInstance();
});
