import drawCurLocation from "../components/CurrentLocation";
import initDebug from "../components/debug";
import makeDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import openPresent from "../components/Present";
import makePlayer, { checkProximity } from "../entities/Player";
import makePresent from "../entities/Present";
import makeProp from "../entities/Prop";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initBedroom(k) {
    return k.scene('bedroom', (data, bgm) => {
        k.debug.log(data)
        k.onUpdate(() => {
                    if (!isMuted) {
                        bgm.paused = false;
                    } else {
                        bgm.stop()
                    }
                })
        k.setCamPos(data.playerPos)
        let player = makePlayer(k, data.playerPos, 400, data.direction);
        
        drawCurLocation(k, 'bedroom')
        
        initDebug(k, player)        
        
        let present = null

        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                checkProximity(player, player.rec_coll) < 17) {
                let dialog_text = null
                k.debug.log('interacting with ' + player.rec_coll.tags[1])
                switch (player.rec_coll.tags[1]) {
                    case 'table':
                        if (present != null) {
                            dialog_text = "you open the present on the table..."
                            data.flags.push('opened3')
                            present.destroy()
                            present = null
                            k.wait(2, () => {
                                openPresent(k, 'toy')
                            })
                            k.wait(3.5, () => {
                                if (dialog != null && !dialog[0].isDestroyed) {
                                    dialog[0].destroy()
                                    dialog[1].destroy()
                                }
                                dialog = makeDialog(k, "you found a cute little thing! who could have left him here?", 5)
                            })
                            break
                        } else {
                            dialog_text = "i didn't have time to draw all the table things..."
                        }
                        break
                    case 'bed':
                        dialog_text = "it's your bed!! you love your bed"
                        break
                    case 'laundry':
                        dialog_text = "maybe its time for laundry"
                        break
                    case 'dresser':
                        dialog_text = "so many clothes"
                        break
                    case 'hallway-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.playerPos = k.center().add(50, -50)
                        data.direction = 'left'
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

        for (let i = 0; i < data.flags.length; i++) {
            if (data.flags[i].includes('opened') && !data.flags.includes('opened3')) {
                present = makePresent(k, k.center().sub(0, 230))
            }
        }

        makeDoor(k, k.center().sub(k.vec2(roomWidth/2 + 6, -roomHeight/2 + 110)), 'hallway-door')
    })
    
}
