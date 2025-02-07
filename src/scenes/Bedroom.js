import drawCurLocation from "../components/CurrentLocation";
import createDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import makePlayer, { checkProximity } from "../entities/Player";
import makeProp from "../entities/Prop";
import makeRoom from "../entities/Room";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initBedroom(k) {
    return k.scene('bedroom', (playerPos, direction) => {
        k.setCamPos(playerPos)
        let player = makePlayer(k, playerPos, 400, direction);
        
        drawCurLocation(k, 'bedroom')
        

        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                checkProximity(player, player.rec_coll) < 17) {
                const dialog_pos = k.center().add(k.vec2(0, 400))
                let dialog_text = null
                k.debug.log('interacting with ' + player.rec_coll.tags[1])
                switch (player.rec_coll.tags[1]) {
                    case 'table':
                        dialog_text = "My table seems pretty empty today."
                        break
                    case 'bed':
                        dialog_text = "My bed. I love my bed."
                        break
                    case 'laundry':
                        dialog_text = "I should do my laundry soon."
                        break
                    case 'dresser':
                        dialog_text = "My dresser."
                        break
                    case 'hallway-door':
                        player.rec_coll = null
                        k.go('hallway', k.center().add(k.vec2(50, 0)), 'left')
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

        let roomHeight = 300;
        let roomWidth = 400;
        makeRoom(k, roomWidth, roomHeight, 4, k.center())

        makeProp(k, k.center().sub(k.vec2(roomWidth/2 + 10, roomHeight/2 + 60)), 'bed', 'game', 'bed')
        makeProp(k, k.center().sub(k.vec2(roomWidth/2 - 200, roomHeight/2 + 270)), 'window', 'game', 'window')
        makeProp(k, k.center().add(k.vec2(roomWidth/2 - 90, roomHeight/2 - 350)), 'dresser', 'game', 'dresser')
        
        k.add([
            k.sprite('table'),
            k.scale(1),
            k.area(),
            k.body({ isStatic: true }),
            k.pos(k.center().add(k.vec2(roomWidth/2-240, -roomHeight/2 -50))),
            k.layer('game'),
            k.z(-1),
            'table'
        ])

        k.add([
            k.sprite('laundry'),
            k.scale(1.5),
            k.anchor('center'),
            k.area({ shape: new k.Rect(k.vec2(0), 40, 40) }),
            k.pos(k.center().add(k.vec2(roomWidth/2 - 170, roomHeight/2 - 100))),
            k.layer('game'),
            'laundry',
        ]);

        makeDoor(k, k.center().sub(k.vec2(roomWidth/2 + 6, -roomHeight/2 + 110)), 'hallway-door')
    })
    
}
