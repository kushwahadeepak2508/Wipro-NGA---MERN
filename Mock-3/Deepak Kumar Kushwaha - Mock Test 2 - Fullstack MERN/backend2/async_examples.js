function fetchDataCallback(cb){
 setTimeout(()=>cb(null,'callback-data'),200)
}
function fetchDataPromise(){
 return new Promise(r=>setTimeout(()=>r('promise-data'),200))
}
async function fetchDataAsync(){
 return await fetchDataPromise()
}
fetchDataCallback((e,d)=>console.log('cb',d))
fetchDataPromise().then(d=>console.log('promise',d))
;(async()=>console.log('async',await fetchDataAsync()))()
