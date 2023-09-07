"use strict"

//DOM
const CardElement = document.querySelector(".user-profile");
const SearchForm = document.querySelector('form');
const SearchElement = document.querySelector('#search');

// function name: getData
// make api a call to gihub api to get the user info 
async function getData(username){
    const result = fetch(`https://api.github.com/users/${username}`);
    
    result.then((response) => response.json()).then(
        //update info
        result => {
            let userCard = `
                                <div class="card">
                                    <div class="profile-image">
                                        <img src=${result['avatar_url']} class="avatar" alt="">
                                    </div>
                                    <div class="profile-info">
                                        <div>
                                            <p class="name">${result['name']}</p>
                                        </div>
                                        <div>
                                            <p class="bio">
                                                ${result['bio']}
                                            </p>
                                        </div>
                                        <div class="more-info">
                                            <p><span class="followers"> ${result['following']}</span> Following</p>
                                            <p><span class="following"> ${result['followers']}</span> Followers</p>
                                            <p><span class="Repos">${result['public_repos']}</span> Repos</p>
                                        </div>
                                        <div class="links">
                                        ${getRepos(username)}
                                        </div>
                                    </div>
                                </div>
                            `
            
            CardElement.innerHTML = userCard;

        }
    )
}

// function name: getRepos
// get popular repositories
async function getRepos(username){
   fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(list => {
        let temp = ``;

        list.forEach(link => {
        temp += `<a href="${link['html_url']}>${link['name']}</a>`})

        return temp;
     })
}

console.log(getRepos('mansurmansur'))

// implement search function
SearchForm.addEventListener('submit', ev => {
    ev.preventDefault();

    //get input value
    //the lenght should be not more than 39 characters

    if(SearchElement.value != ''){
        getData(SearchElement.value)
    } else{

    }
})