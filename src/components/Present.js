import makeDialog from "./Dialogue";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function openPresent(k, present_type) {
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

    k.wait(1.5, () => {
        switch (present_type) {
            case 'figure':
                {
                    let figure = k.add([
                        k.sprite('figure'),
                        k.anchor('center'),
                        k.scale(3),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ]);
                    makeDialog(k, "it's a figure! (i wonder who made that...)", 5)
                    k.onKeyPress('space', () => {
                        figure.destroy()
                    })
                    break
                }
            case 'note':
                {
                    let note = k.add([
                        k.sprite('note'),
                        k.anchor('center'),
                        k.scale(2),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ])
                    k.onKeyPress('space', () => {
                        note.destroy()
                    })
                    break
                }
            case 'toy':
                {
                    let toy = k.add([
                        k.sprite('toy'),
                        k.anchor('center'),
                        k.scale(4),
                        k.pos(k.center()),
                        k.layer('fg'),
                        k.fixed(),
                    ])
                    k.onKeyPress('space', () => {
                        toy.destroy()
                    })
                    break
                }
                
        }
    })
    
}
