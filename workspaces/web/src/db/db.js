import settings from "../settings"
import getUserDbName from "./getUserDbName"
import Cookies from "js-cookie"

let db
let remoteDB
let syncHandler

if (process.browser === true) {
    const authStore = require("../auth").default
    const PouchDB = require("pouchdb").default

    // Connect to remote database
    remoteDB = new PouchDB(
        `${settings.database.remote}/${Cookies.get("loginDb")}`,
        { skip_setup: true, live: true }
    )

    // Connect to local database
    db = new PouchDB(settings.database.local)
    window._DB = db

    // Detect existing user session
    if (Cookies.get("loginDb") && settings.features.authEnabled) {
        fetch(`${settings.database.remote}/_session`)
            .then((data) => data.json())
            .then((user) => {
                if (user.userCtx.name === null) {
                    return
                }
                authStore.update((value) => ({
                    ...value,
                    user: { name: user.userCtx.name },
                }))
                startSync()
            })
    } else {
    // Without a sessios, there is no sync
        authStore.update((value) => ({
            ...value,
            online: false,
        }))
    }

    // Add login function
    window._Login = async (username, password) => {
        const response = await (
            await fetch(`${settings.database.remote}/_session`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
        ).json()

        if (response.error) {
            if (response.error === "unauthorized") {
                throw new Error("Username or password is incorrect")
            }
            throw new Error("Couldn't log in. Please try again later")
        }

        authStore.update((value) => ({
            ...value,
            online: null,
        }))
        Cookies.set("loginDb", getUserDbName(username), {
            expires: settings.database.auth.expireDays,
        })
        window.location.reload(false)
    }

    // Logout
    window._Logout = async () => {
        await syncHandler.cancel()
        await fetch(`${settings.database.remote}/_session`, { method: "delete" })
        Cookies.remove("loginDb")
        authStore.update((value) => ({
            ...value,
            user: null,
            online: null,
        }))
        window.location.reload(false)
    }

    // Keep databases in sync
    const startSync = () => {
        syncHandler = db
            .sync(remoteDB)
            .on("complete", function () {
                authStore.update((value) => ({ ...value, online: true }))
            })
            .on("error", function () {
                authStore.update((value) => ({ ...value, online: false }))
            })
    }
}

if (process.env.JEST_WORKER_ID !== undefined) {
    // This is a test database for Jest tests that can reset itself
    const PouchDB = require("pouchdb")
    db = new PouchDB(settings.database.local)
    db.__reset = async () => {
        const allDocs = await db.allDocs()
        await Promise.all(
            allDocs.rows.map(function (row) {
                return db.remove(row.id, row.value.rev)
            })
        )
    }
}

export default db
