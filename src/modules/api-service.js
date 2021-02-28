import { HOST } from '../constants/api';

export default class ApiService {
    static async get(endPoint, params) {
        const url = new URL(`${HOST}${endPoint}`);
        if (!!params)
            url.search = new URLSearchParams(params);

        const res = await fetch(url);

        if (res.ok)
            return res.json();
        else
            return { error: { status: res.status, message: res.statusText } };
    }

    static async post(endPoint, body) {
        const url = new URL(`${HOST}${endPoint}`);
        const res = await fetch(url, { body });

        if (res.ok)
            return res.json();
        else
            return { error: { status: res.status, message: res.statusText } };
    }
}