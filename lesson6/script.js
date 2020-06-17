

let game = function (){


	let isNumber = function(n){

	  return !isNaN(parseFloat(n)) && isFinite(n)

	};
    
    let attempts = 10;
    let stop = 0;
	
	let Num = Math.floor(Math.random() * 100) + 1;


  function go(){
     
	if(attempts>0){

				let userNum = +prompt("Угадай число от 1 до 100");


					if(isNumber(userNum)&&userNum>0){

						attempts--;

							     	if(userNum > Num){

							     	 	alert("Загаданное число меньше, осталось "+attempts+" попыток")

							     	}else if(userNum < Num){

							     	 	alert("Загаданное число больше, осталось "+attempts+" попыток")

							     	}else if(userNum === Num){

							     	  	let starter = confirm("Поздравляю, Вы угадали!!! Хотели бы сыграть еще?")

							     	  	if(!starter){
							     	  	 stop=1;
							     	  	}else{

							     	  	  Num = Math.floor(Math.random() * 100) + 1;
							     	  	  attempts = 10;

							     	  	}
							     	}



						     }else if(userNum!== 0){

						      alert("Введи число!")

						     }else{
						        alert("До свидания игра окончена!")
						     	stop= 1;
						     }
			           
			     userNum = 0;


			    if(!stop){
			     go();
			    }

	    }else{

	     	let restart = confirm("Попытки закончились, хотите сыграть еще?");
	     	console.log(restart)

	     	if(!restart){
	     	  stop =1;
	     	}else{
	     	  attempts =10;
	     	  Math.floor(Math.random() * 100) + 1;
	     	  go();
	     	}

	    }
	}

	go();
}

game();


