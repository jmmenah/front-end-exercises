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


    ingresoInteresMes (){
        let cantidad=((this.saldo*this.interesAnual)/12).toFixed(2);
        let saldo=parseFloat((this.saldo + cantidad/12).toFixed(2));
        this.saldo =saldo;
        this.movimientos.push(new Movimiento("M",Math.abs(parseFloat(cantidad)),saldo));
        return this.saldo;
    }

    leerSaldo(){
        return this.saldo;
    }
    
    transferirHasta(cuenta, cantidad){
        let saldo=this.saldo - Math.abs(parseFloat(cantidad).toFixed(2));
        this.saldo=saldo;
        this.movimientos.push(new Movimiento("T",Math.abs(parseFloat(cantidad)),saldo));
        cuenta=Object.assign(new Cuenta,cuenta);
        cuenta.ingreso(Math.abs(parseFloat(cantidad).toFixed(2)));
        return this.saldo;
    }
}

