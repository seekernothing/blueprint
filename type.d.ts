interface AuthState {
    isSignedIn : boolean
    userName : string | null
    userId : string | null
    isLoading : boolean
}

type AuthContext = {
    isSignedIn : boolean,
    userName : string | null,
    userId : string | null,
    isLoading : boolean,
    refreshAuth :()=> Promise<boolean>,
    signIn : ()=>Promise<boolean>
    signOut : ()=>Promise<boolean>
}
