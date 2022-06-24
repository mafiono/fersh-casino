import { uuid } from 'vue-uuid'
import { computed } from 'vue'

let wsConnection = null
let pingInterval = null
let intervalConnection = null
const PING_INTERVAL_TIME = process.env.VUE_APP_WS_PING_TIME || 30000

export default function createWebSocketPlugin () {
    return store => {
        store.subscribe((mutation, state) => {
            if (mutation.type === 'player/setPlayerIdData') {
                if (mutation.payload) {
                    const profileId = mutation.payload
                    createConnection(store, profileId, state)
                }

                if (!mutation.payload && wsConnection) {
                    closeConnection()
                }
            }

            if (mutation.type === 'common/setTabVisibilityFlag') {
                const profileId = computed(() => store.getters['player/getPlayerId'])

                if (mutation.payload) {
                    createConnection(store, profileId.value, state)
                }

                if (!mutation.payload && wsConnection) {
                    closeConnection()
                }
            }
        })
    }
}
/*
* Костыль нужно убрать , когда девопсы поймут как старые проекты завернуть в контур
* */
const excludedProjects = ['rox', 'volna']
const createConnection = (store, profileId, state) => {
    const siteName = store.getters['common/getSiteName']
    const wsName = excludedProjects.includes(siteName)
        ? `${process.env.VUE_APP_WS_URL}`
        : `wss://${document.location.hostname}${process.env.VUE_APP_API_URL}/ws`
    const onReady = () => {
        clearInterval(intervalConnection)
        wsConnection.send(JSON.stringify({
            profileId: profileId,
            serverCodename: state.common.siteName,
            requestUUID: uuid.v1(),
        }))
        startPingInterval()
    }

    wsConnection = new WebSocket(wsName)
    wsConnection.onopen = () => {
        clearInterval(intervalConnection)
        intervalConnection = setInterval(() => {
            if (wsConnection.readyState === WebSocket.OPEN) {
                onReady()
            }
        }, 1000)
    }
    // перезапуск соединения при его внеплановом разрыве
    wsConnection.onclose = () => {
        wsConnection = createConnection(store, profileId, state)
        clearInterval(pingInterval)
    }
    wsConnection.onerror = () => {
        wsConnection.close()
        clearInterval(pingInterval)
    }

    // ожидание новых сообщений и сохранений их в стор
    listenMessage(store, wsConnection)
    return wsConnection
}

const closeConnection = () => {
    // вызов пустой функции нужен для закрытия сокета при разлогине,
    // которое не противоречит событию переоткрытия сокета при разрыве соединения (на onclose)
    wsConnection.onclose = () => {
    }
    clearInterval(pingInterval)
    wsConnection.close()
    wsConnection = null
}

const wsPing = () => {
    if (wsConnection) {
        wsConnection.send(0x9)
    }
}

const startPingInterval = () => {
    clearInterval(pingInterval)
    pingInterval = setInterval(wsPing, PING_INTERVAL_TIME)
}

// ожидание новых сообщений и сохранений их в стор
const listenMessage = (store, wsConnection) => {
    wsConnection.onmessage = (response) => {
        const data = JSON.parse(response.data)

        if (data.error) {
            return
        }
        store.dispatch('messages/updateMessagesList', data)
    }
}
