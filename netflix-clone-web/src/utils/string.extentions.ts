interface String {
  prefix(pre: string): string
  truncateToLength(n: number): string
}

String.prototype.prefix = function (pre: string) {
  return pre + this
};

String.prototype.truncateToLength = function (n = 150) {
  const text = this.toString()
  return text.length > n ? text.substring(0, n) + '...' : text 
}