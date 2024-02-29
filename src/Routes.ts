const RoutesAPI = {
    dialogues: `${process.env.REACT_APP_SERVER}/api/dialogues/`,
    dialoguesStatistic: `${process.env.REACT_APP_SERVER}/api/students/statistics/dialogues`,
    phrases: `${process.env.REACT_APP_SERVER}/api/phrases/`,
    answers: `${process.env.REACT_APP_SERVER}/api/answers/`,
    teachers: `${process.env.REACT_APP_SERVER}/api/teachers/`,
    teachersMe: `${process.env.REACT_APP_SERVER}/api/teachers/me`,
    authSignIn: `${process.env.REACT_APP_SERVER}/api/auth/sign-in/me`,
    authSignUpTeacher: `${process.env.REACT_APP_SERVER}/api/auth/sign-up/teachers`,
    authSignUpStudent: `${process.env.REACT_APP_SERVER}/api/auth/sign-up/students`,
    
    chatGPT: "https://api.openai.com/v1/chat/completions"
}

const Routes = {
   signIn: "/auth/sign-in/",
   signUpTeacher: "/auth/sign-up/teacher",
   signUpStudent: "/auth/sign-up/student",
   main: "/teacher/main",
   studentProfile: "/game",
   teacherProfileEditor: "/teacher/profile/editor",
   studentDialoguesStatistic: "/student/statistics/dialogues",
}

export { Routes, RoutesAPI }
