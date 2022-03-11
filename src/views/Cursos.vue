<template>
    <h5>Cursos</h5>
    <form method="post" @submit.prevent="Guardar">
        <input type="hidden" v-model="IdCurso">
        <div class="row">
            <div class="col m3">
                <label class="active">Código</label>
                <input type="text" v-model="Codigo">                
                <ul class="collection">
                    <li class="collection-item" v-for="val in CodigoValidation" v-bind:key="val">{{val}}</li>
                </ul>
            </div>
            <div class="col m3">
                <label class="active">Descripción</label>
                <input type="text" v-model="Descripcion">                
                <ul class="collection">
                    <li class="collection-item" v-for="val in DescripcionValidation" v-bind:key="val">{{val}}</li>
                </ul>
            </div>
            <div class="input field col m2">
                <p><label><input type="checkbox" v-model="Estado">
                <span>Activo</span>       
                </label>
                </p>
                <ul></ul>
            </div>
            <div class="input field col m2">
                <button type="submit" class="btn indigo darken-4">{{Edicion ? 'Actualizar':'Guardar'}}</button>
            </div>
            <div class="input field col m2" v-show="Edicion">
                <button type="button" @click="Limpiar" class="btn orange darken-4">Cancelar</button>
            </div>
        </div>
    </form>
    <table class="table bordered striped bordered">
        <thead>
            <th>id</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </thead>
        <tbody>
            <tr v-for="curso in cursos" v-bind:key="curso.idCurso">
                <TD>{{curso.idCurso}}</TD>
                <td>{{curso.codigo}}</td>
                <td>{{curso.descripcion}}</td>
                <td><input type="checkbox" v-bind:checked="curso.estado"><span></span></td>
                <td><a href="#!" v-on:click.prevent="editar(curso.idCurso)"><i class="material-icons">create</i></a></td>
                <td><a href="#!" v-on:click.prevent="eliminar(curso.idCurso)"><i class="material-icons">delete</i></a></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import M from 'materialize-css'
    export default{
        name: 'Home',
        data(){
            return{
                cursos: [],
                IdCurso: 0,
                Codigo: '',
                CodigoValidation: [],
                Descripcion: '',
                DescripcionValidation: [],
                Estado: false,
                Edicion: false
            }
        },
        mounted()
        {
            M.AutoInit();            
        },
        methods:{
            eliminar(idCurso)
            {
                this.axios.delete('/Cursos/' + idCurso, {
                    headers:{
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.cursos.splice(this.cursos.findIndex(x=>x.idCurso == idCurso), 1);
                })
                .catch(error => {
                    var data = error.response.data;
                    M.toast({html: data.message});
                });
            },
            editar(idCurso)
            {
                this.Limpiar();
                var curso = this.cursos.find(x=>x.idCurso == idCurso);
                this.Codigo = curso.codigo;
                this.IdCurso = curso.idCurso;
                this.Descripcion = curso.descripcion;
                this.Estado = curso.estado;
                this.Edicion = true;
            },
            Guardar()
            {
                var payload = {
                    IdCurso: this.IdCurso,
                    Codigo: this.Codigo,
                    Descripcion: this.Descripcion,
                    Estado: this.Estado
                };
                if(this.Edicion && this.IdCurso > 0)
                {
                    var index = this.cursos.findIndex(x=>x.idCurso);
                    this.axios.put('/Cursos/' + this.IdCurso, payload, {
                        headers:{
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(() => {
                        this.cursos[index].codigo = this.Codigo;
                        this.cursos[index].descripcion = this.Descripcion;
                        this.cursos[index].estado = this.Estado;
                        this.Limpiar();
                    })
                    .catch(error => {
                        var data = error.response.data;
                        if(data.type == "M")
                        {
                            if(data.modelErrors.find(x=>x.key == "Codigo") != undefined)
                            this.CodigoValidation = data.modelErrors.find(x=>x.key == "Codigo").messages;
                            if(data.modelErrors.find(x=>x.key == "Descripcion") != undefined)
                            this.DescripcionValidation = data.modelErrors.find(x=>x.key == "Descripcion").messages;
                        }

                        if(data.type == "C")
                        {
                            this.ErrorMessage = data.message;
                            M.toast({html: data.message});
                        }
                    });
                }
                else
                {
                    this.axios.post('/Cursos', payload, {
                        headers:{
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                    .then(response => {
                        this.cursos.push(response.data);
                        this.Limpiar();
                    })
                    .catch(error => {
                        var data = error.response.data;
                        if(data.type == "M")
                        {
                            if(data.modelErrors.find(x=>x.key == "Codigo") != undefined)
                                this.CodigoValidation = data.modelErrors.find(x=>x.key == "Codigo").messages;
                            if(data.modelErrors.find(x=>x.key == "Descripcion") != undefined)
                                this.DescripcionValidation = data.modelErrors.find(x=>x.key == "Descripcion").messages;
                        }

                        if(data.type == "C")
                        {
                            this.ErrorMessage = data.message;
                            M.toast({html: data.message});
                        }
                    });
                }
            },
            Limpiar()
            {
                this.Codigo = '';
                this.IdCurso = 0;
                this.Descripcion = '';
                this.Estado = false;
                this.Edicion = false;
                this.CodigoValidation = [];
                this.DescripcionValidation = [];
            }
        },
        async created()
        {
            const response = await this.axios.get('Cursos', {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            this.cursos = response.data;
        }
    }
</script>