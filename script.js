const SearchBox=document.querySelector('.SearchBox');
const searchButton=document.querySelector('.searchButton');
const receipeContainer=document.querySelector('.receipecontainer');
const receipeCloseBtn=document.querySelector('.receipe-close-btn');
const receipeContentDetails=document.querySelector('.receipe-content-details');

// successfully connected to API and fetch receipes 
const getReceipes=async (query)=>{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    receipeContainer.innerHTML="";
    console.log(response);
    console.log(response.meals.forEach(meal => {
        const receipeDiv=document.createElement('div');
        console.log(meal);
        // add the class to the div for styling 
        receipeDiv.classList.add('receipe');
        receipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>is a <span>${meal.strArea}</span> dish</p>
        <p>and belongs to <span>${meal.strCategory}</span> category</p>
        `;
        const receipeButton=document.createElement('button');
        receipeButton.textContent="veiw receipe";
        receipeDiv.appendChild(receipeButton);
        receipeContainer.appendChild(receipeDiv);
        receipeButton.addEventListener('click',()=>{
            receipeContentDetails.parentElement.style.display='block';
            showReceipe(meal);
        });
    }));

}
// function to fetch ingredients 
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        let ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            let measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} : ${ingredient}</li>`;
        }
        else
            break;
    }
    return ingredientsList;
}
const showReceipe=(meal)=>{
    receipeContentDetails.innerHTML=`
    <h2 class="IngredientName">${meal.strMeal}</h2>
    <h3>Ingredients :</h3>
    <ul class="listElements">${fetchIngredients(meal)}</ul>
    <h3>steps : </h3>
    <p class="Instructions">${meal.strInstructions}</p>`
    ;
}
searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    receipeContainer.innerHTML="Fetching Receipes....";
    getReceipes(SearchBox.value.trim());
    // console.log("Button is clicked");
});

receipeCloseBtn.addEventListener('click',()=>{
    receipeContentDetails.parentElement.style.display='none';
});