import axios, { type AxiosInstance } from 'axios';
import { env } from '$env/dynamic/public';
import type { Users } from './users';

export interface Response<T> {
	responseData: T;
	meta?: {
		pagination: {
			page: number;
			pageCount: number;
			pageSize: number;
			total: number;
		};
	};
}

export class FrontApi {
	apiEndpoint: string = '';
	api: AxiosInstance;
	constructor() {
		this.api = axios.create({
			baseURL:env.PUBLIC_DEVELOPMENT_API_URL_DEV
			// headers: {
			// 	Authorization: `Bearer ${STATUS == 'development' ? TOKEN : PRODUCTION_TOKEN}`
			// }
		});
	}

    get url() {
        return this.apiEndpoint;
    }

	async get(): Promise<Response<any>> {
		const response = await this.api.get(`${this.apiEndpoint}/read`);
		return {
			responseData: response.data
		};
	}

	async put(users: Users): Promise<Response<any>> {
		let data = users.toJson();
		const response = await this.api.put(`${this.apiEndpoint}/write`, data);
		return {
			responseData: response.data
		};
	}
}
