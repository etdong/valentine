export default function makeDialog(k, text, lifetime = 3, size = 48) {
    const dialogText = k.add([
            k.pos(k.center().add(k.vec2(0, k.height()/2 - 116))),
            k.anchor('bot'),
            k.text(text, {
                size: size,
                font: 'gaegu',
            }),
            k.color(0, 0, 0),
            k.fixed(),
            k.layer('fg'),
            k.z(2)
        ])
    const dialogBox = k.add([
        k.rect(dialogText.width + 64, size + 32),
        k.anchor('bot'),
        k.pos(k.center().add(k.vec2(0, k.height()/2 - 100))),
        k.outline(4),
        k.fixed(),
        k.layer('fg'),
        k.z(1),
        {
            isDestroyed: false
        }
    ])
    if (lifetime > 0) {
        k.wait(lifetime, () => {
            dialogBox.isDestroyed = true
            k.destroy(dialogBox)
            k.destroy(dialogText)
        })
    }

    dialogBox.onDestroy(() => {
        k.destroy(dialogText)
    })
    return [dialogBox, dialogText]
}