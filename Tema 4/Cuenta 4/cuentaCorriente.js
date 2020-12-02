class CuentaCorriente extends Cuenta {
    
    constructor(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual){
        super(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual);
    }

    reintegro (cantidad){
        let saldo=this.saldo - Math.abs(parseFloat(cantidad).toFixed(2));
        this.saldo=saldo;
        this.movimientos.push(new Movimiento("R",Math.abs(parseFloat(cantidad)),saldo));
        return this.saldo;
    }
}