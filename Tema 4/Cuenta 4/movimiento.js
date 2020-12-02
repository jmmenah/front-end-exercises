class Movimiento{
    constructor(tipo,importe,saldo){
        this.fecha=new Date(Date.now());
        this.tipo=tipo;
        this.importe=Math.abs(importe);
        this.saldo=saldo;
    }
}