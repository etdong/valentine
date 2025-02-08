export default function initDebug(k, player) {
    k.onKeyPress('m', () => {
        k.debug.log(player.pos)
    })
}