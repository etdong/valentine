import makeDialog from "./Dialogue";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function openPresent(k, posVec2, present_type) {
    let present = k.add([
        k.sprite('present'),
        k.anchor('center'),
        k.scale(4),
        k.pos(posVec2),
        k.layer('fg'),
        k.fixed()
    ]);
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
                    let dialog = makeDialog(k, "it's a figure! (i wonder who made that...)", 0)
                    k.wait(5, () => {
                        figure.destroy()
                        dialog[0].destroy()
                        dialog[1].destroy()
                    })
                    break
                }
                
        }
    })
    
}
