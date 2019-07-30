import produce from 'immer';

export default function loading(state = {}, action) {
  switch (action.type) {
    case '@loading/ADD':
      return produce(state, draft => {
        const { id, operation = 'plus' } = action;

        draft[id] = { [operation]: true };
      });
    case '@loading/REMOVE':
      return produce(state, draft => {
        delete draft[action.id];
      });

    default:
      return state;
  }
}
