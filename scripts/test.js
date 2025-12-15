const params = new URLSearchParams(window.location.search);
const num = params.get("num");
const main = document.querySelector("main");
const questions = document.querySelector("#questions");
const form = document.querySelector("form");
const back = document.querySelector("#back");
let url;

if(num == null){
    window.location.href = "./index.html";
}
fetch("./data/subjects.json")
.then(res => res.json())
.then(data => {
    document.querySelector("title").innerHTML = data.subjects[num - 1].name + " : " + "أختبار";
    document.querySelector("#title").innerHTML = data.subjects[num - 1].name + " : " + "أختبار";
    url = data.subjects[num - 1].test;
    for(let i = 0; i < data.subjects[num - 1].questions.length; i++){
        let text_input = `<input placeholder="اكتب اجابتك هنا" type="text" name="q${i}_text" id="${i}" required>`;
        let dividor = "";
        let choose_input = 
        `<div class="choose-box">
            <div class="choice">
                <div class="radio-box">
                    <input name="q${i}_choose" type="radio" value="نعم" required>
                    <div class="radio"></div>
                </div>
                <label for="${i}">نعم<label>
            </div>
            <div class="choice">
                <div class="radio-box">
                    <input name="q${i}_choose" type="radio" value="لا" required>
                    <div class="radio"></div>
                </div>
                <label for="${i}">لا<label>
            </div>
        </div>`;
        switch(data.subjects[num - 1].questions[i].type){
            case"text":
                choose_input = "";
            break;
            case"choose":
                text_input = "";
            break;
            case"hybrid":
                dividor = `<div class="dividor"></div>`
            break;
        }
        questions.insertAdjacentHTML("beforeend",
            `
            <div class="question">
                <div class="scroller"></div>
                <div class="question-wrapper slide-in-r">
                    <label for="${i}"><span class="question-num">${i + 1}</span>${data.subjects[num - 1].questions[i].question}</label>
                    ${choose_input}
                    ${dividor}
                    ${text_input}
                </div>
            </div>
            `)
    }
    questions.insertAdjacentHTML("beforeend",
        `<div style="position:relative;">
            <div class="scroller"></div>
            <input type="submit" name="submit" value="أنهاء الأختبار" class="slide-in-r">
        </div>`)
    //scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
    });});
    setTimeout(()=>{
        document.querySelectorAll('.scroller').forEach(el => observer.observe(el));
    },800);
});
document.querySelector("#header-cont").addEventListener("click",()=>{
    window.location.href = "./index.html";
});
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let data = new FormData(form);
    console.log(Object.fromEntries(data.entries()));
    fetch(url, {
        method: "POST",
        body: data
    }).then(() => console.log("sent"))
    .catch(err => console.error(err));
});
back.addEventListener("click",()=>{
    window.location.href = "./subject.html?num=" + num;
});