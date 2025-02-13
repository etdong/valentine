import drawCurLocation from "../components/CurrentLocation";
import makeDialog from "../components/Dialogue";
import makeDoor from "../components/Door";
import makePlayer, { checkProximity } from "../entities/Player";
import makeRoom from "../entities/Room";
import { isMuted } from '../ReactUI';

/**
 * 
 * @param {import("kaplay").KAPLAYCtx} k 
 */
export default function initHallway(k) {
    k.scene('hallway', (data, bgm) => {
        k.onUpdate(() => {
            if (!isMuted) {
                bgm.paused = false;
            } else {
                bgm.stop()
            }
        })

        k.setCamPos(data.playerPos)
        let player = makePlayer(k, data.playerPos, 400, data.direction);

        drawCurLocation(k, 'hallway')
        
        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                checkProximity(player, player.rec_coll) < 17) {
                let dialog_text = null
                switch (player.rec_coll.tags[1]) {
                    case 'bedroom-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.direction = 'right'
                        data.playerPos = k.center().sub(150, -100)
                        k.go('bedroom', data, bgm)
                        return
                    case 'bathroom-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.playerPos = k.center()
                        data.direction = 'left'
                        k.go('bathroom', data, bgm)
                        return
                    case 'spare room 1-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.playerPos = k.center()
                        data.direction = 'right'
                        k.go('spare1', data, bgm)
                        return
                    case 'spare room 2-door':
                        player.rec_coll = null
                        k.play('door_open', { volume: 0.3, speed: 1.2 })
                        data.playerPos = k.center()
                        data.direction = 'left'
                        k.go('spare2', data, bgm)
                        return
                    case 'couch1':
                        dialog_text = "i could have zonked out on this couch \n that night after asian glow"
                        break
                    case 'tv':
                        dialog_text = "interstellar was goated. we should watch more movies on this"
                        break
                    case 'table':
                        dialog_text = "remember sleeping on the ground here lol"
                        break
                    case 'couch2':
                        dialog_text = "nap time here was goated"
                        break
                    case 'big_present':
                        k.go('finale', data, bgm)
                        return
                    default:
                        break
                }
                if (dialog != null && !dialog[0].isDestroyed) {
                    dialog[0].destroy()
                    dialog[1].destroy()
                }
                if (dialog_text != null) {
                    k.play('interact')
                    dialog = makeDialog(k, dialog_text, 5)
                }
            }
        })

        let hallway = makeRoom(k, 200, 1000, 4, k.center().sub(0, 200))

        hallway[3].destroy()
        hallway[0].destroy()

        let connector = makeRoom(k, 300, 300, 4, k.center().sub(-50, 850))
        connector[2].destroy()
        connector[0].destroy()

        k.add([
            k.rect(100, 4),
            k.pos(k.center().sub(-100, 700)),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);

        k.add([
            k.rect(100, 4),
            k.pos(k.center().sub(-100, 1000)),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);

        let bonus_room = makeRoom(k, 800, 600, 4, k.center().sub(200, 1300))
        bonus_room[2].destroy()

        k.add([
            k.rect(500, 4),
            k.pos(k.center().sub(600, 1000)),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);

        k.add([
            k.sprite('couch'),
            k.scale(1),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().sub(0, 1500)),
            'couch1'
        ])

        k.add([
            k.sprite('couch_3'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().sub(500, 1700)),
            'couch2'
        ])

        let table = k.add([
            k.sprite('bonus_table'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().sub(200, 1470)),
            'table'
        ])

        k.add([
            k.sprite('bonus_tv'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().sub(600, 1500)),
            'tv'
        ])

        
        for (let i = 0; i < data.flags.length; i++) {
            if (data.flags[i].includes('opened1') && 
            data.flags.includes('opened2') &&
            data.flags.includes('opened3') &&
            data.flags.includes('opened4')) {
                table.destroy()
                k.add([
                    k.sprite('big_present'),
                    k.scale(1),
                    k.body({isStatic: true}),
                    k.area(),
                    k.pos(k.center().sub(400, 1500)),
                    'big_present'
                ])
            }
        }


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
        ])

        player.onCollide(() => {
            if (player.isColliding(stairs)) {
                data.playerPos = k.center().sub(-200, 50)
                data.direction = 'left'
                k.go('stairwell', data, bgm)
            }
        })
        
        makeDoor(k, k.center().add(k.vec2(97, -100)), 'bedroom-door', 'right')
        makeDoor(k, k.center().add(k.vec2(-107, -100)), 'bathroom-door')
        makeDoor(k, k.center().add(k.vec2(97, 100)), 'spare room 1-door', 'right')
        makeDoor(k, k.center().add(k.vec2(-107, -300)), 'spare room 2-door')

    })
}