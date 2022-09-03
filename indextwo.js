const http=require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{

            if(req.method==="GET"){
                if(req.url==="/"){
                    res.end("Welcome")
                }
                else if(req.url==="/textsync"){
                    const file=fs.readFileSync("./log.txt",{encoding:"utf-8"})
                    res.write(file)
                    res.end()
                }
                else if(req.url==="/textasync"){
                    fs.readFile("./log.txt",{encoding:"utf-8"},(err,data)=>{
                        res.write(data)
                        res.end()
                    })
                }
                else if(req.url==="/textstream"){
                 const data=fs.createReadStream("./oneMbtext.txt",{encoding:"utf-8"})
                 data.pipe(res)
                 
                }
                else if(req.url==="/promise"){
                    async function read(){
                        try {
                            const controller = new AbortController();
                            const { signal } = controller;
                            const promise =fs.readFile("./log.txt", {encoding:"utf-8"});
                            
                            // Abort the request before the promise settles.
                            controller.abort();
                        
                            await promise;
                        } catch (err) {
                            // When a request is aborted - err is an AbortError
                            console.error(err);
                        }
                    }
                    read().then((re)=>res.end(re))
                }
            }


})













server.listen(8082)