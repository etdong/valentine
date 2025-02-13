import makeDialog from "../components/Dialogue";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initFinale(k) {
    k.scene('finale', (data, bgm) => {
        bgm.stop()

        k.setCamPos(k.center())

        let big_present = k.add([
            k.sprite('big_present_scene'),
            k.scale(1.5),
            k.anchor('bot'),
            k.pos(k.center().add(0, 200)),
        ]);
        k.wait(1, () => {
            k.tween(
                k.center(),
                k.center().sub(0, 1000),
                3,
                (newPos) => k.setCamPos(newPos),
                k.easings.easeInOutSine
            )
        })

        let progress = -1
        let dialog = null
        k.wait(5, () => {
            k.play('interact')
            dialog = makeDialog(k, 'woah.', 0)
            progress = 1
        })
        
        k.onKeyPress('space', () => {
                    if (progress == -1) {
                        return
                    } 
                    if (dialog != null && !dialog[0].isDestroyed) {
                        k.play('interact', { volume: 1 })
                        dialog[0].destroy()
                        dialog[1].destroy()
                    }
                    if (progress == 1) {
                        dialog = makeDialog(k, "how did this get in here??", 0)
                    }
                    if (progress == 2) {
                        dialog = makeDialog(k, "how do you even open something this big?", 0)
                    }
                    if (progress == 3) {
                        dialog = makeDialog(k, "i really hope it doesnt blow up", 0)
                        k.wait(0.5, () => {
                            big_present.destroy()
                            dialog[0].destroy()
                            dialog[1].destroy()
                            explode(k)
                        })
                    }
                    if (progress < 3) {
                        progress++
                    }
                })
    })
}

function explode(k) {
    k.scene('explosion', () => {
        k.play('explode_sound')
        k.shake(120)
        let explosion = k.add([
            k.sprite('explosion'),
            k.scale(2),
            k.anchor('center'),
            k.pos(k.center()),
        ]);
        
        k.wait(2, () => {
            explosion.sprite = 'letter1'
        })
        k.wait(2.2, () => {
            explosion.sprite = 'letter2'
        })
        k.wait(2.4, () => {
            explosion.sprite = 'letter3'
        })
        k.wait(2.6, () => {
            explosion.sprite = 'letter4'
        })
        k.wait(2.8, () => {
            explosion.sprite = 'letter5'
        })
        k.wait(3, () => {
            explosion.sprite = 'letter6'
        })
        k.wait(3.2, () => {
            explosion.sprite = 'letter7'
        })
        k.wait(3.4, () => {
            explosion.sprite = 'letter8'
        })

        let progress = -1
        let dialog = null
        k.wait(5, () => {
            k.play('interact')
            dialog = makeDialog(k, "i shouldn't have said anything...", 0)
            progress = 1
        })

        k.onKeyPress('space', () => {
            if (progress == -1) {
                return
            } 
            if (dialog != null && !dialog[0].isDestroyed) {
                k.play('interact', { volume: 1 })
                dialog[0].destroy()
                dialog[1].destroy()
            }
            if (progress == 1) {
                dialog = makeDialog(k, "there's a letter though!", 0)
            }
            if (progress == 2) {
                dialog = makeDialog(k, "might as well read it after that...", 0)
            }
            if (progress == 3) {
                explosion.destroy()
                dialog[0].destroy()
                dialog[1].destroy()
                read_letter(k)
            }
            if (progress < 3) {
                progress++
            }
        })
    })
    k.go('explosion')   
}

function read_letter(k) {
    k.scene('read_letter', () => {
        k.play('pageturn')
        let letter = k.add([
            k.sprite('letter'),
            k.scale(2),
            k.anchor('top'),
            k.pos(k.center().sub(0, 300)),
        ]);

        k.onKeyDown('space', () => {
            letter.pos = letter.pos.sub(0, 1)
            if (letter.pos.y < -1500) {
                end_screen(k)
            }
        })
    })
    k.go('read_letter')
}

function end_screen(k) {
    k.scene('end_screen', () => {
        k.add([
            k.pos(k.center()),
            k.anchor('center'),
            k.text("happy valentine's day, my love", {
                size: 64,
                font: 'gaegu',
            }),
            k.color(0, 0, 0),
            k.fixed(),
            k.layer('fg'),
            k.z(2)
        ])
    })
    k.go('end_screen')
}