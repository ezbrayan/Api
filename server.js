// importamos express a la aplicacion
const express = require('express');

// importamos mongose
const mongoose = require('mongoose');
const Producto = require("./Modelos/producModel");

// creamos uan constante app de tipo express
const app = express();

// le decimos a nuestra app que usaremos json
app.use(express.json());

// creamos la ruta donde haremos la peticion req y de pagina de inicio y donde debe darnos respuestas

app.get('/home' ,(req , res)=>{
    res.send('HOLA TRBAJAREMOS CON UNA API')
})

//creamos la ruta del blog
app.get('/blog' , (req , res)=>{
    res.send('solo tolima')
})

//creamos la ruta donde haremos la peticion a la db, consulta de todos los productos
//y esperemos el tipo de respuesta
app.get('/productos', async(req, res) =>{
    try{
        const producto = await Producto.find({});
        res.status(200).json(producto);  // Fix the typo here
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

// entrada consulta por producto {id}
app.get('/productos/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const producto = await Producto.findById(id);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// agregamos la entrada para hacerle un post (envio) a la API o esquema de datos en mongoDb
app.post('/productos', async(req, res) =>{
    try {
        const producto = await Producto.create(req.body)
        res.status(200).json(producto);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update productos
//parametros de productos
app.put('/productos/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const producto = await Producto.findByIdAndUpdate(id,req.body);
        // we cannot find any product in database
        if(!producto){
            return res.status(404).json({message: 'No puedo encontrar ningun producto con este id ${id}'})
        }
        const updateProducto = await Producto.findById(id);
        res.status(200).json(updateProducto);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

// eliminar producto de la base de datos por Id
app.delete('/productos/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const producto = await Producto.findByIdAndDelete(id);
        if(!producto){
            return res.status(404).json({message: 'No puedo encontrar ningun producto con este Id ${id}'})
        }
        res.status(200).json(producto);
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//configuramos en que puerto queremos que nos escuche el server nuestra application
mongoose.connect('mongodb+srv://ezbrayan:brayan1082@cluster0.cnjhvmf.mongodb.net/DevApi?retryWrites=true&w=majority')
.then(() =>{
    console.log('conectado a mongo db')
    app.listen(3000, () => {
        console.log('conectado al server')
    })
}).catch((error) =>{
    console.log(error)
});