import drawCurLocation from "../components/CurrentLocation";
import makeDialog from "../components/Dialogue";
import openPresent from "../components/Present";
import makePlayer, { checkProximity } from "../entities/Player";
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

        let dialog = null
        k.onKeyPress('space', () => {
            if (player.rec_coll != null && 
                !player.frozen &&
                checkProximity(player, player.rec_coll) < 17) {
                let dialog_text = null
                switch (player.rec_coll.tags[1]) {
                    case 'counter1':
                        dialog_text = "this air fryer has been so useful at 1AM"
                        break
                    case 'fridge':
                        dialog_text = "we should have charcuterie again soon"
                        break
                    case 'counter2':
                        dialog_text = "there's some hot water in the kettle"
                        break
                    case 'stove':
                        dialog_text = "yeowch! it's still hot"
                        break
                    case 'counter3':
                        dialog_text = "mother made some food"
                        break
                    case 'island':
                        dialog_text = "phew, no dishes to wash. thank goodness"
                        break
                    case 'kitchen_table':
                        dialog_text = "might be a good idea to eat more fruits baby"
                        break
                    case 'chair':
                        dialog_text = "no time to sit around!"
                        break
                    case 'pantry':
                        player.frozen = true
                        dialog_text = "woah! who put this here!"
                        kitchen_pantry.untag('pantry')
                        data.flags.push('opened4')
                        k.play('door_open')
                        k.wait(2, () => {
                            openPresent(k, 'magnet', player)
                            kitchen_pantry.tag('pantry_open')
                        })
                        break
                    case 'pantry_open':
                        dialog_text = "nothing but food in here now"
                        break
                    case 'couch1':
                        dialog_text = "such a comfy couch. great for naps"
                        break
                    case 'couch3':
                        dialog_text = "i remember when you were sitting here and \n i spilled soup all over the stairs..."
                        break
                    case 'couch2':
                        dialog_text = "nobody really sits here huh"
                        break
                    case 'living_table':
                        dialog_text = "remember when we slept here that one night?"
                        break
                    case 'mantle':
                        dialog_text = "watching camping videos while eating is our specialty"
                        break
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


        let separator = makeRoom(k, 520, 200, 4, k.center().add(450, 0))
        separator[1].destroy()

        let stair_bound = makeRoom(k, 150, 190, 4, k.center().add(-180, 0))
        stair_bound[1].destroy()

        let lobby = makeRoom(k, 800, 500, 4, k.center().add(310, -350))
        lobby[2].destroy()

        let kitchen = makeRoom(k, 950, 1200, 4, k.center().add(380, 700))
        kitchen[0].destroy()
        kitchen[3].destroy()

        k.add([
            k.sprite('kitchen_island'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(300, 300)),
            'island'
        ])

        k.add([
            k.sprite('kitchen_counter1'),
            k.scale(0.6),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(200, 0)),
            'counter1'
        ])
        
        k.add([
            k.sprite('kitchen_counter2'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(700, 200)),
            'counter2'
        ])

        k.add([
            k.sprite('kitchen_counter3'),
            k.scale(0.7),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(700, 480)),
            k.z(1),
            'counter3'
        ])

        let kitchen_pantry = k.add([
            k.sprite('kitchen_pantry'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area({ shape: new k.Polygon([k.vec2(0, 380), k.vec2(180, 450), k.vec2(150, 0), k.vec2(0, 0), ]) }),
            k.pos(k.center().add(570, -80)),
            'pantry'
        ])

        k.add([
            k.sprite('blank'),
            k.scale(0.8),
            k.area(),
            k.pos(k.center().add(400, 0)),
            k.layer('bg')
        ])

        k.add([
            k.sprite('kitchen_fridge'),
            k.scale(0.6),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(390, -65)),
            'fridge'
        ])

        k.add([
            k.sprite('kitchen_stove'),
            k.scale(0.7),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(690, 330)),
            'stove'
        ])

        k.add([
            k.sprite('kitchen_table'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(200, 900)),
            k.z(2),
            'kitchen_table'
        ])

        k.add([
            k.sprite('kitchen_chair'),
            k.scale(0.6),
            k.pos(k.center().add(250, 780)),
            'chair'
        ])

        k.add([
            k.sprite('kitchen_chair'),
            k.scale(0.6),
            k.pos(k.center().add(450, 780)),
            'chair'
        ])

        k.add([
            k.sprite('kitchen_chair_left'),
            k.body({isStatic: true}),
            k.area(),
            k.scale(0.6),
            k.pos(k.center().add(500, 900)),
            'chair'
        ])


        let living = makeRoom(k, 750, 700, 4, k.center().add(-470, 450))
        living[1].destroy()

        let stairs = k.add([
            k.sprite('stairs'),
            k.scale(1.2),
            k.anchor('right'),
            k.area({ shape: new k.Rect(k.vec2(-100, 0), 40, 150) }),
            k.pos(k.center().sub(80, 0)),
        ])

        k.add([
            k.sprite('couch'),
            k.scale(1.2),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(-200, 250)),
            'couch1'
        ])

        k.add([
            k.sprite('couch_2'),
            k.scale(0.8),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(-600, 620)),
            'couch2'
        ])

        k.add([
            k.sprite('couch_3'),
            k.scale(0.9),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(-600, 0)),
            'couch3'
        ])

        k.add([
            k.sprite('living_table'),
            k.scale(0.7),
            k.body({isStatic: true}),
            k.area({shape: new k.Rect(k.vec2(0), 250, 420)}),
            k.pos(k.center().add(-500, 250)),
            'living_table'
        ])

        k.add([
            k.sprite('living_mantle'),
            k.scale(0.9),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(-850, 230)),
            'mantle'
        ])

        k.add([
            k.sprite('living_tv'),
            k.scale(0.9),
            k.body({isStatic: true}),
            k.area(),
            k.pos(k.center().add(-850, 120)),
            'tv'
        ])

        k.add([
            k.rect(3, 500),
            k.pos(k.center().add(-96, 800)),
            k.color(0, 0, 0),
            k.area(),
            k.body({isStatic: true}),
            k.layer('bg'),
            "wall"
        ]);
        

        player.onCollide(() => {
            if (player.isColliding(stairs)) {
                data.playerPos = k.center().add(190, 260)
                data.direction = 'left'
                k.go('stairwell', data, bgm)
            }
        })
    })
}