// GitHub API

const baseURL = "https://api.github.com";

let position = 0;
let elementUl = "";
let elementLi = "";
let elementA = "";

document.querySelector(".owner").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    elementUl.innerHTML = "";
    position = document.querySelector(".owner").value;
    console.log(position);

    const gitHubApi = async () => {
      try {
        const response = await fetch(`${baseURL}/repositories`);
        const wholeResponse = await response.json();
        // console.log(wholeResponse);
        return wholeResponse;
      } catch (error) {
        console.log(error);
      }
    };

    async function getLogin(position) {
      const newList = await gitHubApi();
      const mapOwnerList = newList[position].owner.login;
      return mapOwnerList;
    }

    async function getAvatar(position) {
      const newList = await gitHubApi();
      const mapAvatar = newList[position].owner.avatar_url;
      return mapAvatar;
    }

    const newName = async (position) => {
      const changeName = await getLogin(position);
      return changeName.charAt(0).toUpperCase() + changeName.slice(1);
    };

    const changeH2 = async (currentName, newName) => {
      const theNewName = await newName;
      const newCurrentName = document.querySelector(currentName);
      newCurrentName.textContent = theNewName;
    };

    const changeAvatar = async (currentAvatar, newAvatar) => {
      const theNewAvatar = await newAvatar;
      const newCurrentAvatar = document.querySelector(currentAvatar);
      newCurrentAvatar.src = theNewAvatar;
    };

    const getRepositories = async (position) => {
      const repositories = await gitHubApi();
      const selectedRepositorie = repositories[position].owner.repos_url;
      const endpointRepo = await fetch(`${selectedRepositorie}`);
      const jsonResponse = await endpointRepo.json();
      const firstFiveRepo = jsonResponse.slice(0, 5);

      const reposURL = firstFiveRepo.map((URLs) => URLs.html_url);
      // console.log(reposURL);

      return reposURL;
    };

    const createRepoLinks = async (array) => {
      const newArray = await array;

      newArray.forEach((theUrl) => {
        elementUl = document.querySelector(".repos-list");
        elementLi = document.createElement("li");
        elementA = document.createElement("a");
        elementA.href = theUrl;
        elementA.textContent = theUrl;
        elementUl.appendChild(elementLi);
        elementLi.appendChild(elementA);
      });

      const child = elementUl.children;
      console.log(child);
    };

    changeH2(".username", newName(position));
    changeAvatar("#avatar", getAvatar(position));
    getRepositories(position);
    createRepoLinks(getRepositories(position));
  }
});
