  document.addEventListener('click', ev => {
    if      (ev.target.matches('#pantalla')) vaciar();
    else if (ev.target.matches('#cuadrado')) cuadrado();
    else if (ev.target.matches('#mod')) mod();
    else if (ev.target.matches('#fact')) fact();
    else if (ev.target.matches('#sum')) sum();
    else if (ev.target.matches('#resta')) resta();
    else if (ev.target.matches('#multiplicacion')) mult();
    else if (ev.target.matches('#division')) div();
    else if (ev.target.matches('#igual')) igual();
    else if (ev.target.matches('#sumatorio')) sumatorio();
    else if (ev.target.matches('#ordenar')) ordenar();
    else if (ev.target.matches('#revertir')) revertir();
    else if (ev.target.matches('#quitar')) quitar();
  });

  const vaciar = () => {
    document.getElementById("pantalla").value = "";
  }

  const r_info = () => {
    let num = document.getElementById("pantalla");
    let texto = document.getElementById("info");
    if(num.value<100){
      texto.innerHTML="Info: El resultado es menor que 100";
    }
    else if(num.value>200){
      texto.innerHTML="Info: El resultado es superior a 200";
    }
    else{
      texto.innerHTML="Info: El resultado está entre 100 y 200";
    }
  }

  const cuadrado = () => {
    let num = document.getElementById("pantalla");
    valido = validar_num();
    if(valido){
      num.value = num.value * num.value;
      r_info();
    }
  }

  const mod = () => {
    let num = document.getElementById("pantalla");
    valido = validar_num();
    if(valido){
      if(num.value<0){
        num.value=num.value*(-1);
      }
      else{
        num.value=num.value;
      }
      r_info();
    }
  }

  const fact = () => {
    let num = document.getElementById("pantalla");
    valido = validar_num();
    if(valido){
      factor=1;
      for(i=1;i<=num.value;i++){
        factor=factor*i;
      }
      num.value=factor;
      r_info();
    }
  }

  const sum = () => {
    valido = validar_num();
    if(valido){
      operandoa = document.getElementById("pantalla").value;
      operacion = "+";
      vaciar();
    }
  }

  const resta = () => {
    valido = validar_num();
    if(valido){
      operandoa = document.getElementById("pantalla").value;
      operacion = "-";
      vaciar();
    }
  }

  const mult = () => {
    valido = validar_num();
    if(valido){
      operandoa = document.getElementById("pantalla").value;
      operacion = "*";
      vaciar();
    }
  }

  const div = () => {
    valido = validar_num();
    if(valido){
      operandoa = document.getElementById("pantalla").value;
      operacion = "/";
      vaciar();
    }
  }

  const igual = () => {
    valido = validar_num();
    if(valido){
      operandob = document.getElementById("pantalla").value;
      resolver();
      r_info();
    }
  }

  const resolver = () => {
    res=document.getElementById("pantalla");
    valido = validar_num();
    if(valido){
      switch(operacion){
        case "+":
        res.value = parseFloat(operandoa) + parseFloat(operandob);
        break;
        case "-":
        res.value = parseFloat(operandoa) - parseFloat(operandob);
        break;
        case "*":
        res.value = parseFloat(operandoa) * parseFloat(operandob);
        break;
        case "/":
        res.value = parseFloat(operandoa) / parseFloat(operandob);
        break;
      }
    }
    
  }   

  const sumatorio = () => {
    let numeros = document.getElementById("pantalla").value.split(",");
    valido=validar_num_arr();
    if(valido){
      sumandos=0;
      for(i=0;i<numeros.length;i++){
        sumandos=sumandos+parseInt(numeros[i]);
      }
      document.getElementById("pantalla").value=sumandos;
    }
  }

  const ordenar = () => {
    valido=validar_num_arr();
    if(valido){
      let numeros = document.getElementById("pantalla").value.split(",");
      document.getElementById("pantalla").value = numeros.sort();
    }
  }

  const revertir = () => {
    valido=validar_num_arr();
    if(valido){
      let numeros = document.getElementById("pantalla").value.split(",");
      document.getElementById("pantalla").value = numeros.reverse();
    }
  }

  const quitar = () => {
    valido=validar_num_arr();
    if(valido){
      let numeros = document.getElementById("pantalla").value.split(",");
      document.getElementById("pantalla").value = numeros.slice(0,-1);
    }
  }
  const validar_num = () =>{
    let num = document.getElementById("pantalla");
    if(isNaN(num.value)){
      document.getElementById("pantalla").value="Error";
      return false;
    }
    return true;
  }
  const validar_num_arr = () =>{
    let numeros = document.getElementById("pantalla").value.split(",");
    for(i=0;i<numeros.length;i++){
      if(isNaN(numeros[i])){
        document.getElementById("pantalla").value="Error";
        return false;
      }
    }
    return true;
  }