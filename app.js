const express=require("express");
const app=express();

const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main()
   .then(()=>{
    console.log("db connected");
   })
   .catch((err)=>{
    console.log(err);
   });

   async function main(){
    await mongoose.connect(MONGO_URL);
   }
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const port=8080;
app.get("/",(req,res)=>{
    res.send("i a root");
});

app.listen(8080,()=>{
    console.log("server started listening on port 8080");
})
app.get("/listings",async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index.ejs",{allListings});
    });

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})    
app.get("/listings/:id",async(req,res)=>{
       let{id}=req.params;
       const listing=await Listing.findById(id);
       res.render("listings/show.ejs",{listing});
})
app.post("/listings",async(req,res)=>{
    //let{title,RTCSessionDescription,image,price,country,location}
    
   const newlisting= new Listing(req.body.listing);
   await newlisting.save();
    res.redirect("/listings");
})


app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});



//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testlisting",(req,res)=>{
//     let sampleListing=new Listing({
//         title:"my new vikla",
//         description:"bt the beach",
//         price:1200,
//         location:"goa",
//         country:"INdia",
//     });
//     sampleListing.save();
//     console.log("sample saved");
//     res.send("success");
// })
