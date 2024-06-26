export function Deferred() {
  const defer = {
    canceled: false,
  };

  defer.promise = new Promise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });

  defer.cancel = () => {
    defer.canceled = true;
    defer.reject(new Error('Task canceled'));
  };

  return defer;
}

export function delay(ms) {
  const defer = Deferred();

  setTimeout(defer.resolve, ms);

  return defer.promise;
}
