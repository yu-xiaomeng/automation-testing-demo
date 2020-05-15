var common = [
  '--format usage:report/usage.txt',
  '--format json:report/cucumber_report.json'
].join(' ')

module.exports = {
  default: common,
}