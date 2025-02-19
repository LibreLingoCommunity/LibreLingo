import type { ErrorsType, ExtendedWindow } from "types/types"
import isBrowser from "../../utils/isBrowser.js"
import settings from "../../settings.js"
import { page } from '$app/state';

let username = page.data.username
let email = page.data.email
let password = page.data.password
let password_confirmation = page.data.password_confirmation
let license_accepted = page.data.license_accepted
let errors: ErrorsType = page.data.errors
let loading = page.data.loading

const emailRegexp =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i


const validateUsername = () => {
    if (!username) {
        errors = {
            ...errors,
            username: "Please choose a username",
        }

        return
    }

    if (username.length < 4) {
        errors = {
            ...errors,
            username: "Please choose a username that has at least 4 characters",
        }

        return
    }
}

const validateEmail = () => {
    if (!email) {
        errors = {
            ...errors,
            email: "Please tell us your email address",
        }

        return
    }

    if (!emailRegexp.test(email)) {
        errors = {
            ...errors,
            email: "This does not look like a valid email address",
        }

        return
    }
}

const validatePassword = () => {
    if (!password) {
        errors = {
            ...errors,
            password: "Please choose a password",
        }

        return
    }

    if (password.length < 6) {
        errors = {
            ...errors,
            password:
                "Your password is too short. Please choose a password that's at least 5 characters long.",
        }

        return
    }

    if (!password_confirmation) {
        errors = {
            ...errors,
            password_confirmation:
                "Please verify your chosen password by repeating it",
        }

        return
    }

    if (password !== password_confirmation) {
        errors = {
            ...errors,
            password_confirmation: "The passwords don't match",
        }

        return
    }
}

const validateLicense = () => {
    if (!license_accepted) {
        errors = {
            ...errors,
            license: "You have to accept the agreements.",
        }

        return
    }

    if (username.length < 4) {
        errors = {
            ...errors,
            username: "Please choose a username that has at least 4 characters",
        }

        return
    }
}

const handleTestingFakes = () => {
    if ((window as unknown as ExtendedWindow)?._test_fake_signup) {
        if ((window as unknown as ExtendedWindow)?._test_user_already_exists) {
            errors = {
                ...errors,
                _form: "User already exists. Please choose another username.",
            }
            return
        }
    }
}

export let handleSignUp: () => Promise<void>
$: {
    handleSignUp = async () => {
        loading = true
        errors = {}
        validateUsername()
        validateEmail()
        validatePassword()
        validateLicense()
        handleTestingFakes()
        const isFormValid = Object.keys(errors).length === 0

        if (isBrowser() === true) {
            if ((window as unknown as ExtendedWindow)?._test_fake_signup) {
                setTimeout(function () {
                    if (isFormValid === true) {
                        loading = false
                        window.location.href = "/sign-up-success"
                    } else {
                        loading = false
                    }
                }, 500)
            } else {
                if (isFormValid) {
                    fetch(settings.database.signUpEndpoint, {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            password,
                        }),
                    })
                        .then((data) => data.json())
                        .then(({ success, error }) => {
                            if (success) {
                                loading = false
                                window.location.href = "/sign-up-success"
                            } else {
                                loading = false
                                if (error.code === "invalid-payload") {
                                    errors = error.details
                                } else {
                                    errors = { _form: "Server error" }
                                }
                            }
                        })
                } else {
                    loading = false
                }
            }
        }
    }
}