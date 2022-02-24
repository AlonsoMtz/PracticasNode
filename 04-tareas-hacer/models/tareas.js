const Tarea = require("./tarea");


class Tareas {

    _listado = {};

    get listadoArr(){

        const listadoArray = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listadoArray.push(tarea);
        });


        return listadoArray;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){

        Object.keys(this._listado).forEach((key, i) => {

            const tarea = this._listado[key];
            const impresion = `${i+1}. ${tarea.desc} :: ${(tarea.completadoEn) ? 'Completada' : 'Pendiente'}`;
            console.log(impresion);

        });

    }

    listarPendientesCompletadas(Pendiente = true){

        const aux = [];

        Object.keys(this._listado).forEach((key, i) => {

            const tarea = this._listado[key];

            if(Pendiente){
                if(this._listado[key].completadoEn==null){
                    aux.push(this._listado[key]);
                }
            }else{
                if(this._listado[key].completadoEn!=null){
                    aux.push(this._listado[key]);
                }
            }

        });

        if(aux.length > 0){
            aux.forEach((reg, i) => {
                if(Pendiente){
                    console.log(`${i+1}. ${reg.desc}`);
                }else{
                    console.log(`${i+1}. ${reg.desc} :: ${reg.completadoEn}`);
                }
                
                
            });
        }
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {

            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }


}

module.exports = Tareas;




