import { User } from '$lib/front/user';
import { Users } from '$lib/front/users';
import { writable } from 'svelte/store';

// export const userState = $state({
// 	users: Users
// });
// export const inUsers = writable(new Users());

// export const countState = $state(new Users());

export const searchState = $state({ users : new Users() });

