export default function ({ route, store, redirect }) {
    // If the user is not authenticated
    let token = store.state.token
    if ((token == null || token == undefined) && ((route.fullPath != '/signin'))) {
        return redirect('/signin')
    }
}