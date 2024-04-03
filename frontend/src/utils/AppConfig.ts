class AppConfig {
    public apiBaseUrl = 'http://localhost:8080';
    public vacationsUrl = `${this.apiBaseUrl}/api/vacations`;
    public loginUrl = `${this.apiBaseUrl}/api/login`;
    public signupUrl = `${this.apiBaseUrl}/api/signup`;
    public isAdminUrl = `${this.apiBaseUrl}/api/role`;
    public usersUrl = `${this.apiBaseUrl}/api/users`;
    public followUrl = `${this.apiBaseUrl}/api/followers`;
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 6000;
}

const appConfig = new AppConfig();
export default appConfig;