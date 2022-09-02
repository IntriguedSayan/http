const http=require("http")
const fs=require("fs")


const server=http.createServer((req,res)=>{
    
    
    if(req.method==="GET"){

        if(req.url==="/"){
        
         fs.readdir("./",(err,files)=>{
                res.end(JSON.stringify(files))
                // res.end("OK")
           })
      
        }
        if(req.url==="/public"){
            
          fs.readdir("./public",(err,files)=>{
                res.end(JSON.stringify(files))
          })

        }
        if(req.url==="/public/other"){

           fs.readdir("./public/other",(err,files)=>{
                res.end(JSON.stringify(files))
           }) 
        }
    }

    
    

})

server.listen(8081)