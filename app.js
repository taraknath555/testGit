var express=require("express");
var hbs=require("hbs")
var app=express();
var fs=require("fs")

//Configuration
app.set("view engine","hbs")
hbs.registerHelper("year",() => {
  return new Date().getFullYear();
})
hbs.registerHelper("styleWelcome", (text) => {
  return text.toUpperCase();
})
hbs.registerPartials("./views/partials")

//middleware
app.use((req,res,next) => {
  var log=`${new Date().toString()} : ${req.method} ${req.path}`
  console.log(log)
  fs.appendFileSync("server.log",log + "\n")
  next();
})

// app.use((req,res,next) => {
//   res.render("maintenance")
// })

app.use(express.static(__dirname + "/public"));

//Routes
app.get("/",(req,res) => {
    res.render("home.hbs",{
      pageName:"home",
      user:"bikash",
      welcomeMsg:"welcome to my website! "
    })
})

app.get("/about", (req,res)=> {
  res.render("about",{
    pageName:"about",
    user:"bikash",
    task:["go to field daily!",
    "learn Node js",
    "Go to gim",
    "go to college"],
  })
})
app.listen(3000,() => {
  console.log("server is started in port 3000")
});
