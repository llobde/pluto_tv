import axios, { type AxiosInstance } from 'axios';
import { DEVELOPMENT_API_URL_DEV } from '$env/static/private';

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

export class Api {
	apiEndpoint: string = '';
	api: AxiosInstance;
	constructor() {
		this.api = axios.create({
			baseURL: DEVELOPMENT_API_URL_DEV
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

	async put(data: any): Promise<Response<any>> {
		const response = await this.api.put(`${this.apiEndpoint}/write`, data);
		return {
			responseData: response.data
		};
	}
}
