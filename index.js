const http = require("http")
const fs=require("fs")

const server=http.createServer((req,res)=>{
    // console.log(req.method)
    // console.log( req.url)
    if(req.method==="GET"){
        const log=req.method + " " + req.url+"\n"
        fs.appendFile("./log.txt",log,(err,data)=>{
            if(err)console.log(err)
           
        })
        if(req.url==="/"){
            res.setHeader("Content-type","text/plain") //text/html for html file
            // res.write("<h1>Welcome</h1>")
            //application/json for json
            //res.end(JSON.stringify({name:"masai"}))
            res.write("WELCOME")
           
            res.end("!")
        }else if(req.url==="/contact"){
        
            return res.end("WELCOMe to constacts")
        }else if(req.url==="/details"){
            //read from file and store the data
            //send the data
            const data=fs.readFileSync("./data.txt",{encoding:"utf-8"})
            return res.end(data)
        }else if(req.url==="/details2"){
            const data=fs.createReadStream("./data.txt",{encoding:"utf-8"})
            data.pipe(res)
        }
    }
    else if(req.method==="POST"){
        if(req.url==="/adddetails"){
            req.on("data",(data)=>{
                console.log(data)
            })
            req.on("end",()=>{
                res.end("Thanks for giving data")
            })
        }
    }

    res.write("xyz")
    res.end("!")
})

server.listen(8080)
