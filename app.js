"use strict"

//DOM
const CardElement = document.querySelector(".user-profile");
const SearchForm = document.querySelector('form');
const SearchElement = document.querySelector('#search');

// function name: getData
// make api a call to gihub api to get the user info 
async function getData(username){
    const result =  fetch(`https://api.github.com/users/${username}`);

    //error check
    if((await result).status === 200){
        return (await result).json();
    } else{
        return null;
    } 
}

// function name: getRepos
// get popular repositories
async function getRepos(username='mansurmansur'){
    let repos = null;

   const result = fetch(`https://api.github.com/users/${username}/repos`);

   if((await result).status === 200){
    return (await result).json();
   } else {
    return null;
   }
}

//render the profile
async function renderProfile(username){
    //make the calls
    const userData = await getData(username);
    const repos = await getRepos(username);
    //update if the data is fetched
    if (userData !== null && repos !== null) {
      let temp = ``;
      repos.forEach((element) => {
        temp += `<a href="${element["html_url"]}>${element["name"]}</a>`;
      });
      let userCard = `
        <div class="card">
            <div class="profile-image">
                <img src=${userData["avatar_url"]} class="avatar" alt="">
            </div>
            <div class="profile-info">
                <div>
                    <p class="name">${userData["name"]}</p>
                </div>
                <div>
                    <p class="bio">
                        ${userData["bio"]}
                    </p>
                </div>
                <div class="more-info">
                    <p><span class="followers"> ${userData["following"]}</span> Following</p>
                    <p><span class="following"> ${userData["followers"]}</span> Followers</p>
                    <p><span class="Repos">${userData["public_repos"]}</span> Repos</p>
                </div>
                <div class="links">
                ${temp}
                </div>
            </div>
        </div>
        `;
       CardElement.innerHTML = userCard;

       return true;
    } else{
        return false;
    }
}

// implement search function
SearchForm.addEventListener('submit', ev => {
    ev.preventDefault();

    //get input value
    //the lenght should be not more than 39 characters
    if(SearchElement.value != ''){
        renderProfile(SearchElement.value);
    } else{

    }
})