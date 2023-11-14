const mongoose = require('mongoose')

 // creamos el esquema
const productoSchema = mongoose.Schema(
    {
        nombre:{
            type:String,
            required:[true, "Por favor ingrese el nombre del producto"]
        },
        cantidad:{
            type:Number,
            required: true,
            default: 0
        },
        precio:{
            type:Number,
            required: true,
        },
        imagen:{
            type:String,
            required: false,
        }
    },
    {
        timestamps:true
    }
)

//instanciasmos el modelo para exportarlo
const Producto = mongoose.model('Producto',productoSchema);
module.exports = Producto;