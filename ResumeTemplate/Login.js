window.history.forward();

function noBack(){
    window.history.forward();
}

localStorage.setItem("credentials",JSON.stringify({name:["priya","nila"], passcode:["welcome123","smiley123"]}));

let login_details = localStorage.getItem("credentials");
console.log(login_details);

function validate(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    
    var cred = JSON.parse(login_details)   
    
    
   cred.name.map((item, index)=>{        
        
        if(username === item && password === cred.passcode[index]){
            location.href="Resume.html"
        }
        else{
            console.log("Invalid username and password")
            document.getElementById("error").innerHTML = "Invalid username and password"
        }
    })
}