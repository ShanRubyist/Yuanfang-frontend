export default function ({ route, store, redirect }: { route: any, store: any, redirect: any }) {
    // If the user is not authenticated
    let token = store.state.token
    if ((token == null || token == undefined) && ((route.fullPath != '/signin'))) {
        return redirect('/signin')
    }
}