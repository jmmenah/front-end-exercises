const countBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
document.write(JSON.stringify(countBy([6, 10, 100, 10], Math.sqrt)));
document.write("<br>");
document.write(JSON.stringify(countBy([6.1, 4.2, 6.3], Math.floor)));
document.write("<br>");
document.write(JSON.stringify(countBy(['one', 'two', 'three'], 'length')));