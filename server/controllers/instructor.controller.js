import { Instructor } from '../models/instructor.model.js'; 

class InstructorController {
    static async getInstructores(req, res){
        try {
            const  instructores = await Instructor.getInstructores();
            res.status( 200  ).json( instructores );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener instructores" +  error } );
        } 
    }   

    static async getInstructor(req, res){
        try { 
            const id = req.params.id;
            const  instructor = await Instructor.getInstructor(id);
            if  ( Instructor ) {
                res.status( 200  ).json( instructor );
            } else {
                res.status( 404  ).json( { message: "Instructor no encontrado" } );
            }
        } catch (error) {
            res.status( 500  ).json( { message: "Error al obtener el instructor" +  error } );
        }
    }

    static async putInstructor(req, res){
        try {
            const update_instructor = {
                nombre_Instruc: req.body.nombre_Instruc,
                apellido_Instruc:  req.body.apellido_Instruc,
                tipodoc_Instruc: req.body.nombre_Instruc,
                documento_Instruc:  req.body.apellido_Instruc,
                genero_Instruc:  req.body.correo_Instruc,
                id_Usua3FK:  req.body.id_Usua3FK
            }
            const id = req.params.id;
            await Instructor.updateInstructor(id, update_instructor);
            res.status( 200  ).json( { message: "Instructor actualizado con éxito"} );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al actualizar el instructor" +  error } );
        }
    }

    static  async postInstructor(req, res){
        try {
            const ins = {
                nombre_Instruc: req.body.nombre_Instruc,
                apellido_Instruc:  req.body.apellido_Instruc,
                tipodoc_Instruc: req.body.nombre_Instruc,
                documento_Instruc:  req.body.apellido_Instruc,
                genero_Instruc:  req.body.correo_Instruc,
                id_Usua3FK:  req.body.id_Usua3FK
             }
            await  Instructor.createInstructor(ins);
            res.status( 201 ).json( { message: "Instructor creado con exito" } );
        } catch (error) {
            res.status( 500  ).json( { message: "Error al crear instructor" + error } );
        }
    }

}

export default InstructorController;