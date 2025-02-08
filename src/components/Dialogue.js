export default function createDialog(k, text, posVec2, lifetime = 3, size = 48) {
    const dialogText = k.add([
            k.pos(posVec2.x, posVec2.y - 16),
            k.anchor('bot'),
            k.text(text, {
                size: size,
                font: 'gaegu',
            }),
            k.color(0, 0, 0),
            k.fixed(),
            k.layer('game'),
        ])
    const dialogBox = k.add([
        k.rect(dialogText.width + 64, size + 32),
        k.anchor('bot'),
        k.pos(posVec2),
        k.outline(4),
        k.fixed(),
        k.layer('bg'),
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