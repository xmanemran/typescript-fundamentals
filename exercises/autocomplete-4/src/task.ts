import { isPromise } from './utils/promise';
/**
 * Given a generator function that yields one or more
 * promises, chain them together in sequence
 *
 * @param {any} genFn generator function that yields one or more promises
 * @return {undefined}
 */
export function task<T>(genFn: () => IterableIterator<any>): Promise<T> {
  let p = new Promise<T>((resolve) => {
    let iterator = genFn(); // Get the iterator
    let lastValue: any = null;
    keepGoing();
    function keepGoing(arg?: any) {

      let yielded = iterator.next.call(iterator, arg);
      if (isPromise(yielded.value)) {
        yielded.value.then((d: any) => {
          lastValue = yielded.value;
          keepGoing(d);
        });
      } else if (!yielded.done) {
        lastValue = yielded.value;
        keepGoing(yielded.value);
      } else {
        resolve(lastValue);
      }
    }
  });
  return p;
}
