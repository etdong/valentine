import { useState, useEffect, useRef } from 'react';

export let isMuted = false;

export default function ReactUI() {
    const [muted, setMuted] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        canvasRef.current = document.getElementById('game');
    }, []);

    const toggleMute = () => {
        setMuted(!muted);
        isMuted = !muted;
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.muted = isMuted;
        });
        canvasRef.current.focus();
    };

    return (
        <div>
            <img 
                className="mute-button"
                src={muted ? "/images/sound_muted.png" : "/images/sound_unmuted.png"} 
                alt={muted ? "Muted" : "Unmuted"} 
                onClick={toggleMute}
            />
        </div>
    );
}