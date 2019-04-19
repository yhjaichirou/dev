// 将一维数组转为二维数组
function listToMatrix(list, elementPerSubArray) {
  let matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}


function getObjectKeys(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
}

function getObjectValues(obj) {
  var values = [];
  for (var key in obj) {
    values.push(obj[key]);
  }
  return values;
}

module.exports = {
  listToMatrix: listToMatrix,
  getObjectKeys: getObjectKeys,
  getObjectValues: getObjectValues
}