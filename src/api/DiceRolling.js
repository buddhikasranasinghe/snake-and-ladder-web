import http from '@/api/http'

export default class DiceRolling {
    static async initialRolling(player) {
        return await http.get(`initial-rolling/${player.key}`);
    }

    static async playingOrderReport() {
        return await http.get('playing-order-report')
    }
}