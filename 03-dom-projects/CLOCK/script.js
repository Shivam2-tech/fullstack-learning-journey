function hmm(){
    let date=new Date();

    let hours=date.getHours();
    let min=date.getMinutes();
    let sec=date.getSeconds();

    if(hours<10){
        hours="0"+hours;
    }
    if (min<10){
        min="0"+min;
    }
    if (sec<10){
        sec="0"+sec;
    }
    if(hours>12){
        hours=hours-12;
        document.getElementById("clock").innerHTML=hours+":"+min+":"+sec+"PM";
    }
    else{
        document.getElementById("clock").innerHTML=hours+":"+min+":"+sec+"AM";
    }
}
hmm();
   setInterval(hmm,1000);