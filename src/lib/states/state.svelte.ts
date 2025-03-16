import { User } from '$lib/front/user';
import { Users } from '$lib/front/users';

export const searchState = $state({ users: new Users(), user: new User('', '', '') });
