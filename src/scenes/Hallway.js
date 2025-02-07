import drawCurLocation from "../components/CurrentLocation";
import createDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import initMuteButton from "../components/MuteButton";
import makePlayer, { checkProximity } from "../entities/Player";
import makeRoom from "../entities/Room";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initHallway(k) {
    k.scene('hallway', (playerPos, direction) => {
        k.setCamPos(playerPos)
        let player = makePlayer(k, playerPos, 400, direction);

        drawCurLocation(k, 'hallway')
        
        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                checkProximity(player, player.rec_coll) < 17) {
                const dialog_pos = k.center().add(k.vec2(0, 400))
                let dialog_text = null
                k.debug.log('interacting with ' + player.rec_coll.tags[1])
                switch (player.rec_coll.tags[1]) {
                    case 'bedroom-door':
                    player.rec_coll = null
                    k.go('bedroom', k.center().sub(k.vec2(156, -110)), 'right')
                        return
                    default:
                        break
                }
                if (dialog != null && !dialog[0].isDestroyed) {
                    dialog[0].destroy()
                    dialog[1].destroy()
                }
                if (dialog_text != null) {
                    dialog = createDialog(k, dialog_text, dialog_pos)
                }
            }
        })

        let hallway = makeRoom(k, 200, 1000, 4, k.center().sub(k.vec2(0, 200)))

        hallway[3].destroy()

        let stairs_entry = makeRoom(k, 100, 100, 4, k.center().sub(k.vec2(154, -150)))

        stairs_entry[1].destroy()

        k.add([
            k.rect(4, 800),
            k.anchor('center'),
            k.pos(k.center().sub(k.vec2(102, 300))),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);

        k.add([
            k.rect(4, 100),
            k.anchor('center'),
            k.pos(k.center().sub(k.vec2(102, -250))),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);

        let stairs = k.add([
            k.sprite('stairs'),
            k.scale(0.7),
            k.area({ shape: new k.Rect(k.vec2(-100, 0), 40, 150) }),
            k.anchor('right'),
            k.pos(k.center().sub(k.vec2(100, -150))),
            'stairs_entry'
        ])

        player.onCollide(() => {
            if (player.isColliding(stairs)) {
                k.go('stairwell')
            }
        })
        
        makeDoor(k, k.center().add(k.vec2(97, -100)), 'bedroom-door', 'right')
        makeDoor(k, k.center().add(k.vec2(-107, -100)), 'bathroom-door')
        makeDoor(k, k.center().add(k.vec2(97, 100)), 'room1-door', 'right')
        makeDoor(k, k.center().add(k.vec2(-107, -300)), 'room2-door')

    })
}