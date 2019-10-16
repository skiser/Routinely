/**
 * @format
 */

import 'react-native';
import React from 'react';
import Task from '../../app/components/tasks';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Login Screenshot', () => {
    const snap = renderer.create(<Task/>).toJSON();
    expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const login = renderer.create(<Task />).getInstance();

});
