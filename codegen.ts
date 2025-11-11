import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:1337/graphql', // or path to local schema.graphql
  documents: 'src/**/*.svelte', // or .graphql or even .svelte if you embed gql tags
  generates: {
    './src/lib/graphql/__generated__/': {
      preset: 'client',
      plugins: [],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
