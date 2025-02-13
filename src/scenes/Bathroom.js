import drawCurLocation from "../components/CurrentLocation";
import makeDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import makePlayer, { checkProximity } from "../entities/Player";
import makeProp from "../entities/Prop";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initBathroom(k) {
    return k.scene('bathroom', (data, bgm) => {
        k.onUpdate(() => {
            if (!isMuted) {
                bgm.paused = false;
            } else {
                bgm.stop()
            }
        })

        k.setCamPos(data.playerPos)
        let player = makePlayer(k, data.playerPos, 400, data.direction);

        drawCurLocation(k, 'bathroom')      

        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                checkProximity(player, player.rec_coll) < 17) {
                let dialog_text = null
                switch (player.rec_coll.tags[1]) {
                    case 'toilet':
                        dialog_text = "ploop"
                        break
                    case 'bathroom_sink':
                        data.playerPos = k.center()
                        data.direction = 'up'
                        k.go('bathroom_mirror', data, bgm)
                        break
                    case 'bath':
                        dialog_text = "you don't have time for a shower right now (stinky)"
                        break
                    case 'hallway-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.playerPos = k.center().add(-50, 0)
                        data.direction = 'right'
                        k.go('hallway', data, bgm)
                        return
                    default:
                        break
                }
                if (dialog != null && !dialog[0].isDestroyed) {
                    dialog[0].destroy()
                    dialog[1].destroy()
                }
                if (dialog_text != null) {
                    k.play('interact', { volume: 1 })
                    dialog = makeDialog(k, dialog_text)
                }
            }
        })

        makeRoom(k, 500, 250, 4, k.center().sub(k.vec2(200, 100)))

        makeProp(k, k.center().sub(190, 450), 'bathroom_sink', 'game', 'bathroom_sink')

        k.add([
            k.sprite('toilet'),
            k.scale(0.8),
            k.area(),
            k.body({ isStatic: true} ),
            k.pos(k.center().sub(k.vec2(300, 350))),
            k.layer('game'),
            'toilet'
        ]);

        k.add([
            k.sprite('bath'),
            k.scale(0.8),
            k.area(),
            k.body({ isStatic: true} ),
            k.pos(k.center().sub(k.vec2(470, 430))),
            k.layer('game'),
            'bath'
        ]);

        makeDoor(k, k.center().add(k.vec2(47, -100)), 'hallway-door', 'right')
    })
}