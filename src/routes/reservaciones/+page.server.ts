import { gql } from '@urql/svelte';
import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
import type { PageServerLoad } from './$types';
import { STRAPI_GRAPHQL_ENDPOINT, STRAPI_TOKEN, STRAPI_ENDPOINT } from '$env/static/private';

const client = new Client({
	url: STRAPI_GRAPHQL_ENDPOINT,
	exchanges: [fetchExchange],
	fetchOptions: {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${STRAPI_TOKEN}`
		}
	}
});

const GET_RESERVATION_PRICES = gql`
	query GET_RESERVATION_PRICES {
		precioCanchas {
			dias
			periodos_precios
			orden
		}
		preciosClases {
			periodo
			horas
			precio
			orden
		}
	}
`;

async function getPrecios() {
	const { data } = await client.query(GET_RESERVATION_PRICES, {}).toPromise();

	return data;
}

export const load: PageServerLoad = async () => {
	const data = await getPrecios();

	const preciosCanchas = data.precioCanchas.sort((a: any, b: any) => a.orden - b.orden);
	const preciosClases = data.preciosClases.sort((a: any, b: any) => a.orden - b.orden);

	return { preciosCanchas, preciosClases };
};
