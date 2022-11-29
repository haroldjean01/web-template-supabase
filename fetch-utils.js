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
