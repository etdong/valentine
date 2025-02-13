import makeDialog from "./Dialogue";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function openPresent(k, present_type, player) {
    player.frozen = true;

    let present = k.add([
        k.sprite('present_open0'),
        k.anchor('center'),
        k.scale(4),
        k.pos(k.center()),
        k.layer('fg'),
        k.fixed()
    ]);
    k.play('open_present', { volume: 1, speed: 1 })
    k.wait(0.5, () => {
        present.sprite = 'present_open1'
    })
    k.wait(1, () => {
        present.sprite = 'present_open2'
    })
    k.wait(1.5, () => {
        present.destroy()
    })

    let item = null
    let dialog = null
    k.wait(1.5, () => {
        switch (present_type) {
            case 'figure':
                {
                    item = k.add([
                        k.sprite('figure'),
                        k.anchor('center'),
                        k.scale(3),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ]);
                    dialog = makeDialog(k, "it's a figure! (i wonder who made that...)", 0)
                    break
                }
            case 'note':
                {
                    item = k.add([
                        k.sprite('note'),
                        k.anchor('center'),
                        k.scale(2),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ])
                    dialog = makeDialog(k, "you found a note!", 0)
                    break
                }
            case 'toy':
                {
                    item = k.add([
                        k.sprite('toy'),
                        k.anchor('center'),
                        k.scale(4),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ])
                    dialog = makeDialog(k, "you found a cute little thing! who could have left him here?", 0)
                    break
                }
            case 'magnet':
                {
                    item = k.add([
                        k.sprite('magnet'),
                        k.anchor('center'),
                        k.scale(3),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ])
                    dialog = makeDialog(k, "you found a magnet!", 0)
                    break 
                }
                
        }
    })

    k.onKeyPress('space', () => {
        if (item != null && dialog != null) {
            item.destroy()
            dialog[0].destroy()
            dialog[1].destroy()
            player.frozen = false
        }
    })
    
}
