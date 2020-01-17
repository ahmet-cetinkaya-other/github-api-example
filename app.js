const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListener();

function eventListener() {
    document.addEventListener('DOMContentLoaded', getAllSearched);
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
}

function getAllSearched() {
    ui.loadAllSearched();
}

function getData(e) {
    const username = nameInput.value.trim();
    if (username !== "") {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message !== "Not Found") {
                    ui.addSearchedUserToUI(username, Storage.checkUserName(username));
                    Storage.addSearchedUser(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                } else ui.showError("User is not found.");
            })
            .catch(err => console.error(err));
    } else ui.showError("Enter a valid username.");
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {
    if (confirm("Are you sure?")) {
        Storage.clearAllSearchedUsers();
        ui.clearAllSearchedFromUI();
    }
}