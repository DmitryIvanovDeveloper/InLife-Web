const Routes = {
    dialogues: `${process.env.REACT_APP_SERVER}/api/dialogues/`,
    phrases: `${process.env.REACT_APP_SERVER}/api/phrases/`,
    answers: `${process.env.REACT_APP_SERVER}/api/answers/`,
    teachers: `${process.env.REACT_APP_SERVER}/api/teachers/`,
    teachersMe: `${process.env.REACT_APP_SERVER}/api/teachers/me`,
    authSignInTeacher: `${process.env.REACT_APP_SERVER}/api/auth/sign-in/teachers`,
    authSignUpTeacher: `${process.env.REACT_APP_SERVER}/api/auth/sign-up/teachers`,
    authSignInStudent: `${process.env.REACT_APP_SERVER}/api/auth/sign-in/students`,
    authSignUpStudent: `${process.env.REACT_APP_SERVER}/api/auth/sign-up/students`,
}
export { Routes }