/**
 * @format
 */

import 'react-native';
import React from 'react';
import Note from '../../app/screens/note';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('Note Screenshot', () => {
    //const snap = renderer.create(<Note/>).toJSON();
    //expect(snap).toMatchSnapshot();
});
it('renders correctly', () => {
    const note = renderer.create(<Note />).getInstance();
});
