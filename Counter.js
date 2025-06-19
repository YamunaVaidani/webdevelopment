let counterElement= document.getElementById("counterValue");

function onDecre(){
 let prValue = counterElement.textContent;
 let updValue = parseInt(prValue) - 1;
 counterElement.textContent=updValue;  //here we use textContent to mainpulate the text
 console.log(updValue);// to print the console we use it 
 if(updValue>0){
   counterElement.style.color="green";//by using variable we can change each style and color of that number

 }
 else if(updValue<0){
    counterElement.style.color="red";
 }
 else{
    counterElement.style.color="black";
 }

}
function onReset(){
 let updValue=0;
 counterElement.textContent=updValue;
 if(updValue>0){
   counterElement.style.color="green";

 }
 else if(updValue<0){
    counterElement.style.color="red";
 }
 else{
    counterElement.style.color="black";
 }

}
function onIncre(){
 let prValue = counterElement.textContent;
 let updValue = parseInt(prValue) +1;
 counterElement.textContent=updValue;
 console.log(updValue);
 if(updValue>0){
   counterElement.style.color="green";

 }
 else if(updValue<0){
    counterElement.style.color="red";
 }
 else{
    counterElement.style.color="black";
 }

}