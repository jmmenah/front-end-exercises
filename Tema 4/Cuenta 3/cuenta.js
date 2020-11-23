class Cuenta {
    constructor(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual){
        this.numero=numero;
        this.titular=new Cliente(nombre,apellidos,direccion,localidad,fNacimiento);
        this.saldo=saldo;
        this.interesAnual=interesAnual;
        this.movimientos=new Array(0);

    }

    ingreso (cantidad){
        let saldo=this.saldo + Math.abs(parseFloat(cantidad).toFixed(2));
        this.saldo=saldo;
        this.movimientos.push(new Movimiento("I",Math.abs(parseFloat(cantidad)),saldo));
        return this.saldo;
    }

    reintegro (cantidad){
        let saldo=this.saldo - Math.abs(parseFloat(cantidad).toFixed(2));
        this.saldo=saldo;
        this.movimientos.push(new Movimiento("R",Math.abs(parseFloat(cantidad)),saldo));
        return this.saldo;
    }

    ingresoInteresMes (){
        let cantidad=((this.saldo*this.interesAnual)/12).toFixed(2);
        let saldo=parseFloat((this.saldo + cantidad/12).toFixed(2));
        this.saldo =saldo;
        this.movimientos.push(new Movimiento("M",Math.abs(parseFloat(cantidad)),saldo));
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

