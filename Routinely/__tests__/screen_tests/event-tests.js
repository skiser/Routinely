/**
 * @format
 */

import 'react-native';
import React from 'react';
import Event from '../../app/screens/event';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Event Screenshot', () => {
    //const snap = renderer.create(<Event/>).toJSON();
    //expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const event = renderer.create(<Event/>).getInstance();
});
