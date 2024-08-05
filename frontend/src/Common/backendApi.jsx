
const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post",
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post",
    },
    userProfile: {
        url: `${backendDomain}/api/userprofile`,
        method: "post",
    },
    logoutUser: {
        url: `${backendDomain}/api/logout`,
        method: "get",
    }
}

export default SummaryApi