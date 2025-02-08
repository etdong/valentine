import drawCurLocation from "../components/CurrentLocation";
import makePlayer from "../entities/Player";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";


/**
 * Initializes the stairwell scene.
 *
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initStairwell(k) {
    k.scene('stairwell', (playerPos, direction, bgm) => {
        k.onUpdate(() => {
                    if (!isMuted) {
                        bgm.paused = false;
                    } else {
                        bgm.stop()
                    }
                })
        k.setCamPos(playerPos)
        let player = makePlayer(k, playerPos, 400, direction);

        drawCurLocation(k, 'stairs')

        k.add([
            k.sprite('stairwell'),
            k.layer('game'),
            k.anchor('center'),
            k.pos(k.center())
        ])

        makeRoom(k, 500, 520, 4, k.center().add(k.vec2(-10, 110)))
        makeRoom(k, 300, 100, 4, k.center().add(k.vec2(90, 70)))

        let hallway_stairs = k.add([
            k.sprite('stairs'),
            k.scale(1),
            k.area({ shape: new k.Rect(k.vec2(0, 0), 40, 150) }),
            k.anchor('right'),
            k.pos(k.center().sub(k.vec2(-260, 65))),
            k.layer('bg'),
            k.z(-1),
            'stairs_entry'
        ])

        player.onCollide(() => {
            if (player.isColliding(hallway_stairs)) {
                k.go('hallway', k.center().sub(k.vec2(160, -170)), 'right', bgm)
            }
        })       
    })
}