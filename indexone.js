const http=require("http")
const fs=require("fs")


const server=http.createServer((req,res)=>{
    
    
    if(req.method==="GET"){

        if(req.url==="/"){
        
         const data=fs.readdirSync("./",{encoding:"utf-8"})
          // res.end(JSON.stringify(data))
          data.forEach((elem)=>(
            res.write(`<a href="/public"><li>${JSON.stringify(elem)}</li></li></a>`)
          ))
          res.end()
        }
        if(req.url==="/public"){
            
         const files=fs.readdirSync("./public",{encoding:"utf-8"})
                files.forEach((elem)=>(
                  res.write(`<a href="/public/other"><li>${JSON.stringify(elem)}</li></li></a>`)
                ))
          
          res.end()

        }
        if(req.url==="/public/other"){

           fs.readdir("./public/other",(err,files)=>{
                res.end(JSON.stringify(files))
           }) 
        }
    }

    
    

})

server.listen(8081)