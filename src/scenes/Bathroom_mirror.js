import makeDialog from "../components/Dialogue";
import makeProp from "../entities/Prop";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initBathroom_mirror(k) {
    return k.scene('bathroom_mirror', (playerPos, direction, bgm) => {
        k.onUpdate(() => {
            if (!isMuted) {
                bgm.paused = false;
            } else {
                bgm.stop()
            }
        })  

        k.setCamPos(playerPos)

        k.add([
            k.sprite('you'),
            k.anchor('center'),
            k.scale(1.1),
            k.area(),
            k.body({ isStatic: true} ),
            k.pos(k.center().add(k.vec2(0, 100))),
            k.layer('game'),
        ]);
        makeProp(k, 0, 'mirror_background', 'bg')
        k.wait(1.5, () => {
            makeDialog(k, "looking beautiful as ever, my love.", 0)
        }) 

        k.onKeyPress('space', () => {
            k.go('bathroom', k.center().sub(60, 80), 'up', bgm)
        })
    })
}