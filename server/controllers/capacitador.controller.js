import { Capacitador } from "../models/capacitador.model.js";

class CapacitadorController {
    static async getCapacitadores(req, res){
        try {
            const  capacitadores = await Capacitador.getCapacitadores();
            res.status( 200  ).json( capacitadores );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener capacitadores" +  error } );
        }
    }    
 
    static async getCapacitador(req, res){
        try {
            const id = req.params.id;
            const  capacitador = await Capacitador.getCapacitador(id);
            if  ( capacitador ) {
                res.status( 200  ).json( capacitador );
            } else {
                res.status( 404  ).json( { message: "Capacitador no encontrado" } );
            }
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener el capacitador" +  error } );
        }
    }

    static async putCapacitador(req, res){
        try {
            const update_capacitador = {
                nombre_Capac: req.body.nombre_Capac,
                apellidos_Capac:  req.body.apellidos_Capac,
                tipodoc_Capac:  req.body.tipodoc_Capac,
                documento_Capac:  req.body.documento_Capac,
                genero_Capac:  req.body.genero_Capac,
                id_Usua1FK:  req.body.id_Usua1FK
            }
            const id = req.params.id;
            await Capacitador.updateCapacitador(id, update_capacitador);
            res.status( 200  ).json( { message: "Capacitador actualizado con éxito"} );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al actualizar el capacitador" +  error } );
        }
    }

    static  async postCapacitador(req, res){
        try {
            const cap = {
                nombre_Capac: req.body.nombre_Capac,
                apellidos_Capac:  req.body.apellidos_Capac,
                tipodoc_Capac:  req.body.tipodoc_Capac,
                documento_Capac:  req.body.documento_Capac,
                genero_Capac:  req.body.genero_Capac,
                id_Usua1FK:  req.body.id_Usua1FK
             }
            await  Capacitador.createCapacitador(cap);
            res.status( 201 ).json( { message: "Capacitador creado con exito" } );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al crear capacitador" + error } );
        }
    }

}

export default CapacitadorController;