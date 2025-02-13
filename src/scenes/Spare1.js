import drawCurLocation from "../components/CurrentLocation";
import initDebug from "../components/debug";
import makeDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import openPresent from "../components/Present";
import makePlayer, { checkProximity } from "../entities/Player";
import makePresent from "../entities/Present";
import makeRoom from "../entities/Room";
import { isMuted } from "../ReactUI";

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k
 */
export default function initSpare1(k) {
    k.scene('spare1', (data, bgm) => {
        k.debug.log(data)

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

        drawCurLocation(k, 'spare room 1')

        let dialog = null
        k.onKeyPress('space', () => {
                    if (player.rec_coll != null && 
                        !player.frozen &&
                        checkProximity(player, player.rec_coll) < 17) {
                        let dialog_text = null
                        k.debug.log('interacting with ' + player.rec_coll.tags[1])
                        switch (player.rec_coll.tags[1]) {
                            case 'present':
                                data.flags.push('opened1')
                                player.rec_coll.destroy()
                                player.rec_coll = null
                                k.play('interact')
                                openPresent(k, 'figure', player)
                                break
                            case 'hallway-door':
                                player.rec_coll = null
                                k.play('door_open', { volume: 0.3, speed: 1.2 })
                                data.playerPos = k.center().add(50, 150)
                                data.direction = 'left'
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

        makeRoom(k, 300, 300, 4, k.center().add(110, 80))
        makeDoor(k, k.center().sub(47, 65), 'hallway-door', 'left')
        if (!data.flags.includes('opened1')) { 
            k.wait(1, () => {
                dialog = makeDialog(k, "i forget what's in this room. but here's a present!", 5)
                makePresent(k, k.center().add(50, 50))
            })
        }
        

    })
}
