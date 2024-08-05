
const backendDomain = "https://user-auth-backend-theta.vercel.app"

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
