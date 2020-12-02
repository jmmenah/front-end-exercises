class CuentaAhorroPFijo extends Cuenta{

    constructor(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual,vencimiento){
        super(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual);
        this.vencimiento=new Date(Date.parse(vencimiento));
    }
}