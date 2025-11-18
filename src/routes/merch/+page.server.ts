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

const GET_MERCH_ITEMS = gql`
	query GET_MERCH_ITEMS {
		merchItems {
			titulo
			descripcion
			precio
			imagenes {
				url
			}
		}
	}
`;

function parseDescription(descData: any[]) {
	if (!descData) return { description: '', features: [] };

	const descArray = typeof descData === 'string' ? JSON.parse(descData) : descData;

	let description = '';
	let features: any[] = [];

	descArray.forEach((block: any) => {
		if (block.type === 'paragraph') {
			description = block.children.map((c: any) => c.text).join(' ');
		}
		if (block.type === 'list') {
			block.children.forEach((item: any) => {
				const text = item.children.map((c: any) => c.text).join(' ');
				if (text) features.push(text);
			});
		}
	});

	return { description, features };
}

async function getMerch() {
	const { data } = await client.query(GET_MERCH_ITEMS, {}).toPromise();

    const merch = data?.merchItems?.map((s:any) => ({
        titulo: s.titulo,
        richtext: parseDescription(s.descripcion),
        precio: s.precio,
        imagenes: s.imagenes?.map((img: any) => STRAPI_ENDPOINT + img.url) ?? [],
    }))
	
    return merch
}

export const load: PageServerLoad = async () => {
    const merchItems = await getMerch()

    return  { merchItems }
};
