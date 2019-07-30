import { fork, take } from 'redux-saga/effects';

const takePerProduct = (pattern, saga, ...args) =>
  fork(function* customTake() {
    const lastTasks = {};

    while (true) {
      const action = yield take(pattern);

      const { id } = action;

      Object.keys(lastTasks).forEach(key => {
        if (!lastTasks[key].isRunning()) {
          delete lastTasks[key];
        }
      });

      if (!lastTasks[id] || !lastTasks[id].isRunning()) {
        lastTasks[id] = yield fork(saga, ...args.concat(action));
      }
    }
  });

export default takePerProduct;
