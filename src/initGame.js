import makeKaplayCtx from "./kaplayCtx";
import initBathroom from "./scenes/Bathroom";
import initBathroom_mirror from "./scenes/Bathroom_mirror";
import initBedroom from "./scenes/Bedroom";
import initDownstairs from "./scenes/Downstairs";
import initFinale from "./scenes/Finale";
import initHallway from "./scenes/Hallway";
import initIntro from "./scenes/Intro";
import initSpare1 from "./scenes/Spare1";
import initSpare2 from "./scenes/Spare2";
import initStairwell from "./scenes/Stairwell";

export default async function initGame() {

    // create kaplay context and define layers
    const k = makeKaplayCtx();
    k.setLayers(["bg", "game", "fg"], "game")
    
    // fonts
    k.loadFont('gaegu', './fonts/Gaegu-Regular.ttf')

    // sprites
    k.loadSprite('player', './sprites/player_sheet.png', {
        sliceX: 2,
        sliceY: 5,
        anims: {
            "left": { from: 2, to: 3, loop: true },
            "right": { from: 0, to: 1, loop: true },
            "down": { from: 4, to: 5, loop: true },
            "up": { from: 6, to: 7, loop: true },
            'left-idle': 3,
            'right-idle': 1,
            "down-idle": 8,
            "up-idle": 9,
        },
    });

    k.loadSprite('blank', './images/blank.png')

    // sounds
    k.loadSprite('sound_unmuted', './images/sound_unmuted.png')
    k.loadSprite('sound_muted', './images/sound_muted.png')

    k.loadSound('interact', './sounds/interact.wav')
    k.loadSound('door_open', './sounds/door_open.mp3')
    k.loadSound('intro_bgm', './sounds/intro_bgm.mp3')
    k.loadSound('bedroom_bgm', './sounds/bedroom_bgm.mp3')
    k.loadSound('open_present', './sounds/open_present.mp3')
    k.loadSound('explode_sound', './sounds/explosion.mp3')
    k.loadSound('pageturn', './sounds.pageturn.mp3')

    // presents
    k.loadSprite('present_open0', './images/present.png')
    k.loadSprite('present_open1', './images/present_open1.png')
    k.loadSprite('present_open2', './images/present_open2.png')
    k.loadSprite('present', './sprites/present.png')
    k.loadSprite('big_present', './sprites/big_present.png')

    k.loadSprite('toy', './sprites/toy.png')
    k.loadSprite('note', './sprites/note.png')
    k.loadSprite('figure', './sprites/figure.png')
    k.loadSprite('magnet', './sprites/magnet.png')

    // bedroom
    k.loadSprite('bed', './furniture/bed.png');
    k.loadSprite('table', './furniture/table.png');
    k.loadSprite('window', './furniture/window.png');
    k.loadSprite('dresser', './furniture/dresser.png');
    k.loadSprite('laundry', './sprites/laundry.png')

    // hallway
    k.loadSprite('stairs', './images/stairs.png')
    k.loadSprite('bonus_table', './furniture/bonus_table.png')
    k.loadSprite('bonus_tv', './furniture/bonus_tv.png')

    // stairwell
    k.loadSprite('stairwell', './images/stairwell.png')

    // bathroom
    k.loadSprite('bathroom_sink', './furniture/bathroom_sink.png')
    k.loadSprite('mirror_background', './images/mirror_background.png')
    k.loadSprite('you', './images/you.png')
    k.loadSprite('toilet', './furniture/toilet.png')
    k.loadSprite('bath', './furniture/bath.png')

    // spare room 2
    k.loadSprite('spare2_bed', './furniture/spare2_bed.png')
    k.loadSprite('closet_door', './furniture/closet_door.png')
    k.loadSprite('closet_door_open', './furniture/closet_door_open.png')

    // living room
    k.loadSprite('couch', './furniture/couch.png')
    k.loadSprite('couch_2', './furniture/couch_2.png')
    k.loadSprite('couch_3', './furniture/couch_3.png')
    k.loadSprite('living_table', './furniture/living_table.png')
    k.loadSprite('living_mantle', './furniture/living_mantle.png')
    k.loadSprite('living_tv', './furniture/living_tv.png')

    // kitchen
    k.loadSprite('kitchen_island', './furniture/kitchen_island.png')
    k.loadSprite('kitchen_counter1', './furniture/kitchen_counter1.png')
    k.loadSprite('kitchen_counter2', './furniture/kitchen_counter2.png')
    k.loadSprite('kitchen_counter3', './furniture/kitchen_counter3.png')
    k.loadSprite('kitchen_fridge', './furniture/kitchen_fridge.png')
    k.loadSprite('kitchen_pantry', './furniture/kitchen_pantry.png')
    k.loadSprite('kitchen_stove', './furniture/kitchen_stove.png')
    k.loadSprite('kitchen_table', './furniture/kitchen_table.png')
    k.loadSprite('kitchen_chair', './furniture/kitchen_chair.png')
    k.loadSprite('kitchen_chair_left', './furniture/kitchen_chair_left.png')

    // finale
    k.loadSprite('big_present_scene', './images/big_present_scene.png')
    k.loadSprite('explosion', './images/explosion.png')
    k.loadSprite('letter1', './images/letter1.png')
    k.loadSprite('letter2', './images/letter2.png')
    k.loadSprite('letter3', './images/letter3.png')
    k.loadSprite('letter4', './images/letter4.png')
    k.loadSprite('letter5', './images/letter5.png')
    k.loadSprite('letter6', './images/letter6.png')
    k.loadSprite('letter7', './images/letter7.png')
    k.loadSprite('letter8', './images/letter8.png')
    k.loadSprite('letter', './images/letter.png')

    
    


    // camera zoom initialization
    const setInitCamZoom = () => {
        if (k.width() < 1000) {
            k.setCamScale(0.7, 0.7);
            return;
        }

        k.setCamScale(1, 1);
    }

    setInitCamZoom();

    // scene initialization
    initBedroom(k)
    initHallway(k)
    initStairwell(k)
    initIntro(k)
    initBathroom(k)
    initBathroom_mirror(k)
    initSpare1(k)
    initSpare2(k)
    initDownstairs(k)
    initFinale(k)

    // starting game!!
    k.go('menu')
    
}