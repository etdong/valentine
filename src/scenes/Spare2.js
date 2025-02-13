import drawCurLocation from "../components/CurrentLocation";
import initDebug from "../components/debug";
import makeDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import openPresent from "../components/Present";
import makePlayer, { checkProximity } from "../entities/Player";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initSpare2(k) {
    k.scene('spare2', (data, bgm) => {
        k.onUpdate(() => {
            if (!isMuted) {
                bgm.paused = false;
            } else {
                bgm.stop()
            }
        });

        k.setCamPos(data.playerPos)
        let player = makePlayer(k, data.playerPos, 400, data.direction);

        initDebug(k, player)

        drawCurLocation(k, 'spare room 2')

        let dialog = null
        k.onKeyPress('space', () => {
                    if (player.rec_coll != null && 
                        !player.frozen &&
                        checkProximity(player, player.rec_coll) < 17) {
                        let dialog_text = null
                        k.debug.log('interacting with ' + player.rec_coll.tags[1])
                        switch (player.rec_coll.tags[1]) {
                            case 'bed':
                                dialog_text = 'wow. a lot of clothes.'
                                break
                            case 'closet':
                                player.frozen = true
                                dialog_text = 'you open the closet and...'
                                data.flags.push('opened2')
                                k.wait(2, () => {
                                    openPresent(k, 'note', player)
                                    closet.sprite = 'closet_door_open'
                                    closet.untag('closet')
                                    closet.tag('closet_open')
                                })
                                break
                            case 'closet_open':
                                dialog_text = "there's nothing else in the closet"
                                break
                            case 'hallway-door':
                                player.rec_coll = null
                                k.play('door_open', { volume: 0.3, speed: 1.2 })
                                data.playerPos = k.center().sub(50, 220)
                                data.direction = 'right'
                                k.go('hallway', data, bgm)
                                return
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
                });

        makeRoom(k, 300, 350, 4, k.center().sub(110, 150))
        makeDoor(k, k.center().add(37, -80), 'hallway-door', 'right')

        k.add([
            k.sprite('spare2_bed'),
            k.area(),
            k.body( {isStatic: true} ),
            k.pos(k.center().sub(130, 350)),
            k.layer('game'),
            'bed'
        ])

        let closet = k.add([
            k.sprite('closet_door'),
            k.area({ shape: new k.Rect(k.vec2(0), 200, 250) }),
            k.scale(0.7),
            k.body( {isStatic: true} ),
            k.pos(k.center().sub(260, 490)),
            k.layer('game')
        ])

        if (data.flags.includes('opened2')) {
            closet.sprite = 'closet_door_open'
            closet.tag('closet_open')
        } else {
            closet.tag('closet')
        }
    })
}
