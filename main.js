// check email and password for login
let formLogin = document.querySelector('form')
let emailLogin = document.getElementById('emailLogin')
let passwordLogin = document.getElementById('passwordLogin')
let nameLogin = document.getElementById('nameLogin')
let typeLogin = document.getElementById('typeLogin')
let errorMessage = document.querySelector("form .invaild-password-email")
try{
    formLogin.onsubmit = function (e) {
        let result = true;
        if(JSON.parse(localStorage.users).length) {
            for(let i = 0; i < JSON.parse(localStorage.users).length; i++) {
                if(JSON.parse(localStorage.users)[i].email == emailLogin.value && JSON.parse(localStorage.users)[i].password == passwordLogin.value) {
                    result = false;
                    errorMessage.style.visibility = "hidden"
                    nameLogin.value = JSON.parse(localStorage.users)[i].fullname;
                    i = localStorage.length
                } else {
                    errorMessage.style.visibility = "visible"
                }
            }
            if(result) {
                e.preventDefault()
            }
        }else {
            e.preventDefault()
            errorMessage.style.visibility = "visible"
        }
    }
}catch {}

// print name and email in store page
let infoName = document.querySelector("header .container ul .info h4") 
let infoEmail = document.querySelector("header .container ul .info p") 
let logoutBtn = document.querySelector("header .container ul #logOut") 

try{
    if(location.search.length) {
        let arrInfo = location.search.split("&")
        let nameInfo = arrInfo[0].split("=")
        localStorage.setItem("nameUserNow", nameInfo[1].split("+").join(" "))
        infoName.innerHTML = localStorage.getItem("nameUserNow")
        let emailInfo = arrInfo[2].split("=")
        localStorage.setItem("emailUserNow", emailInfo[1].split("%40").join("@"))
        infoEmail.innerHTML = localStorage.getItem("emailUserNow")
        if(localStorage.getItem("emailUserNow")){
            logoutBtn.classList.remove('display-none')
        }
    } else {
        infoName.innerHTML = localStorage.getItem("nameUserNow")
        infoEmail.innerHTML = localStorage.getItem("emailUserNow")
        if(localStorage.getItem("emailUserNow")){
            logoutBtn.classList.remove('display-none')
        }
    }
}catch{}

// open close categories links
let categoriesClick = document.querySelector("header .container ul > li:nth-child(2)")
let categoriesList = document.querySelector("header .container ul > li ol")
try{
    categoriesClick.onclick = function () {
        if (categoriesClick.classList.contains("close")) {
            categoriesClick.className = "open"
            categoriesList.style.display = "block"
        }else {
            categoriesClick.className = "close"
            categoriesList.style.display = "none"
        }
    }
}catch{}

// log out to login page
let logOut = document.getElementById("logOut")
try{
    logOut.onclick = function () {
        localStorage.removeItem("nameUserNow")
        localStorage.removeItem("emailUserNow")
        location.replace("login.html")
        logoutBtn.classList.add('display-none')
    }
}catch{}


// Add api products to localstorage
let xml = new XMLHttpRequest()
xml.open("GET", "https://fakestoreapi.com/products")
xml.send()
xml.onreadystatechange = function () {
    if(this.status == 200 && this.readyState == 4) {
        if(!localStorage.getItem("products")){
            localStorage.setItem("products", this.response)
            localStorage.setItem("prdctsEdit", this.response)
        }
    }
}



// count of products in cart
let countOfProducts = document.querySelector("header .container ul .cart span")
if(localStorage.getItem("productsCart")) {
    countOfProducts.innerHTML = JSON.parse(localStorage.getItem("productsCart")).length
}

// Add products to localstorage cart
setTimeout(function() {
    let buttons = document.querySelectorAll("main section button")
    for(let btn of buttons) {
        btn.onclick = function () {
            let arr = []
            let result = true
            if(localStorage.getItem("productsCart")) {
                arr = JSON.parse(localStorage.getItem("productsCart"))
                for (let prdct of arr) {
                    if (btn.id == prdct.id) {
                        result = false
                    }
                }
            }
            for(let prdct of JSON.parse(localStorage.getItem("products"))){
                if(btn.id == prdct.id && result) {
                    arr.push(prdct)
                    localStorage.setItem("productsCart", JSON.stringify(arr))
                }
            }
            // count of products in cart
            countOfProducts.innerHTML = JSON.parse(localStorage.getItem("productsCart")).length
        }
    }
},1000)



// show crud if type login is admin

let emailUser = document.querySelector ("header ul li .info p")
let allUsers = JSON.parse(localStorage.getItem("users")) 
let type = ""
for(let i = 0; i < allUsers.length; i++) {
    if (emailUser.innerHTML == allUsers[i].email) {
        type = allUsers[i].type
    }
}
if (type == "admin") {
    document.querySelector("header ul .crud-button-users").style.display = "list-item"
    document.querySelector("header ul .crud-button").style.display = "list-item"
}