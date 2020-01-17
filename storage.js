class Storage {
    static getAllSearchedUsers() {
        if (localStorage.getItem("searched") !== null) return JSON.parse(localStorage.getItem("searched"))
        else return []
    }
    static addSearchedUser(username) {
        if (!this.checkUserName(username)) {
            let users = this.getAllSearchedUsers();
            users.push(username)
            localStorage.setItem("searched", JSON.stringify(users))
        }
    }
    static clearAllSearchedUsers() {
        localStorage.removeItem("searched")
    }
    static checkUserName(username) {
        let users = this.getAllSearchedUsers();
        return users.includes(username)
    }
}