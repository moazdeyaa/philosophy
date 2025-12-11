const stagger = document.getElementsByClassName("stagger");
const menu = document.getElementById("menu");
const menu_cont = document.getElementById("menu-cont");
const splitter = document.getElementById("splitter");
const subjects_btn = document.getElementById("subjects-btn");
const subjects = document.getElementById("subjects");
const menu_close = document.querySelector("#menu-close");
const menu_speed = 2;
//fetch data
fetch("../data/subjects.json")
.then(res => res.json())
.then(data => {
    for(let i = 0; i < data.subjects.length; i++){
        subjects.innerHTML +=`<button class= "subject" onclick="goToSubject(` + i + `)"><span class="subject-num">` + (i + 1) + `</span>` + data.subjects[i].name + `</button>`;
    }
});
//stagger animations function
for(let j = 0; j < stagger.length; j++){
    let arr = stagger[j].children;
    for(let i = 0; i < arr.length; i++){
        arr[i].style.animationDelay = 1.6 + .3 * i + "s";
    }
}
//open menu
subjects_btn.addEventListener("click",()=>{
    subjects_btn.style.pointerEvents = "none";

    splitter.style.animation = "none";
    splitter.style.opacity = "0";

    menu.style.animation = "menu-open " + (1.4 / menu_speed) + "s ease-in-out forwards";
    menu.style.pointerEvents = "all";

    document.querySelector(".menu-splitters.t").style.opacity = "0";
    resetAnim(document.querySelector(".menu-splitters.t"));
    document.querySelector(".menu-splitters.t").style.animation = "draw-in " + (.5 / menu_speed) + "s " + (.65 / menu_speed) + "s ease-in-out forwards";
    
    document.querySelector(".menu-splitters.b").style.opacity = "0";
    resetAnim(document.querySelector(".menu-splitters.b"));
    document.querySelector(".menu-splitters.b").style.animation = "draw-in " + (.5 / menu_speed) + "s " + (.65 / menu_speed) + "s ease-in-out forwards";

    if(getComputedStyle(menu).getPropertyValue("--mobile") == "yes"){
        document.querySelector(".menu-splitters.l").style.opacity = "0";
        resetAnim(document.querySelector(".menu-splitters.l"));
        document.querySelector(".menu-splitters.l").style.animation = "draw-in-h " + (.5 / menu_speed) + "s " + (.65 / menu_speed) + "s ease-in-out forwards";

        document.querySelector(".menu-splitters.r").style.opacity = "0";
        resetAnim(document.querySelector(".menu-splitters.r"));
        document.querySelector(".menu-splitters.r").style.animation = "draw-in-h " + (.5 / menu_speed) + "s " + (.65 / menu_speed) + "s ease-in-out forwards";
    }

    document.querySelector("#menu-cont h2").style.opacity = "0";
    resetAnim(document.querySelector("#menu-cont h2"));
    document.querySelector("#menu-cont h2").style.animation="slide-in-r " + (.5 / menu_speed) + "s " + (1.4 / menu_speed) + "s ease-in-out forwards";
    
    document.querySelector("#menu-logo").style.opacity = "0";
    document.querySelector("#menu-logo").style.animation="slide-in-d " + (.5 / menu_speed) + "s " + (1.4 / menu_speed) + "s ease-in-out forwards";

    menu_close.style.opacity = "0";
    resetAnim(menu_close);
    menu_close.style.animation="slide-in-l " + (.5 / menu_speed) + "s " + (1.4 / menu_speed) + "s ease-in-out forwards";
    menu_close.style.pointerEvents = "none";

    for(let i = 0; i < subjects.children.length; i++){
        subjects.children[i].style.opacity = "0";
        subjects.children[i].style.pointerEvents = "none";
        resetAnim(subjects.children[i]);
        subjects.children[i].style.animation = "slide-in-r " + (.5 / menu_speed) + "s ease-in-out forwards";
        subjects.children[i].style.animationDelay = (1.7 / menu_speed) + (.15 * i / menu_speed) + "s";
    }
    
    setTimeout(() => {
        menu_close.style.pointerEvents = "all"
        for(let i = 0; i < subjects.children.length; i++){
            subjects.children[i].style.pointerEvents = "all";
        }
    },3050/menu_speed);
});
//close menu
menu_close.addEventListener("click",()=>{
    for(let i = subjects.children.length - 1,x = 0; i > -1; i--,x++){
        subjects.children[i].style.opacity = "1";
        resetAnim(subjects.children[i]);
        subjects.children[i].style.animation = "slide-in-r " + (.5 / menu_speed) + "s ease-in-out reverse forwards";
        subjects.children[i].style.animationDelay = (.15 * x / menu_speed) + "s";
    }

    menu_close.style.opacity = "1";
    menu_close.style.pointerEvents = "none";
    resetAnim(menu_close);
    menu_close.style.animation="slide-in-l " + (.5 / menu_speed) + "s " + (1 / menu_speed) + "s ease-in-out reverse forwards";

    document.querySelector("#menu-cont h2").style.opacity = "1";
    resetAnim(document.querySelector("#menu-cont h2"));
    document.querySelector("#menu-cont h2").style.animation="slide-in-r " + (.5 / menu_speed) + "s " + (1 / menu_speed) + "s ease-in-out reverse forwards";

    document.querySelector("#menu-logo").style.opacity = "1";
    document.querySelector("#menu-logo").style.animation="slide-in-dr " + (.5 / menu_speed) + "s " + (1 / menu_speed) + "s ease-in-out forwards";

    document.querySelector(".menu-splitters.t").style.opacity = "1";
    document.querySelector(".menu-splitters.t").style.left = "0";
    resetAnim(document.querySelector(".menu-splitters.t"));
    document.querySelector(".menu-splitters.t").style.animation = "draw-in " + (.5 / menu_speed) + "s " + (1.75 / menu_speed) + "s ease-in-out reverse forwards";

    document.querySelector(".menu-splitters.b").style.opacity = "1";
    document.querySelector(".menu-splitters.b").style.left = "0";
    resetAnim(document.querySelector(".menu-splitters.b"));
    document.querySelector(".menu-splitters.b").style.animation = "draw-in " + (.5 / menu_speed) + "s " + (1.75 / menu_speed) + "s ease-in-out reverse forwards";

    if(getComputedStyle(menu).getPropertyValue("--mobile") == "yes"){
        document.querySelector(".menu-splitters.l").style.opacity = "1";
        document.querySelector(".menu-splitters.l").style.top = "0";
        resetAnim(document.querySelector(".menu-splitters.l"));
        document.querySelector(".menu-splitters.l").style.animation = "draw-in-h " + (.5 / menu_speed) + "s " + (1.75 / menu_speed) + "s ease-in-out reverse forwards";
        
         document.querySelector(".menu-splitters.r").style.opacity = "1";
        document.querySelector(".menu-splitters.r").style.top = "0";
        resetAnim(document.querySelector(".menu-splitters.r"));
        document.querySelector(".menu-splitters.r").style.animation = "draw-in-h " + (.5 / menu_speed) + "s " + (1.75 / menu_speed) + "s ease-in-out reverse forwards";
    }

    menu.style.opacity = "1";
    menu.style.left = getComputedStyle(menu).getPropertyValue("--left");
    menu.style.width = getComputedStyle(menu).getPropertyValue("--width");
    menu.style.height = getComputedStyle(menu).getPropertyValue("--height");
    resetAnim(menu);
    menu.style.animation = "menu-open " + (1.4 / menu_speed) + "s " + (2.4 / menu_speed) + "s ease-in-out reverse forwards";
    menu.style.pointerEvents = "none";
    setTimeout(() => {
        menu.style.opacity = "0";
        resetAnim(menu);
        splitter.style.opacity = "1";
        subjects_btn.style.pointerEvents = "all";
    },3800/menu_speed);
});
//clicking on a subject
function goToSubject(sbj){
    const url = "./subject pages/" + (sbj + 1) + ".html";
    fetch(url, { method: "HEAD" })
    .then(res => {
        if(res.ok){
            window.location.href = url;
        }
    });
}
//resets animations to apply them again
function resetAnim(element){
    element.style.animation = "none";
    element.offsetHeight;
}