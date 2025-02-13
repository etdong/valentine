import drawCurLocation from "../components/CurrentLocation";
import makePlayer from "../entities/Player";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";


/**
 * Initializes the downstairs scene.
 *
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initDownstairs(k) {
    k.scene('downstairs', (data, bgm) => {
        k.onUpdate(() => {
                    if (!isMuted) {
                        bgm.paused = false;
                    } else {
                        bgm.stop()
                    }
                })
        k.setCamPos(data.playerPos)
        k.setCamScale(0.8, 0.8)
        let player = makePlayer(k, data.playerPos, 400, data.direction);

        drawCurLocation(k, 'downstairs')

        let separator = makeRoom(k, 520, 200, 4, k.center().add(450, 0))
        separator[1].destroy()

        let stair_bound = makeRoom(k, 150, 190, 4, k.center().add(-180, 0))
        stair_bound[1].destroy()

        let lobby = makeRoom(k, 800, 500, 4, k.center().add(310, -350))
        lobby[2].destroy()

        let kitchen = makeRoom(k, 800, 1200, 4, k.center().add(310, 700))
        kitchen[0].destroy()
        kitchen[3].destroy()

        let kitchen_island = k.add([
            k.sprite('kitchen_island'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.anchor('right'),
            k.pos(k.center().add(400, 500)),
        ])


        let living = makeRoom(k, 750, 700, 4, k.center().add(-470, 450))
        living[1].destroy()

        let stairs = k.add([
            k.sprite('stairs'),
            k.scale(1.2),
            k.area({ shape: new k.Rect(k.vec2(-100, 0), 40, 150) }),
            k.anchor('right'),
            k.pos(k.center().sub(80, 0)),
        ])

        let couch = k.add([
            k.sprite('couch'),
            k.scale(1.2),
            k.body({isStatic: true}),
            k.area(),
            k.anchor('right'),
            k.pos(k.center().add(-80, 500)),
        ])

        let couch2 = k.add([
            k.sprite('couch_2'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.anchor('right'),
            k.pos(k.center().add(-300, 720)),
        ])

        let couch3 = k.add([
            k.sprite('couch_3'),
            k.scale(0.9),
            k.body({isStatic: true}),
            k.area(),
            k.anchor('right'),
            k.pos(k.center().add(-280, 100)),
        ])
        

        player.onCollide(() => {
            if (player.isColliding(stairs)) {
                data.playerPos = k.center().add(190, 260)
                data.direction = 'left'
                k.go('stairwell', data, bgm)
            }
        })
    })
}