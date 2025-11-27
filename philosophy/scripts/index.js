const blobs = document.getElementsByClassName('blob');
for(let i = 0; i < blobs.length; i++){
    blobs[i].style.left = Math.random() * 100 + "%";
    blobs[i].style.top = Math.random() * 100 + "%";
    // blobs[i].style.left = 0;
    // blobs[i].style.top = 0;
}
setTimeout(float,1000);
function float(){
    console.log("asd")
    for(let i = 0; i < blobs.length; i++){
        blobs[i].style.left = Math.min(110, Math.max(-10, (parseFloat(blobs[i].style.left) + (Math.random() * 2 - 1) * 10))) + "%";
        blobs[i].style.top = Math.min(110, Math.max(-10, (parseFloat(blobs[i].style.top) + (Math.random() * 2 - 1) * 10))) + "%";
    }
    setTimeout(float,5000);
}