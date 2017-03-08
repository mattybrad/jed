import * as Actions from '../actions/TestActions';

export default function Background(
  state = {
    testThing: "hello"
  },
  action
) {
  switch(action.type) {
    case Actions.TEST_ACTION:
    return Object.assign({}, state, {
      testThing: "hi there"
    });

    default:
    return state
  }
}
