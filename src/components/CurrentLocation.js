export default function drawCurLocation(k, label) {
    return k.add([
                k.text(label, {
                    font: 'gaegu'
                }),
                k.anchor('topleft'),
                k.color('000000'),
                k.pos(k.center().sub(k.vec2(k.width() / 2 - 16, k.height() / 2 - 16))),
                k.layer('fg'),
                k.fixed(),
                k.z(1)
            ])
}