const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const mockData = () => {
  return {
    code: "TC3005B",
    name: "Bruce",
    career: "N/A",
    semester: "N/A",
  };
};

export default function makeData(howmany: number) {
  return range(howmany).map(() => {
    return {
      ...mockData(),
    };
  });
}
