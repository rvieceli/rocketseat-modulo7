export function loading(id, operation = 'plus') {
  return {
    type: '@loading/ADD',
    id,
    operation,
  };
}

export function loaded(id) {
  return {
    type: '@loading/REMOVE',
    id,
  };
}
