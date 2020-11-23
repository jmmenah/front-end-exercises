class Cuenta {
    constructor(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual){
        this.numero=numero;
        this.titular=new Cliente(nombre,apellidos,direccion,localidad,fNacimiento);
        this.saldo=saldo;
        this.interesAnual=interesAnual;

    }

    ingreso (cantidad){
        this.saldo=this.saldo + Math.abs(parseFloat(cantidad));
        return this.saldo;
    }

    reintegro (cantidad){
        this.saldo=this.saldo - Math.abs(parseFloat(cantidad));
        return this.saldo;
    }

    ingresoInteresMes (){
        this.saldo =parseFloat((this.saldo + (this.saldo*this.interesAnual)/12).toFixed(2));
        return this.saldo;
    }

    enRojos (){
        if(this.saldo<0){
            return true;
        }else{
            return false;
        }
    }
    leerSaldo(){
        return this.saldo;
    }
    
    leerCliente(){
        return this.titular.nombre+" "+this.titular.apellidos;
    }
}

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