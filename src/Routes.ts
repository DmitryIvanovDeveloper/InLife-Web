const RoutesAPI = {
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

const Routes = {
   signInTeacher: "/auth/sign-in/teacher",
   signUpTeacher: "/auth/sign-up/teacher",
   signInStudent: "/auth/sign-in/student",
   signUpStudent: "/auth/sign-up/student",
   dialoguesBuilder: "/teacher/builder",
   teacherProfile: "/teacher/profile",
   studentProfile: "/student/profile",
   teacherProfileEditor: "/teacher/profile/editor",
}

export { RoutesAPI, Routes }