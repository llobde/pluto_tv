import { Api } from '$lib/server/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const api = new Api();
	let json = await api.get();
	return {
		props: {
			json: json.responseData
		}
	};
};
