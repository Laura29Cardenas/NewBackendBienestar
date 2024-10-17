import { DisponibilidadBienestar } from "../models/disponibilidad_bienestar.model.js";

class DisponibilidadBienestarController {
    static async getDisponibilidadesB(req, res){
        try {
            const  disponibilidadesB = await DisponibilidadBienestar.getDisponibilidadesB();
            res.status( 200  ).json( disponibilidadesB );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener las disponibilidades de bienestar" +  error } );
        }
    }   
 
    static async getDispoB(req, res){
        try {
            const id = req.params.id;
            const  dispoB = await DisponibilidadBienestar.getDispoB(id);
            if  ( DisponibilidadBienestar ) {
                res.status( 200  ).json( dispoB );
            } else {
                res.status( 404  ).json( { message: "Disponibilidad no encontrada" } );
            }
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener la disponibilidad" +  error } );
        }
    }

    static async putDispoB(req, res){
        try {
            const update_dispoB = {
                jornada_dispoB: req.body.jornada_dispoB,
                horaInicio_dispoB:  req.body.horaInicio_dispoB,
                horaFin_dispoB: req.body.horaFin_dispoB,
                fechaDias_dispoB: req.body.fechaDias_dispoB,
            }
            const id = req.params.id;
            await DisponibilidadBienestar.updateDispoB(id, update_dispoB);
            res.status( 200  ).json( { message: "Disponibilidad actualizada con éxito"} );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al actualizar la disponibilidad" +  error } );
        }
    }

    static  async postDispoB(req, res){
        try {
            const disB = {
                jornada_dispoB: req.body.jornada_dispoB,
                horaInicio_dispoB:  req.body.horaInicio_dispoB,
                horaFin_dispoB: req.body.horaFin_dispoB,
                fechaDias_dispoB: req.body.fechaDias_dispoB,
             }
            await  DisponibilidadBienestar.createDispoB(disB);
            res.status( 201 ).json( { message: "Disponibilidad creada con exito" } );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al crear la disponibilidad" + error } );
        }
    }
    static async deleteDispoB(req, res) {
        try {
            const { id_dispoB } = req.params;
            console.log('id_dispoB:', id_dispoB);
            const result = await DisponibilidadBienestar.eliminarDispoB(id_dispoB);
            if (result) {
                res.status(200).json({ message: 'Disponibilidad eliminada exitosamente' });
            } else {
                res.status(404).json({ message: 'Disponibilidad no encontrada' });
            }
        } catch (error) {
            console.error(`Error al eliminar la disponibilidad: ${error.message}`);
            res.status(500).json({ message: 'Error al eliminar la disponibilidad' });
        }
    }

}

export default DisponibilidadBienestarController;