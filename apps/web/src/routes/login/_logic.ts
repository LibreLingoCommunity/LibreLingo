import { page } from '$app/state';
let username = page.data.username
let password = page.data.password
let error: string | null = page.data.error

type WindowWithLogin = Window & {
    _Login: (username: string, password: string) => Promise<void>
}

export const handleLogin = async () => {
    debugger
    try {
        await (window as unknown as WindowWithLogin)._Login(username, password)
    } catch (e) {
        error = e
    }
}
