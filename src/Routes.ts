const Routes = {
    dialogues: `${process.env.REACT_APP_SERVER}/api/dialogues/`,
    phrases: `${process.env.REACT_APP_SERVER}/api/phrases/`,
    answers: `${process.env.REACT_APP_SERVER}/api/answers/`,
    users: `${process.env.REACT_APP_SERVER}/api/users/`,
    usersMe: `${process.env.REACT_APP_SERVER}/api/users/me`,
    authSignIn: `${process.env.REACT_APP_SERVER}/api/auth/sign-in/`,
    authSignUp: `${process.env.REACT_APP_SERVER}/api/auth/sign-up/`,
}
export { Routes }