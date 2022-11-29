const SUPABASE_URL = 'https://dssscdbblqlagvgvvtkc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc3NjZGJibHFsYWd2Z3Z2dGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMTYsImV4cCI6MTk4MzY4NDAxNn0.ZLiT0DIvTuegM8zzRIvSgVzLLFRk-1PwYGXz7BhqKk4';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */
export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createListItem(item, rating) {
    const response = await client.from('shopping').insert({ item, rating });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function getListItems() {
    const response = await client
        .from('shopping')
        .select('*')
        .match({ user_id: client.auth.user().id });
    console.log('response', response);
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function editListItem(item) {
    const response = await client
        .from('shopping')
        .update({ cross_out: !item.cross_out })
        .match({ id: item.id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function deleteList() {
    const response = await client.from('shopping').delete().match({ user_id: getUser().id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
