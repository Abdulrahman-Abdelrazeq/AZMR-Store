let formRegister = document.querySelector('[action="congratulation.html"]')
let select = document.querySelector('form p select')
let correctOrError = document.querySelectorAll(".login-register .input")
let iconInput = document.querySelectorAll(".login-register .input .icon i")
// check name
let fullName = document.getElementById("nameRegister")
fullName.onblur = function () {
    let checkName = /^[a-z A-Z]{3,20}\s[a-z A-Z]{3,20}$/
    let testName = checkName.test(this.value)
    if(testName && this.value.split(" ").length < 4) {
        correctOrError[0].className = "correct-input input"
        iconInput[0].className = "fa-solid fa-check"
    } else {
        correctOrError[0].className = "error-input input"
        iconInput[0].className = "fa-solid fa-x"
    }
}
// check email
let email = document.getElementById("emailRegister")
let emailRegistered = document.querySelector(".login-register .emailRegistered")
email.onblur = function () {
    let checkEmail = /^[a-z][a-z 0-9 (-_.)]{3,40}@[a-z]{3,15}(.com|.net|.edu|.org)$/
    let testEmail = checkEmail.test(this.value)
    if(testEmail) {
        correctOrError[1].className = "correct-input input"
        iconInput[1].className = "fa-solid fa-check"
    } else {
        correctOrError[1].className = "error-input input"
        iconInput[1].className = "fa-solid fa-x"
    }
    for(let i = 0; i <= JSON.parse(localStorage.users).length; i++) {
        try{
            if(JSON.parse(localStorage.users)[i].email == this.value) {
                emailRegistered.style.visibility = "visible"
                i = localStorage.length
            } else {
                emailRegistered.style.visibility = "hidden"
            }
        }catch{}
    }
}
// check password
let passwords = document.getElementsByClassName("passwordRegister")
for(let i = 0; i < 2; i++) {
    window.onmousemove = function () {
        if (passwords[0].value == passwords[1].value) {
            correctOrError[2].className = "correct-input input"
            iconInput[2].className = "fa-solid fa-check"
        } else {
            correctOrError[2].className = "error-input input"
            iconInput[2].className = "fa-solid fa-x"
        }
        if (passwords[0].value.length >= 8 && passwords[1].value.length >= 8) {
            correctOrError[3].className = "correct-input input"
            iconInput[3].className = "fa-solid fa-check"
        } else {
            correctOrError[3].className = "error-input input"
            iconInput[3].className = "fa-solid fa-x"
        }
    }
}

// check all for register
formRegister.onsubmit = function (e) {
    let result = true;
    correctOrError.forEach(ele => {
        if(ele.classList.contains("error-input") || emailRegistered.style.visibility == "visible"){
            e.preventDefault()
            result = false
        }
    })
    if(result){
        if(localStorage.getItem("users")){
            let arr = JSON.parse(localStorage.getItem("users"))
            let newUser = {fullname: fullName.value, email: email.value, password: passwords[0].value, type: select.value}
            arr.push(newUser)
            localStorage.setItem(`users`, JSON.stringify(arr))
        }else{
            localStorage.setItem(`users`, JSON.stringify([{fullname: fullName.value, email: email.value, password: passwords[0].value, type: select.value}]))
        }
    }
}
