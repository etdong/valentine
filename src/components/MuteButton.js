/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initMuteButton(k) {
    let muteButton = k.add([
        k.sprite('sound_unmuted'),
        k.anchor('botleft'),
        k.scale(0.4),
        k.area(),
        k.body(),
        k.pos(k.center().sub(k.vec2(k.width() / 2 - 16, -k.height() / 2 + 16))),
        k.layer('fg'),
        k.fixed(),
        k.z(1),
        'muteButton',
        {
            muted: false
        }
    ])

    k.onClick('muteButton', () => {
        if (muteButton.muted) {
            muteButton.sprite = 'sound_unmuted'
            muteButton.muted = false
        } else {
            muteButton.sprite = 'sound_muted'
            muteButton.muted = true
        }
    })
}