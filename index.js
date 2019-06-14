/*
// Iterative sum.
function sum(numbers) {
  let res = 0;
  for (let n of numbers) {
    res += n;
  }
  return res;
}
*/

function len(list) {
	return list && list.length || 0;
}

function head(list) {
	return len(list) > 0 
		? list[0]
		: null;
}

function tail(list) {
	return len(list) > 1
		? list.splice(1)
		: null;
}

// Entry point.
function sum(list) {
	return recSum(list, 0);
}

// Recursive call.
function recSum(list, acc) {
	let h = head(list);
	if (!h) return acc;
	return recSum(tail(list), h + acc);
}

console.log(sum([1,2,3]));








