import AuthClientStore from '../../contexts/AuthClientStore';
export class ApiBase {
    // base api
    authToken = '';
    protected constructor() {
    }

    setAuthToken(token: string) {
        this.authToken = token;
    }

    getBaseUrl(url: string, baseUrl?: string){
        return import.meta.env.VITE_HOST_API_JEWERLY;
    }
    protected transformResult(url: string, response: Response, processor: (response: Response) => any) {
        return processor(response);
    }

    protected transformOptions(options: RequestInit): Promise<RequestInit> {
        // options.headers = options.headers.append('authorization', `Bearer ${this.authToken}`);
        const headers: HeadersInit  = new Headers(options.headers)
        headers.append('authorization', `Bearer ${AuthClientStore.getAccessToken()}`);

        options.headers = headers

        return Promise.resolve(options);
    }
}