import { gql } from '@urql/svelte';
import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
import type { PageServerLoad } from './$types';
import { STRAPI_GRAPHQL_ENDPOINT, STRAPI_TOKEN, STRAPI_ENDPOINT } from '$env/static/private';

const client = new Client({
	url: STRAPI_GRAPHQL_ENDPOINT,
	exchanges: [cacheExchange, fetchExchange],
	fetchOptions: {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${STRAPI_TOKEN}`
		}
	},
	requestPolicy: 'network-only'
});

const HOME_IMAGES_QUERY = gql`
	query getHomeImages {
		imagenInicio {
			imagenes {
				url
			}
		}
	}
`;

const GET_EVENTS = gql`
	query GET_EVENT_BANNERS {
		imagenesEvento {
			images {
				url
				alternativeText
			}
		}
	}
`;

async function getEvents() {
	const { data } = await client.query(GET_EVENTS, {}).toPromise();

	const events = data?.imagenesEvento?.images?.map((img: any) => ({
		url: STRAPI_ENDPOINT + img.url,
		alt: img.alternativeText
	}));

	return events;
}

export const load: PageServerLoad = async () => {
	const { data } = await client.query(HOME_IMAGES_QUERY, {}).toPromise();

	let images = data?.imagenInicio?.imagenes?.map((img: any) => STRAPI_ENDPOINT + img.url);
	const events = await getEvents();

	return { images, events };
};
