let userName;
let userEmail;
let userAge;
let userPhone;
let userPassword;
let userRePassword;
let userNameAlert;
let userEmailAlert;
let userPasswordAlert;
let userPhoneAlert;
let userAgeAlert;
let userRePasswordAlert;

let arr = [];

/* START VALIDATION OF CONTACT US */


function nameValid(){
    return /^[a-zA-Z ]+$/.test(userName.value);
}
function emailValid(){
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}
function phoneValid(){
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value);
}
function ageValid(){
    return /^[1-9][0-9]?$|^100$/.test(userAge.value);
}
function passwordValid(){
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value);
}
function rePasswordValid(){
    return userRePassword.value == userPassword.value;
}
let nameToached = false;
let emailToached = false;
let ageToached = false;
let phoneToached = false;
let passwordToached = false;
let repasswordToached = false;

function validation(){

    if(nameToached){
        if(nameValid()){
            userName.classList.remove("is-invalid")
            userName.classList.add("is-valid")
            userNameAlert.classList.replace("d-block", "d-none")
            userNameAlert.classList.replace("d-block", "d-none")
        }
        else{
            userName.classList.replace("is-valid", "is-invalid")
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }
    if (emailToached){
        if(emailValid()){
            userEmail.classList.remove("is-invalid")
            userEmail.classList.add("is-valid")
            userEmailAlert.classList.replace("d-block", "d-none")
            userEmailAlert.classList.replace("d-block", "d-none")
        }
        else{
            userEmail.classList.replace("is-valid", "is-invalid")
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }
    if (phoneToached){
        if(phoneValid()){
            userPhone.classList.remove("is-invalid")
            userPhone.classList.add("is-valid")
            userPhoneAlert.classList.replace("d-block", "d-none")
            userPhoneAlert.classList.replace("d-block", "d-none")
        }
        else{
            userPhone.classList.replace("is-valid", "is-invalid")
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }   
    if (ageToached){
        if (ageValid()) {
            userAge.classList.remove("is-invalid")
            userAge.classList.add("is-valid")
            userAgeAlert.classList.replace("d-block", "d-none")
            userAgeAlert.classList.replace("d-block", "d-none")
        }
        else{
            userAge.classList.replace("is-valid", "is-invalid")
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }
    if (passwordToached){
        if(passwordValid()){
            userPassword.classList.remove("is-invalid")
            userPassword.classList.add("is-valid")
            userPasswordAlert.classList.replace("d-block", "d-none")
            userPasswordAlert.classList.replace("d-block", "d-none")
        }
        else{
            userPasswordAlert.classList.replace("is-valid", "is-invalid")
            userPasswordAlert.classList.replace("d-none", "d-block")
        }
    }
    if (repasswordToached){
        if(rePasswordValid){
            userRePassword.classList.remove("is-invalid")
            userRePassword.classList.add("is-valid")
            userRePasswordAlert.classList.replace("d-block", "d-none")
            userRePasswordAlert.classList.replace("d-block", "d-none")
        }
        else{
            userRePassword.classList.replace("is-valid" , "is-invalid");
            userRePasswordAlert.classList.replace("d-none" , "d-block");
        }
    }

    if(nameValid() && emailValid() && ageValid() && phoneValid() && passwordValid() && rePasswordValid()){
        document.getElementById("btn-submit").classList.remove("disabled")
    }
    
}
/* END VALIDATION OF CONTACT US */ 



/* START CATEGORIES SECTION */
 
search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
});


/*Start Fetch api's*/
async function getMeal(mealID) {
    $(".loading-container").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
    $(".loading-container").fadeOut(500)
}
async function filterByArea(area) {
    $(".loading-container").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loading-container").fadeOut(500)
}
async function getCategoriesApi(catogrieName){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/${catogrieName}`);
    api = await api.json();
    return api;
}
async function getIngredient(mealName){
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealName}`);
    meal = await meal.json();
    displayMeals(meal.meals);

}
async function filterByCategory(category) {
    $(".loading-container").fadeIn(100);
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loading-container").fadeOut(500)
}
async function search(meal){
    $(".loading-container").fadeIn(100);
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    meals = await meals.json()
    displayMeals(meals.meals);
    $(".loading-container").fadeOut(400);
    return meals;
}
async function getByLetter(letter) {
    if (letter) {
        $(".loading-container").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loading-container").fadeOut(100)
    }
}

/*End Fetch api's*/

function displayMeal(meal){
    let recipes = "";
    for(let i = 0; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) {
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` 
    }
    let str = `<div class="col-md-6 col-lg-4 mt-5 text-center">
    <img src="${meal.strMealThumb}" class="w-75" alt="">
    <br>
    <h2 class="text-white">${meal.strMeal}</h2>
</div>
<div class="col-md-8 mt-5 text-white">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <p><span class="fw-bolder">Area :</span> ${meal.strArea}</p>
    <p><span class="fw-bolder">Category  :</span> ${meal.strCategory}</p>
    <h3>Recipes :</h3>
    <ul class="d-flex flex-wrap" id="recipes">
    </ul>
    <h3>Tags : </h3>
    <ul class="d-flex" id="tags">
    </ul>

    <a href="${meal.strSource}" class="btn btn-success text-white" target="_blank">Source</a>
    <a href="${meal.strYoutube}" class="btn btn-danger text-white" target="_blank">Youtube</a>

</div>`
    document.getElementById("refreshRes").innerHTML = str;
    document.getElementById("recipes").innerHTML = recipes
    document.getElementById("tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
function displayMeals(arr){
    document.getElementById("refreshRes").innerHTML = "";
    let meals = "";
    for (let i = 0; i < arr.length; i++) {
        meals += `<div class="col-md-6 col-lg-3">
        <div class="food position-relative" onclick="getMeal('${arr[i].idMeal}')"">
            <div class="food-layer h-100  w-75 d-flex flex-column justify-content-center align-items-start p-4 rounded-2 ">
                <h4>${arr[i].strMeal}</h4>
            </div>
            <img src='${arr[i].strMealThumb}' class="w-75 rounded-2" alt="">
        </div>
    </div>`
    }
    document.getElementById("refreshRes").innerHTML = meals;
}
function displayIngredients() {
    let cartoona = "";
    for (var i = 0; i < arr.length; i++){
        cartoona += `<div class="card rounded-3 me-2 ingredients" style="width: 18rem;">
        <div class="card-body text-center" onclick="getIngredient('${arr[i].strIngredient}')">
            <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
            <h3 class="card-title text-white">${arr[i].strIngredient}</h3>
            <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
        </div>
    </div>`
    }
    document.getElementById("refreshRes").innerHTML = cartoona;
}

function displayCategories(){
    let cartoona = "";
    for(let i = 0; i < arr.length; i++){
        let ss = arr[i].strCategoryDescription;
        cartoona += `<div class="col-md-6 col-lg-4">
        <div class="food position-relative" onclick="filterByCategory('${arr[i].strCategory}')">
            <div class="food-layer h-100  w-75 d-flex flex-column text-center justify-content-center align-items-center p-4 rounded-2 overflow-hidden">
                <h2>${arr[i].strCategory}</h2>
                <p class="para" >${ss.substring(0,50)}</p>
            </div>
            <img src= '${arr[i].strCategoryThumb}' class="w-75 rounded-2" alt="">
        </div>
    </div>`
    
    }

    document.getElementById("refreshRes").innerHTML = cartoona;
}
function displayArea(){
    let cartoona = "";
    for (var i = 0; i < arr.length; i++){
        cartoona += `<div class="card bg-black rounded-3 me-2 area text-center" style="width: 18rem;">
        <div class="card-body text-center" onclick=(filterByArea('${arr[i].strArea}'))>
            <i class="fa-solid fa-city fa-5x text-danger"></i>
            <h2 class="card-title text-white">${arr[i].strArea}</h2>
        </div>
    </div>`
    }
    document.getElementById("refreshRes").innerHTML = cartoona;
}

/* END CATEGORIES SECTION */
function clearInput(){
    userName.value = "";
    userPassword.value = "";
    userPhone.value = "";
    userRePassword.value = "";
    userAge.value = "";
    userEmail.value = "";
    userName.classList.remove("is-valid");
    userAge.classList.remove("is-valid", "is-invalid");
    userPhone.classList.remove("is-valid", "is-invalid");
    userPassword.classList.remove("is-valid", "is-invalid");
    userRePassword.classList.remove("is-valid", "is-invalid");
    userEmail.classList.remove("is-valid", "is-invalid");
}
function hideSuccessful(){
    $("#successful").fadeOut(3000);
    document.getElementById("btn-submit").classList.add("disabled");
}
function displaySubmitForm(){
    $("#successful").fadeIn(3000);
    $(".loading-container").fadeIn(100);
    $(".loading-container").fadeOut(500);
    document.getElementById("successful").classList.remove("d-none");
    document.getElementById("login_status").innerHTML = userName.value;
    document.getElementById("emailUser").innerHTML = userEmail.value;
    hideSuccessful();
    clearInput();
    
}
$(".nav-tab-menu li a").click(function (e) {
    // $(".foods").hide();
    let click_event = new CustomEvent('click');
    document.querySelector('.strip-toggel-menu').dispatchEvent(click_event);
    e.preventDefault();
    listBy = $(this).data('list');

    if (listBy == "contact") {
        document.getElementById("search-container").innerHTML  = "";
        $(".loading-container").fadeIn(100)
        document.getElementById("refreshRes").innerHTML = `<section class="foods d-flex justify-content-around my-5 mx-5 py-5">
        <section class="contact container">
            <h4 class="text-white mb-5 text-center">
                Contact US...
            </h4>
    
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-4">
                        <input type="text" placeholder="Enter Your Name" class="form-control bg-transparent text-white input-data" id="userName" onkeyup="validation()">
                        <div id="userNameAlert" class=" d-none alert-danger alert" role="alert">Special Characters and Numbers not allowed</div>
                    </div>
                    <div class="mb-4">
                        <input type="text" placeholder="Enter Your Email Address" class="form-control bg-transparent text-white input-data" id="userEmail" onkeyup="validation()">
                        <div id="userEmailAlert" class=" d-none alert-danger alert" role="alert">Enter valid email. *Ex: xxx@yyy.zzz</div>
                    </div>
                    <div class="mb-4">
                        <input type="password" placeholder="Enter Your Password" class="form-control bg-transparent text-white input-data" id="userPassword" onkeyup="validation()">
                        <div id="userPasswordAlert" class=" d-none alert-danger alert" role="alert">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-4">
                        <input type="text" placeholder="Enter Your Phone Number" class="form-control bg-transparent text-white input-data" id="userPhone" onkeyup="validation()">
                        <div id="phoneAlert" class=" d-none alert-danger alert" role="alert">Enter valid Phone Number</div>
                    </div>
                    <div class="mb-4">
                        <input type="text" placeholder="Enter Your Age" class="form-control bg-transparent text-white input-data" id="userAge" onkeyup="validation()">
                        <div id="ageAlert" class=" d-none alert-danger alert" role="alert">Enter valid Age</div>
                    </div>
                    <div class="mb-4">
                        <input type="password" placeholder="Enter Confirm Password" class="form-control bg-transparent text-white input-data" id="userRepassword" onkeyup="validation()">
                        <div id="userRePasswordAlert" class=" d-none alert-danger alert" role="alert">Your Confirm Password doesn't match Password</div>
                    </div>
                </div>
                <div class="col-md-12 my-5 d-none" id="successful">
                <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Well done <span id="login_status" ></span> ! </h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr>
                <p class="mb-0">We Will Contact You Soon at <span id="emailUser" class="User"></span> </p>
                </div>
                </div>
                <div class="col-md-12 my-5">
                    <div class="text-center">
                        <button class="btn submit disabled" id="btn-submit" onclick="displaySubmitForm();">Submit</button>
                    </div>
                </div>
            </div>
        </section>
    </section>`
        userName = document.getElementById("userName");
        userEmail = document.getElementById("userEmail");
        userAge = document.getElementById("userAge");
        userPhone = document.getElementById("userPhone");
        userPassword = document.getElementById("userPassword");
        userRePassword =document.getElementById("userRepassword");
        userNameAlert = document.getElementById("userNameAlert");
        userEmailAlert = document.getElementById("userEmailAlert");
        userPasswordAlert = document.getElementById("userPasswordAlert");
        userPhoneAlert = document.getElementById("phoneAlert");
        userAgeAlert = document.getElementById("ageAlert");
        userRePasswordAlert = document.getElementById("userRePasswordAlert");

        userName.addEventListener("focus", () => {
            nameToached = true
        })
        userEmail.addEventListener("focus", () => {
            emailToached = true
        })
        userPhone.addEventListener("focus", () => {
            phoneToached = true
        })
        userAge.addEventListener("focus", () => {
            ageToached = true
        })
        userPassword.addEventListener("focus", () => {
            passwordToached = true
        })
        userRePassword.addEventListener("focus", () => {
            repasswordToached = true
        })
        
        $(".loading-container").fadeOut(500)
        
    }

    if (listBy == "search") {
        document.getElementById("refreshRes").innerHTML = "";
        document.getElementById("search-container").innerHTML = `<div class="row">
        <div class="searchWidth col-sm-12 col-md-6 mb-3">
            <input type="text" id="searchByName" class="form-control bg-transparent text-white w-100 text-center" placeholder="Search By Name...">
        </div>
        
        <div class="searchWidth col-sm-12 col-md-6">
            <input type="text" id="searchByFstLetter" class="form-control bg-transparent text-white w-100 text-center" placeholder="Search By Fisrst Letter...">
        </div>
    </div>`

        $("#searchByName").keyup((e) => {
            search(e.target.value)
        })
        $("#searchByFstLetter").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#searchByFstLetter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
        
        

    }
    (async function() {
        let x;
        if (listBy == "categories") {
            document.getElementById("search-container").innerHTML ="";
            $(".loading-container").fadeIn(100)
            x = await getCategoriesApi(listBy + ".php")
            arr = x.categories.splice(0, 20);
            displayCategories()
            $(".loading-container").fadeOut(500)
        } else if (listBy == "a") {
            document.getElementById("search-container").innerHTML ="";
            $(".loading-container").fadeIn(100)
            x = await getCategoriesApi("list.php?a=list")
            arr = x.meals.splice(0, 20);
            displayArea()
            $(".loading-container").fadeOut(500)
        } else if (listBy == "i") {
            document.getElementById("search-container").innerHTML ="";
            $(".loading-container").fadeIn(100)
            x = await getCategoriesApi("list.php?i=list")
            arr = x.meals.splice(0, 20);
            displayIngredients();
            $(".loading-container").fadeOut(500)
        }
    })()

});



/* START JQUERY FOR SIDE BAR */
let nvWidth = 0,
isTrue = true;

$(".strip-toggel-menu").click(function () {
if (isTrue) {
    ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
    (nvWidth = $(".nav-tab-menu").width() - 10),
    $(".strip-header-nav").css("left", nvWidth),
    $(".fa-align-justify").toggleClass("fa-times"),
    $(".nav-tab-menu .item1").animate({ opacity: "1", paddingTop: "25px" }, 1100),
    $(".nav-tab-menu .item2").animate({ opacity: "1", paddingTop: "25px" }, 1200),
    $(".nav-tab-menu .item3").animate({ opacity: "1", paddingTop: "25px" }, 1300),
    $(".nav-tab-menu .item4").animate({ opacity: "1", paddingTop: "25px" }, 1400),
    $(".nav-tab-menu .item5").animate({ opacity: "1", paddingTop: "25px" }, 1500),
    $(".nav-tab-menu .item6").animate({ opacity: "1", paddingTop: "25px" }, 1600),
    (isTrue = false));
}else {
    ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
    $(".fa-align-justify").toggleClass("fa-times"),
    $(".strip-header-nav").css("left", 0),
    $(".nav-tab-menu li").animate({ opacity: "0", paddingTop: "500px" }, 500),
    (isTrue = true));
}

});
/* END JQUERY FOR SIDE BAR*/