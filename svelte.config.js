import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	onwarn: (warning, handler) => {
		if (warning.code.includes("a11y_click_events_have_key_events")) return;
		if (warning.code.includes("a11y_no_noninteractive_element_interactions")) return;
		if (warning.code.includes("a11y_mouse_events_have_key_events")) return;
		handler(warning);
	}
};

export default config;
