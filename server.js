'use strict';

//I want to use express library after I install it in the terminal
// in order to use its methods So I will import it using require
//I will have node_modules inside it the express folder
const express = require('express');//npm i express


//I can't enforce heroku to use the 3001
require('dotenv').config(); //npm i dotenv


//cross origin resource sharing
//For security and privacy I will make it public so anyone has the permission
//to send me a request so I can give him a response 
const cors= require('cors'); //npm i cors

const cityData = require('./assets/weather.json');
const axios=require('axios');

//We initialized the express server it has all the properties and methods
//of express
const server= express();

//We need to declare our port# to connect the frontend with the backend
//in the React was 3000 by default here we should declare it by ourselves
const PORT=process.env.PORT; //anything instead of 3000
//keep it PORT to be matched with .env in heroku

server.use(cors()); // make it open to any client cause it's empty 

//Will take 2 parameters the port# and a function with a console.log 
//to make sure that hte server is running
//To make our server start listening for requests (wakeup)
server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})

//localhost:3001/
//To handle request takes 2 parameters the request path itself
//and a function that takes 2 parameters req and res
//we call it route
//home route
server.get('/',(req,res)=>{
    res.status(200).send('Home route');
})


//localhost:3001/test
server.get('/test',(request,response)=>{
    response.status(200).send('My server is working.');
})

//localhost:3001/shoppingList
let myTargetList =['shoes','bags','cat food'];
server.get('/shoppingList',(request,response) => {
    response.status(200).send(myTargetList);
});


//localhost:3001/getPokeInfo?PokeInfo=bulbasor
server.get('/getPokeInfo',(req,res)=>{
    console.log(req.query);
    let selectedPoke = pokeData.results.find(pokemon =>{
        if(pokemon.name== req.query.pokeInfo){
            return pokemon;
        }
    })
    res.status(200).send(selectedPoke);
})



//localhost:3001/getCityInfo?cityName=Amman
server.get('/getCityInfo',(req,res)=>{
    console.log(req.query);
    let selectedCity = cityData.find(item =>{
        if(item.city_name === req.query.cityName){
            return item;
        }
    })
    res.status(200).send(selectedCity);
})

//Routes or End points
//localhost:3001/getPhotos?searchQuery=book
server.get('/getPhotos',getPhotosHandler);

//Function handlers
// async function getPhotosHandler (req,res) {
//     let sQuery=req.query.searchQuery;
//     //https://api.unsplash.com/search/photos?query=office&client_id=Wk41zyNddCtjUHIz5HwZRFq4ehf24AYiMlq9ifLjCGA
//     let url= `https://api.unsplash.com/search/photos?query=${sQuery}&client_id=${process.env.UNSPLASH_KEY}`
    
//     try {
//         let photoData=await axios.get(url);
//         //whenever you git the data using axios it will be inside the data property
//         res.send(photoData.data);
//     }
//     catch(error){
//         res.status(500).send(error);
//     }
    
// }


async function getPhotosHandler (req,res) {
    let sQuery=req.query.searchQuery;
    //https://api.unsplash.com/search/photos?query=office&client_id=Wk41zyNddCtjUHIz5HwZRFq4ehf24AYiMlq9ifLjCGA
    let url= `https://api.unsplash.com/search/photos?query=${sQuery}&client_id=${process.env.UNSPLASH_KEY}`
    
    //Once you git the data save it in photoData
        axios.get(url).then(photoData =>{
            res.send(photoData.data);
        })
        .catch(error =>{
           res.status(500).send(error)
        })
        //whenever you git the data using axios it will be inside the data property
}




//For handeling any route
//order is matter it should be the last
server.get('*',(req,res)=>{
    res.status(404).send('NOT FOUND');
})
