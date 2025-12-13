const params = new URLSearchParams(window.location.search);
const num = params.get("num");
const main = document.querySelector("main");
const projects_btn = document.querySelector("#projects-btn");
const menu_close = document.querySelector("#menu-close");
const menu_speed = 2;
const projects = document.getElementById("projects");

// const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
fetch("./data/subjects.json")
.then(res => res.json())
.then(data => {
    document.querySelector("title").innerHTML = data.subjects[num - 1].name;
    document.querySelector("#title").innerHTML = data.subjects[num - 1].name;
    document.querySelector("#title2").innerHTML = num + " : " + data.subjects[num - 1].name2;
    document.querySelector("#motto").innerHTML = data.subjects[num - 1].motto;
    document.querySelector("#quote").innerHTML = data.subjects[num - 1].quote;
    //i represents each project
    //j represents each section inside one project
    for(let i = 0; i < data.subjects[num - 1].projects.length; i++){
        document.querySelector("#projects").insertAdjacentHTML("beforeend",`<a href="#` + (i + 1) + `" class= "project" onclick="goToProject(` + (i + 1) + `)"><span class="project-num">` + (i + 1) + `</span>` + data.subjects[num - 1].projects[i].name + `</a>`);
        main.insertAdjacentHTML("beforeend",
        `<section class="project-sect" id="` + (i + 1) + `">
            <div style="position:relative;">
                <div class="scroller"></div>
                <h2 class="slide-in-u">` + data.subjects[num - 1].projects[i].name +`</h2>
            </div>
        </section>`);
        for(let j = 0; j < data.subjects[num - 1].projects[i].sections.length; j++){
            if(data.subjects[num - 1].projects[i].sections[j].type == "vid"){
                document.getElementById(i+1).insertAdjacentHTML("beforeend",
                `<div class="vid-cont">
                    <div class="scroller"></div>
                    <h3 class="slide-in-r">` + data.subjects[num - 1].projects[i].sections[j].title + `</h3>
                    <iframe class="slide-in-r"  allowfullscreen src="` + data.subjects[num - 1].projects[i].sections[j].link + `" frameborder="0"></iframe>
                </div>`);
            }
        }
    }
    //scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }else{
                // entry.target.classList.remove('visible');
                // maybe, maybe not
            }
    });});
    document.querySelectorAll('.scroller').forEach(el => observer.observe(el));
});
//open menu
projects_btn.addEventListener("click",()=>{
    projects_btn.style.pointerEvents = "none";

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

    for(let i = 0; i < projects.children.length; i++){
        projects.children[i].style.opacity = "0";
        projects.children[i].style.pointerEvents = "none";
        resetAnim(projects.children[i]);
        projects.children[i].style.animation = "slide-in-r " + (.5 / menu_speed) + "s ease-in-out forwards";
        projects.children[i].style.animationDelay = (1.7 / menu_speed) + (.15 * i / menu_speed) + "s";
    }
    
    setTimeout(() => {
        menu_close.style.pointerEvents = "all"
        for(let i = 0; i < projects.children.length; i++){
            projects.children[i].style.pointerEvents = "all";
        }
    },3050/menu_speed);
});
menu_close.addEventListener("click",close_menu);
//close menu
function close_menu(){
    for(let i = projects.children.length - 1,x = 0; i > -1; i--,x++){
        projects.children[i].style.opacity = "1";
        resetAnim(projects.children[i]);
        projects.children[i].style.animation = "slide-in-r " + (.5 / menu_speed) + "s ease-in-out reverse forwards";
        projects.children[i].style.animationDelay = (.15 * x / menu_speed) + "s";
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
        projects_btn.style.pointerEvents = "all";
    },3800/menu_speed);
}
//resets animations to apply them again
function resetAnim(element){
    element.style.animation = "none";
    element.offsetHeight;
}
function goToProject(proj){
    const sections = document.getElementsByClassName("project-sect");
    for(let i = 0; i < sections.length; i++){
        sections[i].style.display = "none";
    }
    document.getElementById(proj).style.display = "flex";
    close_menu();
}
document.querySelector("#header-cont").addEventListener("click",()=>{
    window.location.href = "../index.html"
});