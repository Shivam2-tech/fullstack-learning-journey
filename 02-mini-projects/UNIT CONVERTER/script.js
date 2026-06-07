function convert(){
    let num=document.getElementById("value").value;
    let conversion=document.getElementById("Conversion").value;
    let res=0;
    if(conversion==="KmToM"){
        res=num/1.069;
    }
    else{
        res=num*1.069;
    }

    document.getElementById("result").innerText="Result:"+ res;
}

convert();