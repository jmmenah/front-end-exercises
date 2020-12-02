class PlanPensiones extends Cuenta{

    constructor(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual,vencimiento,cotizacion,numeroCuentaOrigen){
        super(numero,nombre,apellidos,direccion,localidad,fNacimiento,saldo,interesAnual);
        this.vencimiento=new Date(Date.parse(vencimiento));
        this.cotizacion=cotizacion;
        this.nOrigen=nOrigen;
    }

    ingresoMes(cuentas,cantidad){
        super.transferirHasta(cuentas,Math.abs(parseFloat(cantidad).toFixed(2)));
    }
}