const SUPABASE_URL = 'https://dssscdbblqlagvgvvtkc.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzc3NjZGJibHFsYWd2Z3Z2dGtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMTYsImV4cCI6MTk4MzY4NDAxNn0.ZLiT0DIvTuegM8zzRIvSgVzLLFRk-1PwYGXz7BhqKk4';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */
export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) location.replace('./list');
}

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

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

/* Data functions */
export async function getListItems() {
    const response = await client
        .from('shopping')
        .select()
        .match({ user_id: client.auth.user().id });
    // this will only grab items that belong to this user thanks to RLS and user_id property

    return checkError(response);
}

export async function createListItem(item, quantity) {
    const response = await client.from('shopping').insert([{ item, quantity }]); // because of RLS and our default values, we add user_id for free

    return checkError(response);
}

export async function deleteAllListItems() {
    const response = await client.from('shopping').delete().match({ user_id: getUser().id });

    return checkError(response);
}
