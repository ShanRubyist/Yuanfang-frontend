export default function useGoogleOAuth() {

  const open_google_oauth_link = (): void => {
    const config = useRuntimeConfig().public
    let google_oauth_url = `${config.endpoint}/auth/google_oauth2`

    window.open(google_oauth_url, "_blank", "width=600,height=600");
  }

  return {
    open_google_oauth_link
  }
}