
document.addEventListener('click', ev => {
    if      (ev.target.matches('#disco')) vaciar("disco");
    else if (ev.target.matches('#autor')) vaciar("autor");
    else if (ev.target.matches('#guardar')) guardar();
  });

const vaciar = (id) => {
    document.getElementById(id).value = "";
}
let disco = {nombre:"",autor:""};

const guardar = () => {
    disco.nombre=document.getElementById("disco").value;
    disco.autor=document.getElementById("autor").value;
    disco.año=document.getElementById("año").value;
    
    let radios = document.getElementsByName('tipo');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
          
          disco.tipo=radios[i].value;

          break;
        }
      }

    disco.localizacion=document.getElementById("local").value;

    let radios2 = document.getElementsByName('prestamo');
    for (let j = 0, length = radios.length; j < length; j++) {
        if (radios2[j].checked) {
          
          disco.prestado=Boolean(radios2[j].value);

          break;
        }
      } 
}
