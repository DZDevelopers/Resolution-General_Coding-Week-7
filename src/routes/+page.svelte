<script lang="ts">
	import { onMount } from 'svelte';

	type Contact = {
		name: string;
		address: string;
		phone: string;
	};

	let contacts: Contact[] = $state([{ name: 'Test', address: '123 Main St.', phone: '617-000-0000' }]);

	async function read_contacts() {
		console.log('Reading contacts');
		const response = await fetch('/api/read-contacts', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
		const result = await response.json();

		console.log('Contacts: ', result.contacts);
		return result.contacts;
	}

	async function remove_contact(name: string, address: string, phone: string) {
		const response = await fetch('/api/remove-contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, address, phone })
		});
		const result = await response.json();
		console.log(result);

		contacts = await read_contacts();
	}

	onMount(async () => {
		contacts = await read_contacts();
	});
</script>

<main class="white-block">
	{#each contacts as contact}
		<div class="contact-element hover:scale-105 transition-transform">
			<div>
				<p>{contact.name}</p>
				<p>{contact.address}</p>
				<p>{contact.phone}</p>
			</div>
			<div style="text-align: right;">
				<!-- prettier-ignore -->
				<button class="clear_button" onclick={() => { remove_contact(contact.name, contact.address, contact.phone); }}><img
						src="trash.svg"
						alt="Trash Icon" />
				</button>
			</div>
		</div>
	{:else}
		<p style="text-align: center;">No contacts yet. Add one below!</p>
	{/each}
	<div style="text-align: center; margin-top: 1rem;">
		<a href="/add-contact" class="button-style"> Add contact </a>
	</div>
</main>