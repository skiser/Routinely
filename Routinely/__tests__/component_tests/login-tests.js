/**
 * @format
 */

import 'react-native';
import React from 'react';
import Login from '../../app/components/login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Login Screenshot', () => {
    const snap = renderer.create(<Login/>).toJSON();
    expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const login = renderer.create(<Login />).getInstance();

});
