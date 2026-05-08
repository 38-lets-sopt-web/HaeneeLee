function solution(num_list) {
  const odd = parseInt(num_list.filter((n) => n % 2 !== 0).join(""));
  const even = parseInt(num_list.filter((n) => n % 2 === 0).join(""));
  return odd + even;
}
