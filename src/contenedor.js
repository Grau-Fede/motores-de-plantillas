const fs=require("fs")
//import { builtinModules, Module } from "module";
//import { isModuleNamespaceObject } from "util/types";
 class contenedor {
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }
    async save (object){
        try{
            const archivo = await this.getAll();
            //console.log(archivo)
            if (archivo.length == 0){
                object.id=1;
                archivo.push(object);
                const data = JSON.stringify(archivo);
                fs.writeFileSync(this.nombreArchivo, data, 'utf-8');
                return object;
            }
            object.id = archivo.length +1;
            archivo.push(object);
            const data = JSON.stringify(archivo);
            fs.writeFileSync(this.nombreArchivo, data, 'utf-8');
            return object;
        }
        catch (error){
            throw error;
        }
    }
    async getById(id){
        try {
            const archivo = await this.getAll();
            if (archivo.length <= 0) {
                return null;
              }
              for (let i = 0; i < archivo.length; i++) {
                if (archivo[i].id === id) {
                    console.log(archivo[i])
                  return archivo[i];
                }
              }
              return null;
            }
        catch (error){
            throw error;
        }

    }
    async getAll(){
        try {
            const contenido =  fs.readFileSync(this.nombreArchivo,'utf-8');
            if(!contenido) {
                const productos = []
                fs.writeFileSync(this.archivo, JSON.stringify(productos))
                return productos;
              }
            const datos = JSON.parse(contenido);
            return datos;
        }
        catch(error){
            console.log('Error', error)
        }

    }
    async deleteById(id){
        try {
            let archivo = await this.getAll();
            if (archivo.length >= 1) {
                archivo = archivo.filter((obj) => {
                  return obj.id !== id;
                });
                for (let i = 0; i < archivo.length; i++) {
                  if (archivo[i].id > id) {
                    archivo[i].id -= 1;
                  }
                }
                fs.writeFileSync(this.archivo, JSON.stringify(archivo), "utf-8");
              }
            }

        catch(error){
            throw error;
        }
    }
    async deleteAll(){
        try {
            const archivo = await this.getAll();
            if (archivo.length >= 1) {
                fs.writeFileSync(this.nombreArchivo, JSON.stringify([]));
              }
            }
        catch(error){
            throw error;
        }
    

    }


}
module.exports = contenedor

//const UseContenedor = new contenedor ("./productos.txt")
//UseContenedor.save({title: 'lapiz', price: 100, thumbnail: 'L'})
//UseContenedor.getById(1)

