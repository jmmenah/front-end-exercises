class Cuenta {
    constructor(numero,titular,saldo,interesAnual){
        this.numero=numero;
        this.titular=titular;
        this.saldo=saldo;
        this.interesAnual=interesAnual;

    }

    ingreso (cantidad){
        this.saldo=this.saldo + parseFloat(cantidad);
        return this.saldo;
    }

    reintegro (cantidad){
        this.saldo=this.saldo - parseFloat(cantidad);
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
}
