export function hasNewElement(target: string[], from: string[]): boolean {
  const res = !from.every((v) => target.includes(v));
  return res;
}

export function delay(t: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

export async function asyncFilter(
  arr: any[],
  predicate: (item: any) => Promise<boolean>
) {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
}

export function makeWorker(fn: Function): Worker {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`(${fn.toString()})()`]))
  );
  return worker;
}
