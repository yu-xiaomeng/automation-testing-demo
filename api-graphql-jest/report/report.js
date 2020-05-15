const fs = require("fs")

function report(result) {
    // console.log(result)
    const resultStr = JSON.stringify(result)
    fs.writeFile('./report/reports.json', resultStr, function (error) {
        if (error) {
          console.log('写入失败')
        } else {
          console.log('写入成功了')
        }
      })
    return result
}
module.exports = report