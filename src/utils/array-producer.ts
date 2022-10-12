export default function arrayProducer<T>(
  generatorFunction: (...args: any[]) => Generator<T, void>
) {
  return (...args: Parameters<typeof generatorFunction>) => {
    const acc: T[] = [];
    for (const value of generatorFunction(...args)) {
      acc.push(value);
    }
    return acc;
  };
}
