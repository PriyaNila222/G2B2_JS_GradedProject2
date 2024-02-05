let pageNumber = 0;
let size = 0;

let previous = document.getElementById('previous');
let next = document.getElementById('next');
let error = document.getElementById('error');
let template = document.getElementById('template');

async function searchValue(status) {    
    let searchVal = document.getElementById('search').value;
    if (status === "next") {
        pageNumber = pageNumber + 1;
    } else if (status === "previous") {
        pageNumber = pageNumber - 1;
    }

    await fetch('http://localhost:3000/resume/')  
    
        .then(respose => respose.json())
        .then(valueSet => {
            findSize(valueSet)
            

            if (searchVal.length == 0) {
                controller();
                updatePage(valueSet);
                
            } else {
                var valueSet = Object.values(valueSet).filter(value => {
                    return value.basics.AppliedFor.toLowerCase() === searchVal.toLowerCase();
                });
                findSize(valueSet);
                console.log("Filter\n"+"status: "+status +"\nsearch value: "+searchVal+"\n"+"next: "+pageNumber+"\nSize: "+size)
                
                controller();
                if (size > -1) {
                    updatePage(valueSet);
                    
                }
            }
        })
        .catch(error => console.log(error.message))
}

const controller = function(){
    if(size == -1){
        previous.style.visibility = 'hidden'
        next.style.visibility = 'hidden'
        template.style.display = 'none'
        error.style.display = 'block'       
    }
    else if(size == 0){
        previous.style.visibility = 'hidden'
        next.style.visibility = 'hidden'
        template.style.display = 'block'
        error.style.display = "none"
    }
    else if(size > 0){
        error.style.display = "none"
        if(pageNumber==0){
            previous.style.visibility = 'hidden'
            next.style.visibility = 'visible'
            template.style.display = 'block'
        }
        else if(pageNumber == size){
            previous.style.visibility = 'visible'
            next.style.visibility = 'hidden'
            template.style.display = 'block'
        }
        else{
            previous.style.visibility = 'visible'
            next.style.visibility = 'visible'
            template.style.display = 'block'
        }
    }
}

const findSize = function(value){
    size = Object.keys(value).length-1
}

const updatePage = function(value){
    header(value[pageNumber])
    sidebar(value[pageNumber])
    mainPage(value[pageNumber])
    projects(value[pageNumber])
    education(value[pageNumber])
    internship(value[pageNumber])
    achievements(value[pageNumber])
}

const header = function(value){

    var code = `
        <div>
            <h3 id="Name">${value.basics.name}</h3>
            <h4 id="Designation">Applied For : ${value.basics.AppliedFor}</h4>
        </div>
        <i class="fas fa-user" style="font-size: 100px; margin-right : 10%"></i>
    `
    document.getElementById('header').innerHTML = code
}

const sidebar = function(value){

    var techSkills = ``;
    var hobbies = ``;

    value.skills.keywords.map((item)=>{techSkills+=`<li>${item}</li>`})
    value.interests.hobbies.map((item)=>{hobbies+=`<li>${item}</li>`})

    var code = `
        <!-- 1. Contact -->
        <article class="objective1">
            <p class="label">Personal Information</p>
            <ul class="detailsList">
                <li>${value.basics.phone}</li>
                <li>${value.basics.email}</li>
                <li><a href=${value.basics.profiles.url} target="blank">LinkedIn</a></li>
            </ul>
        </article>
        
        
        <!-- 2. Technical Details -->
        <article class="objective1">
            <p class="label">Technical Skills</p>
            <ul class="detailsList">
                ${techSkills}
            </ul>
        </article>

        <!-- 3. Hobbies -->
        <article class="objective1">
            <p class="label">Hobbies</p>
            <ul class="detailsList">
                ${hobbies}
            </ul>
        </article>
    `
    document.getElementById('leftpage').innerHTML = code
}

const mainPage = function(value){

    var ele =  ``;
    var props = Object.getOwnPropertyNames(value.work)
    var vals = Object.values(value.work)
    vals.map((item, ind) => {
        ele+= `<p><b>${props[ind]}: </b> ${item}</p>`
    });
    document.getElementById('work-details').innerHTML = ele
}

const projects = function(value){
    var code = `
        <p><b>${value.projects.name}</b> : ${value.projects.description}</p>
    </ul>
    `
    document.getElementById('projects').innerHTML = code
}

const education = function(value){

    var ele =  ``;
    var vals = Object.values(value.education)
    var eds = ["UG", "PU", "High School"]
    vals.map((item,ind)=>{

        var names = Object.values(item)
        console.log(names)
        ele+=`<li><b>${eds[ind]}:</b> `
        
        names.map((element)=>{ele+=`${element}, `})

        // removing trailing  comma and space
        if (ele.endsWith(', ')) {
            ele = ele.slice(0, -2);
        }
        ele+=`</li>`
    })
    document.getElementById('education').innerHTML = ele
}

const internship  = function(value){
    var ele = ``;
    var props = Object.getOwnPropertyNames(value.Internship)
    var vals = Object.values(value.Internship)
    vals.map((item, ind) => {
        ele+= `<li><b>${props[ind]}: </b> ${item}</li>`
    });
    document.getElementById('internship').innerHTML = ele
}

const achievements  = function(value){
    var ele=``;   
    value.achievements.Summary.map((item)=>{ele+=`<li>${item}</li>`})
    console.log(ele)
    document.getElementById('achievements').innerHTML = ele
}

