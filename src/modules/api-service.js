import { HOST } from '../constants/api';

export default class ApiService {
    static async get(endPoint, params) {
        const url = new URL(`${HOST}${endPoint}`);
        url.search = !!params ? new URLSearchParams(params) : undefined;

        const res = await fetch(url);

        if (res.ok)
            return res.json();
        else
            throw { error: { status: res.status, message: res.statusText } };
    }

    static async post(endPoint, body) {
        const url = new URL(`${HOST}${endPoint}`);
        const res = await fetch(url, { method: 'POST', body });

        if (res.ok)
            return res.json();
        else
            throw { error: { status: res.status, message: res.statusText } };
    }
}