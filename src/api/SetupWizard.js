import http from '@/api/http'

export default class SetupWizard {
    static async makePlayers(payload) {
        return await http.post('make-players', payload)
    }
}
