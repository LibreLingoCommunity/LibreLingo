export type SizeType = "1" | "1/3" | "1/2" | "1/4" | "3/5" | "3" | "2/5"

export type ErrorsType = {
    _form?: string
    username?: string
    email?: string
    license?: string
    password?: string
    password_confirmation?: string
}

export interface ExtendedWindow extends Window {
    _test_fake_signup: boolean
    _test_user_already_exists: boolean
}