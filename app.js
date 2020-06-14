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
  var htmls="Hi "+a+" ,<br>";
  htmls= htmls+ "Small steps often lead to big changes. We know your small step of taking a climate pledge definitely will.<br>";
  htmls= htmls+ "We, at Uneako, promise you so.<br><br>";
  htmls= htmls+ "Greetings!<br><br>";
  htmls= htmls+ "Congratulations, on taking the first step towards the Uneako earth-friendly way of life. You have proved that you are a responsible Earth citizen. Here's how you can take your commitment a step further:<br><br><br>";
  htmls= htmls+ "1) Be a part of Ecolover community and interact with like-minded people on a mission to protect our planet Earth. Join us at,<br>";
  htmls= htmls+ "https://www.facebook.com/groups/239039350609613/<br><br><br>";
  htmls= htmls+ "2) You can also spread the eco-movement and ask other five people to take our pledge and join the community. This will help our small movement grow bigger.<br><br><br>";
  htmls= htmls+ "3) Start embodying climate-positivity and eco-friendliness in your lifestyle. Explore our products at https://uneako.com/shop/ and get yourself and your near ones some innovative and never-seen-before avatars of eco-friendly goodness!.<br><br><br>";
  htmls= htmls+ "Here's to a lasting partnership for a lasting planet.<br><br>";
  htmls= htmls+ "Warm Regards,<br>";
  htmls= htmls+ "Team Uneako<br>";
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
    text:"Hello, Changemaker",
    html:htmls,
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