class Cliente{
    constructor(nombre,apellidos,direccion,localidad,fNacimiento){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.direccion=direccion;
        this.localidad=localidad;
        this.fNacimiento=new Date(Date.parse(fNacimiento));
    }

    nombreCompleto(){
        return this.nombre+" "+this.apellidos;
    }
    
    direccionCompleta(){
        return this.direccion+", "+this.localidad;
    }
}