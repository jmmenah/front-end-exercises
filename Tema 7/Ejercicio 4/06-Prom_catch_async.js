
const prom = async ()=>{
	if (Math.random() < 0.5){
		return "Exito";
	} else {
	  throw "Error";
	}
}

const main = async ()=>{
	try {
		let msg = await prom();
		console.log(msg);
	} catch (err) {
		console.log(err);
	}
}

main();


