import createDialog from "../components/Dialogue";
import makePlayer, { checkProximity } from "../entities/Player";
import makeProp from "../entities/Prop";
import makeRoom from "../entities/Room";

export default function drawBedroom(k) {
    let player = makePlayer(k, k.vec2(k.center()), 400);
    let dialog = null

    k.onKeyPress('space', () => {
        console.log(player.rec_coll)
        console.log(checkProximity(player, player.rec_coll))
        if (player.rec_coll != null && 
            checkProximity(player, player.rec_coll) < 20 &&
            (dialog == null || dialog.isDestroyed)) {
            const dialog_pos = k.center().add(k.vec2(0, 400))
            let dialog_text = ""
            switch (player.rec_coll.sprite) {
                case 'table':
                    dialog_text = "My table seems pretty empty today."
                    break
                case 'bed':
                    dialog_text = "My bed. I love my bed."
                    break
                case 'laundry':
                    dialog_text = "I should do my laundry soon."
                    break
                default:
                    break
            }
            dialog = createDialog(k, dialog_text, dialog_pos)
        }
    })

    let roomHeight = 300;
    let roomWidth = 400;
    makeRoom(k, roomWidth, roomHeight, 4, k.center())

    makeProp(k, k.center().sub(k.vec2(roomWidth/2, roomHeight/2 + 60)), 'bed', 'game')
    makeProp(k, k.center().sub(k.vec2(roomWidth/2 - 200, roomHeight/2 + 70)), 'window', 'game', 'botleft')
    makeProp(k, k.center().add(k.vec2(roomWidth/2, roomHeight/2 )), 'dresser', 'game', 'botright')
    
    k.add([
        k.sprite('table'),
        k.anchor('topright'),
        k.scale(1),
        k.area(),
        k.body({ isStatic: true }),
        k.pos(k.center().add(k.vec2(roomWidth/2, -roomHeight/2 - 50))),
        k.layer('game'),
    ])


    k.add([
        k.sprite('laundry'),
        k.anchor('botright'),
        k.scale(1.5),
        k.area(),
        k.pos(k.center().add(k.vec2(roomWidth/2 - 95, roomHeight/2 - 20 ))),
        k.layer('game'),
    ]);

    k.add([
        k.rect(10, 100),
        k.outline(4),
        k.anchor('botleft'),
        k.area(),
        k.body({ isStatic: true }),
        k.pos(k.center().sub(k.vec2(roomWidth/2 + 7, -roomHeight/2 + 10))),
        k.layer('game'),
    ]);
}
