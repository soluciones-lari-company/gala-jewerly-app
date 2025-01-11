export class ApiBase {
    authToken = '';
    protected constructor() {
    }

    setAuthToken(token: string) {
        this.authToken = token;
    }

    protected transformOptions(options: RequestInit): Promise<RequestInit> {
        // options.headers = options.headers.append('authorization', `Bearer ${this.authToken}`);
        const headers: HeadersInit  = new Headers(options.headers)
        headers.append('authorization', `Bearer ${this.authToken}`);

        options.headers = headers

        return Promise.resolve(options);
    }
}