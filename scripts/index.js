const bubbles = document.getElementsByClassName('bubble');
const backbround = document.getElementById("background");
for(let i = 0; i < 30; i++){ 
    backbround.innerHTML += '<div class="bubble"></div>';
}
for(let i = 0; i < bubbles.length; i++){
    bubbles[i].style.left = Math.random() * 100 + "%";
    bubbles[i].style.top = Math.random() * 100 + "%";
    // bubbles[i].style.left = 0;
    // bubbles[i].style.top = 0;
}
requestAnimationFrame(float);
function float(){
    for(let i = 0; i < bubbles.length; i++){
        //get the current position
        let left = parseFloat(bubbles[i].style.left);
        let top = parseFloat(bubbles[i].style.top);
        //add small random movement
        left += (Math.random() * 2 - 1) * .5;
        top  += (Math.random() * 2 - 1) * .5;
        //clamp the positons so it doesnt leave the screen
        left = Math.max(0, Math.min(100, left));
        top  = Math.max(0, Math.min(100, top));
        //apply position
        bubbles[i].style.left = left + "%";
        bubbles[i].style.top = top + "%";
    }
    requestAnimationFrame(float);
}