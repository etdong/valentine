import drawCurLocation from "../components/CurrentLocation";
import initDebug from "../components/debug";
import makePlayer from "../entities/Player";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";


/**
 * Initializes the stairwell scene.
 *
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initStairwell(k) {
    k.scene('stairwell', (data, bgm) => {
        k.onUpdate(() => {
                    if (!isMuted) {
                        bgm.paused = false;
                    } else {
                        bgm.stop()
                    }
                })
        k.setCamPos(data.playerPos)
        let player = makePlayer(k, data.playerPos, 400, data.direction);

        drawCurLocation(k, 'stairs')

        initDebug(k, player)

        k.add([
            k.sprite('stairwell'),
            k.layer('game'),
            k.anchor('center'),
            k.pos(k.center())
        ])

        makeRoom(k, 500, 520, 4, k.center().add(k.vec2(-10, 110)))
        makeRoom(k, 300, 100, 4, k.center().add(k.vec2(90, 70)))

        let hallway_stairs = k.add([
            k.area({ shape: new k.Rect(k.vec2(0, 0), 40, 200) }),
            k.anchor('right'),
            k.pos(k.center().sub(-260, 65)),
        ])

        let down_stairs = k.add([
            k.area({ shape: new k.Rect(k.vec2(0, 0), 40, 350) }),
            k.anchor('right'),
            k.pos(k.center().sub(-260, -250)),
        ])

        player.onCollide(() => {
            if (player.isColliding(hallway_stairs)) {
                data.playerPos = k.center().sub(160, -170)
                data.direction = 'right'
                k.go('hallway', data, bgm)
            }

            if (player.isColliding(down_stairs)) {
                data.playerPos = k.center().sub(180, 0)
                data.direction = 'right'
                k.go('downstairs', data, bgm)
            }
        })       
    })
}