const express= require('express');
const app=express();
console.log("Express Acquired");

const body= require('body-parser');
const url=body.urlencoded({extended:false});
console.log("Body Parser Acquired");

var pdf=require('html-pdf');
var ejs = require('ejs');
var fs = require('fs');

app.set("view engine",'ejs');
app.use('/stuff',express.static('stuff'));

require('dotenv').config();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
console.log("NodeMailer Acquired");


app.get('/', (req, res) => {
    res.render('index')
});

app.post('/',url,(req,res)=>{
	var a= req.body.name;
	var b= req.body.email;
  var text= "Hi "+a+",Welcome aboard on the panel of changemakers. We are glad to have you onboard with us";
  let name= a+".pdf";

function f1(){
var compiled = ejs.compile(fs.readFileSync('./views/certificate.html', 'utf8'));
var html = compiled({ name : a });
let options = {
	"width":  "15.56in",
	"height": "11.25in"
	};
pdf.create(html,options).toFile(name,() => {
    console.log('pdf done');
});
}

function f2(){
	var mailOptions = {
  	from: 'Uneako',
  	to: b,
  	subject: 'Welcome to the Community of changemakers',
  	text: text,
  	attachments:[
  	 {
  		filename: name,
  		path: './'+name
  	 }
  	]
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent');
}
});
}

f1();
setTimeout(f2,5000);
res.render('index');
})


app.listen(3000);