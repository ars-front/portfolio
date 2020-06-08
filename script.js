let lang,namePerson,access;

namePerson = "Артем";
lang = "en";




  let days = new Map([
    ['ru', ['Понедельник' , 'Вторник' , 'Среда' , 'Четверг' , 'Пятница' , 'Суббота' , 'Воскресенье']],
    ['en', ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]]
  ]);


  if(lang==="ru"){

    console.log(days.get("ru"));

  }else{

    console.log(days.get("en"));

  }



  switch(lang){

    case "ru":
        console.log(days.get("ru"));
        break;

    case "en":
        console.log(days.get("en"));
        break;

  }

  console.log(days.get(lang));

  console.log(namePerson=="Артем" ? "директор" : namePerson=="Максим" ? "преподаватель" : "студент")

