import type { ErrorsType } from "types/types";


export async function load() {
    let username = ""
    let email = ""
    let password = ""
    let password_confirmation = ""
    let license_accepted = false
    let errors: ErrorsType = {}
    let loading = false
    return {
        username, email, password, password_confirmation, license_accepted, errors, loading
    }
}
