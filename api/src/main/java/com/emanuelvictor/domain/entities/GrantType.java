package com.emanuelvictor.domain.entities;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 2.0.0, 05/06/2015
 */
public enum GrantType {

    /**
     * Authorization Code for apps running on a web server
     * <p>
     * Web server apps are the most common type of application you encounter when dealing with OAuth servers.
     * Web apps are written in a server-side language and run on a server where the source code of the application is not available to the public.
     * <p>
     * https://oauth2server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos
     * <p>
     * POST https://api.oauth2server.com/token?grant_type=authorization_code&code=AUTH_CODE_HERE&redirect_uri=REDIRECT_URI&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
     */
    AUTHORIZATION_CODE("authorization_code"),
    /**
     * Implicit for browser-based or mobile apps
     * <p>
     * Browser-based apps run entirely in the browser after loading the source code from a web page.
     * Since the entire source code is available to the browser,
     * they cannot maintain the confidentiality of their client secret, so the secret is not used in this case.
     * <p>
     * https://oauth2server.com/auth?response_type=token&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos
     * <p>
     * https://facebook.com/dialog/oauth?response_type=token&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=email
     */
    IMPLICIT("token"),
    /**
     *
     */
    REFRESH_TOKEN("refresh_token"),
    /**
     * Password for logging in with a username and password
     * <p>
     * OAuth 2 also provides a "password" grant type which can be used to exchange a username and password for an access token directly.
     * Since this obviously requires the application to collect the user's password, it should only be used by apps created by the service itself.
     * For example, the native Twitter app could use this grant type to log in on mobile or desktop apps.
     * <p>
     * POST https://api.oauth2server.com/token?grant_type=password&username=USERNAME&password=PASSWORD&client_id=CLIENT_ID
     */
    PASSWORD("password"),
    /**
     * Client credentials for application access
     * <p>
     * In some cases, applications may wish to update their own information such as their website URL or application icon,
     * or they may wish to get statistics about the users of the app.
     * In this case, applications need a way to get an access token for their own account, outside the context of any specific user.
     * OAuth provides the client_credentials grant type for this purpose.
     * <p>
     * POST https://api.oauth2server.com/token?grant_type=client_credentials&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
     */
    CLIENT_CREDENTIALS("client_credentials");

    private final String grantType;

    /*-------------------------------------------------------------------
     *								CONSTRUCTORS
     *-------------------------------------------------------------------*/

    /**
     *
     */
    GrantType(final String grantType) {
        this.grantType = grantType;
    }

    /**
     * @return the grantType
     */
    public String getValue() {
        return grantType;
    }
}
