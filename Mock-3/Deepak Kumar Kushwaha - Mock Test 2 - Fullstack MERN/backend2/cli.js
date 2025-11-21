const fs=require('fs')
const path=require('path')
const http=require('http')

const logDir=path.join(__dirname,'logs')
if(!fs.existsSync(logDir)) fs.mkdirSync(logDir)
const file=path.join(logDir,'app.log')
fs.appendFileSync(file,'App started\n')

http.createServer((req,res)=>{
 res.setHeader('Content-Type','application/json')
 res.end(JSON.stringify({status:'running'}))
}).listen(5000,()=>console.log("CLI server 5000"))
