import { Taller } from "../models/taller.model.js";

class TallerController {
    static async getTalleres(req, res) {
        try {
            const talleres = await Taller.getTalleres();
            res.status(200).json(talleres);
        } catch (error) {
            console.error(`Error al obtener talleres: ${error.message}`);
            res.status(500).json({ message: "Error al obtener talleres" });
        }
    } 

    static async getTallerPorNombre(req, res) {
        try {
            const nombreTaller = req.params.nombre;
            console.log("Buscando taller:", nombreTaller); // Log para ver el nombre que se busca
            
            const taller = await Taller.getTallerPorNombre(nombreTaller);
            console.log("Resultados de la consulta:", taller); // Log para ver el resultado de la consulta
            
            // Verifica si hay resultados
            if (taller && taller.length > 0) { 
                res.status(200).json(taller[0]); // Envía solo el primer taller encontrado
            } else {
                console.log("No se encontró el taller"); // Log para cuando no se encuentra el taller
                res.status(404).json({ message: "Taller no encontrado" });
            }
        } catch (error) {
            console.error("Error al obtener el taller:", error.message); // Log para errores
            res.status(500).json({ message: "Error al obtener el taller" });
        }
    }  
    

    static async putTaller(req, res) {
        try {
            const update_taller = {
                nombre_Taller: req.body.nombre_Taller,
                tipo_Taller: req.body.tipo_Taller,
            };
            const id = req.params.id;
            await Taller.updateTaller(id, update_taller);
            res.status(200).json({ message: "Taller actualizado con éxito" });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el taller: " + error.message });
        }
    }

    static async postTaller(req, res) {
        try {
            const tll = {
                nombre_Taller: req.body.nombre_Taller,
                tipo_Taller: req.body.tipo_Taller,
            };
            await Taller.createTaller(tll);
            res.status(201).json({ message: "Taller creado con éxito" });
        } catch (error) {
            res.status(500).json({ message: "Error al crear taller: " + error.message });
        }
    }

    static async deleteTaller(req, res) {
        try {
            const id_Taller = req.params.id_Taller; // Asegúrate de que el nombre de la variable sea correcto
            const result = await Taller.eliminarTaller(id_Taller);
            if (result) {
                res.status(200).json({ message: 'Taller eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Taller no encontrado' });
            }
        } catch (error) {
            console.error(`Error al eliminar el taller: ${error.message}`);
            res.status(500).json({ message: 'Error al eliminar el taller' });
        }
    }
}

export default TallerController;
