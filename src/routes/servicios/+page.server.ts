import { gql } from '@urql/svelte';
import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
import type { PageServerLoad } from './$types';
import { STRAPI_ENDPOINT, STRAPI_GRAPHQL_ENDPOINT, STRAPI_TOKEN } from '$env/static/private';

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

const GET_SERVICES = gql`
	query GET_SERVICES {
		servicios {
			posicion
			serviceid
			tagline
			Titulo
			descripcion
			boton
			texto_boton
			imagenes {
				url
			}
			link_boton
		}
	}
`;


function parseDescription(blocks: any[]): string[] {
	if (!blocks || !Array.isArray(blocks)) return [];

	const result: string[] = [];
	for (const block of blocks) {
		if (block.type === 'paragraph' && block.children) {
			const text = block.children.map((c: any) => c.text || '').join('');
			if (text.trim()) result.push(text.trim());
		}
		if (block.type === 'list' && block.children) {
			for (const item of block.children) {
				const text = item.children
					?.map((c: any) => c.text || '')
					.join('')
					.trim();
				if (text) result.push(text);
			}
		}
	}
	return result;
}

async function getServices() {
	const { data } = await client.query(GET_SERVICES, {}).toPromise();

	const services =
		data?.servicios
			?.map((s: any) => ({
				id: s.serviceid,
				title: s.Titulo,
				tagline: s.tagline,
				description: parseDescription(s.descripcion),
				image: s.imagenes?.map((img: any) => STRAPI_ENDPOINT + img.url) ?? [],
				cta: s.texto_boton,
				ctaLink: s.link_boton,
				position: s.posicion,
				hasbutton: s.boton
			}))
			.sort((a: any, b: any) => a.position - b.position) ?? [];

	return services;
}

export const load: PageServerLoad = async () => {
	const services = await getServices();

	return { services };
};
