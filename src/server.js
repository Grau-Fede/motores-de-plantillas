
const express = require('express');
const contenedor = require("./contenedor");

const app = express();
const contenido = new contenedor("./productos.txt")

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'))
app.set('views', './views');
app.set('view engine', 'ejs');

const productos =  contenido.getAll()

app.get('/',  (req, res) => {

    res.render('index', {productos});

});


app.get('/api/productos', async(req, res) => {
    try {
        const productos = await contenido.getAll()
        res.render('index',{productos})
        
        
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

app.get('/api/productos/:id', async(req, res) => {
    const id = req.params.id
    try {
        const producto = await contenido.getById(Number(id))
        res.render(producto)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

app.post('/api/productos', async(req, res) => {
    const { title, price, thumbnail } = req.body
    try {
        const newProducto = {
            title,
            price,
            thumbnail
        }
        await contenido.save(newProducto);
        res.json({producto: newProducto})
        
    } catch (error) {
        console.log(error)
    }
});
app.delete('/api/productos/:id', async(req, res)=>{
 let productoId = req.params.id 
 try{ 
 await contenido.deleteById(Number(productoId))
 res.json ({
     result: 'ok',
     id: req.params.id
 })
 }
 catch(error){
    if (error) res.status(500).send({message: `Error al borrar el producto: ${error}`})
    console.log(error)
 }

});
app.put ('api/productos/:id'), async(req,res)=>{
    const {title, price, thumbnail} = req.body;
    const productoId = req.params.id
    try{
    await contenido.getById(productoId)
    if (title!= productoId.title){
        productoId.title = title;
    }
    else if (price != productoId.price){
         productoId.price = price;
    }
    else if (thumbnail != productoId.thumbnail){
        productoId.thumbnail = thumbnail;
    }
}
    catch{
        if (err) res.status(500).send ({message: `Error al modificar el producto ${err}`})
    }
}
 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});