import makeKaplayCtx from "./kaplayCtx";
import initBathroom from "./scenes/Bathroom";
import initBathroom_mirror from "./scenes/Bathroom_mirror";
import initBedroom from "./scenes/Bedroom";
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

    k.loadSprite('sound_unmuted', './images/sound_unmuted.png')
    k.loadSprite('sound_muted', './images/sound_muted.png')

    k.loadSprite('present', './sprites/present.png')
    k.loadSprite('present_open1', './sprites/present_open1.png')
    k.loadSprite('present_open2', './sprites/present_open2.png')

    // bedroom
    k.loadSprite('bed', './furniture/bed.png');
    k.loadSprite('table', './furniture/table.png');
    k.loadSprite('window', './furniture/window.png');
    k.loadSprite('dresser', './furniture/dresser.png');
    k.loadSprite('laundry', './sprites/laundry.png')

    // hallway
    k.loadSprite('stairs', './images/stairs.png')

    // stairwell
    k.loadSprite('stairwell', './images/stairwell.png')

    // bathroom
    k.loadSprite('bathroom_sink', './furniture/bathroom_sink.png')
    k.loadSprite('mirror_background', './images/mirror_background.png')
    k.loadSprite('you', './images/you.png')
    k.loadSprite('toilet', './furniture/toilet.png')
    k.loadSprite('bath', './furniture/bath.png')

    // spare room 1
    k.loadSprite('figure', './sprites/figure.png')

    // spare room 2
    k.loadSprite('spare2_bed', './furniture/spare2_bed.png')
    k.loadSprite('closet_door', './furniture/closet_door.png')
    k.loadSprite('closet_door_open', './furniture/closet_door_open.png')

    // sounds
    k.loadSound('interact', './sounds/interact.wav')
    k.loadSound('door_open', './sounds/door_open.mp3')
    k.loadSound('intro_bgm', './sounds/intro_bgm.mp3')
    k.loadSound('bedroom_bgm', './sounds/bedroom_bgm.mp3')
    k.loadSound('open_present', './sounds/open_present.mp3')


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

    // starting game!!
    let bgm = k.play('bedroom_bgm', {
        volume: 0.5,
        loop: true,
        paused: true,
    })

    let data = {
        playerPos: k.center(),
        direction: 'down',
        flags: [],
    }
    // k.go('intro', bgm)
    // k.go('bedroom', k.center(), 'down', bgm)
    // k.go('hallway', k.center().add(k.vec2(50, 0)), 'down', bgm)
    // k.go('stairwell', k.center().sub(k.vec2(-200, 50)), 'left', bgm)
    k.go('spare2', data, bgm)
    
}