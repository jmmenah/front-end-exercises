
const prom = () => 
	new Promise((resolve, reject)=>{
		if (Math.random() < 0.5) {
			resolve("Exito");
		}	else {
			reject("Error");
		}
	})


	const main = async ()=>{
		try {
			let msg = await prom();
			console.log(msg);
		} catch (err) {
			console.log(err);
		}
	}
	
	main();
	
