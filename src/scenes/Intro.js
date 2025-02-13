import makeDialog from "../components/Dialogue";
import makePlayer from "../entities/Player";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initIntro(k) {
    k.scene('intro', (bgm) => {
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
                k.go('bedroom', k.center(), 'down', bgm)
            }
            progress++
        })
    })
}