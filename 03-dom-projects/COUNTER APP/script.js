let count=0;

function inc(){
    
    count+=1;
    document.getElementById("result").innerText="Count:"+count;
}

function dec(){
    
    count-=1;
    document.getElementById("result").innerText="Count:"+count;

}
function reset(){
    count=0;
    document.getElementById("result").innerText="Count:"+count;
}