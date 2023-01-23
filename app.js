const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const https=require("https");
const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.listen(process.env.PORT||3000,function(){
    console.log("Server started")
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    var name=req.body.name;
    var lname=req.body.lname;
    var email=req.body.email;
    console.log(name+" "+lname+" "+email);
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:name,
                LNAME:lname
            }
        }
        ]
    }
    const jsondata=JSON.stringify(data)
    const url="https://us17.api.mailchimp.com/3.0/lists/b99d532299";
    const options={
        method:"POST",
        auth:"ayush_codes_05:6d87d959d80e4d6e40573768d4a89eb-us17"
    }
    const requests=https.request(url,options,function(resp){
        resp.on("data",function(data){
            console.log(JSON.parse(data))
        })
        if(resp.statusCode===200){
            res.send("Subscribed to newsletter")
        }else{
            res.send("failed to subscribe to newsletter")
        }
    })
    requests.write(jsondata)
    requests.end();

})
//f6d87d959d80e4d6e40573768d4a89eb-us17 API key
//b99d532299 audience id(list id)