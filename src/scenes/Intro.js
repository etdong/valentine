import makeDialog from "../components/Dialogue";
import makePlayer from "../entities/Player";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initIntro(k) {
    k.scene('menu', () => {
        k.add([
            k.pos(k.center()),
            k.anchor('center'),
            k.text("press space to play", {
                size: 64,
                font: 'gaegu',
            }),
            k.color(0, 0, 0),
            k.fixed(),
            k.layer('fg'),
            k.z(2)
        ])

        k.onKeyPress('space', () => {
            let bgm = k.play('intro_bgm', {
                volume: 0.5,
                loop: true,
                paused: true,
            })
        
            let data = {
                playerPos: k.center(),
                direction: 'down',
                flags: ['opened1', 'opened2', 'opened3', 'opened4'],
            }
            k.go('intro', data, bgm)
        })
    })
    k.scene('intro', (data, bgm) => {
        k.onUpdate(() => {
            if (!isMuted) {
                bgm.paused = false;
            } else {
                bgm.stop()
            }
        })

        k.setCamPos(k.center())
        makePlayer(k, k.center(), 400, 'down');
        let dialog = null
        let progress = -1
        if (progress == -1) {
            k.wait(1, () => {
                dialog = makeDialog(k, "hi baby! how are you doing? (press space)", 0)
                progress = 1
            })
        }
        k.onKeyPress('space', () => {
            k.play('interact', { volume: 1 })
            if (progress == -1) {
                return
            } 
            if (dialog != null && !dialog[0].isDestroyed) {
                dialog[0].destroy()
                dialog[1].destroy()
            }
            if (progress == 1) {
                dialog = makeDialog(k, "i really hope you enjoy this little game i made for you", 0)
            }
            if (progress == 2) {
                dialog = makeDialog(k, "i worked pretty hard on it despite what it looks like", 0)
            }
            if (progress == 3) {
                dialog = makeDialog(k, "i hope you have fun exploring the house", 0)
            }
            if (progress == 4) {
                dialog = makeDialog(k, "i love you so much, have fun!!", 0)
            }
            if (progress == 5) {
                dialog = makeDialog(k, "just remember, WASD or arrow keys to move and SPACE to interact", 0)
            }
            if (progress == 6) {
                bgm.stop()
                bgm = k.play('bedroom_bgm', {
                    volume: 0.5,
                    loop: true,
                    paused: true,
                })
                data.playerPos = k.center()
                data.direction = 'down'
                k.go('bedroom', data, bgm)
            }
            progress++
        })
    })
}