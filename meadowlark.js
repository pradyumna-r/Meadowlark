const express=require('express');
const expressHandlebars=require('express-handlebars');
const fortune=require('./lib/fortune.js');
const app = express();
const port=process.env.port || 3000;

app.engine('handlebars', expressHandlebars.engine());
app.set('view engine','handlebars');
app.set('views','./views');

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about',{fortune:fortune.getFourtune});
})

//cusotm 404 pages
app.use((req,res)=>{
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use((err,req,res,next)=>{
    console.error(err.message);
    res.status(500);
    res.send('500');
});


app.listen(port,()=>{
    console.log(`express started on port ${port}`)
})