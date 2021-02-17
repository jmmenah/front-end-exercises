const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);
document.write(JSON.stringify(maxN([1, 2, 3])));
document.write("<br>")
document.write(JSON.stringify(maxN([1, 2, 3], 2)));