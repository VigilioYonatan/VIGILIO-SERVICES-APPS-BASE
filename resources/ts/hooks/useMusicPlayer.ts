import { useRef, useState } from "preact/hooks";

interface UseMusicPlayer<T> {
    tracks: T[];
}
function useMusicPlayer<T extends object>({ tracks }: UseMusicPlayer<T>) {
    const audio = useRef<HTMLAudioElement | null>();
    const progress = useRef<HTMLDivElement | null>();
    const [music, setMusic] = useState<{
        currentSongIndex: number;
        isPlaying: boolean;
        percentaje: null | string | number;
        duration: {
            seconds: number | null;
            minutes: number | null;
            hour: number | null;
        };
        volume: number;
        isLoop: boolean;
        random: boolean;
        currentTime: {
            seconds: number | null;
            minutes: number | null;
            hour: number | null;
        };
    }>({
        currentSongIndex: 0,
        isPlaying: false,
        percentaje: null,
        duration: {
            seconds: null,
            minutes: null,
            hour: null,
        },
        volume: 1,
        isLoop: false,
        random: false,
        currentTime: {
            seconds: null,
            minutes: null,
            hour: null,
        },
    });
    let forwardInterval: NodeJS.Timeout;

    const song = tracks[music.currentSongIndex];

    function onPlay() {
        audio.current?.play();
        setMusic({ ...music, isPlaying: true });
    }
    function onPause() {
        audio.current?.pause();
        setMusic({ ...music, isPlaying: false });
    }
    function generateTime() {
        const width =
            (100 / (audio.current as HTMLAudioElement).duration) *
            (audio.current as HTMLAudioElement).currentTime;
        setMusic({ ...music, percentaje: width });

        const durmin: string | number = Math.floor(
            (audio.current as HTMLAudioElement).duration / 60
        );
        const dursec: string | number = Math.floor(
            (audio.current as HTMLAudioElement).duration - durmin * 60
        );
        const durhour: string | number = Math.floor(durmin / 60);

        const curmin: string | number = Math.floor(
            (audio.current as HTMLAudioElement).currentTime / 60
        );
        const cursec: string | number = Math.floor(
            (audio.current as HTMLAudioElement).currentTime - curmin * 60
        );
        const curhour: string | number = Math.floor(curmin / 60);
        setMusic({
            ...music,
            currentTime: { minutes: curmin, seconds: cursec, hour: curhour },
            duration: { minutes: durmin, seconds: dursec, hour: durhour },
        });
    }

    function timer(time: {
        hour: number | null;
        minutes: number | null;
        seconds: number | null;
    }) {
        let timer = `${String(time.minutes)?.padStart(2, "0")}:${String(
            time.seconds
        )?.padStart(2, "0")}`;
        if (time.hour && time.hour > 0) {
            timer = `${String(time.hour)}:${String(time.minutes)?.padStart(
                2,
                "0"
            )}:${String(time.seconds)?.padStart(2, "0")}`;
        }
        return timer;
    }

    function onChangeLoop() {
        music.isLoop = !music.isLoop;
        (audio.current as HTMLAudioElement).loop = music.isLoop;
    }

    function onClickProgress(e: MouseEvent) {
        const clickX =
            e.clientX -
            (progress.current as HTMLDivElement).getBoundingClientRect().left;
        const newTime =
            (clickX / (progress.current as HTMLDivElement).offsetWidth) *
            (audio.current as HTMLAudioElement).duration;

        (audio.current as HTMLAudioElement).currentTime = newTime;
        onPlaying();
    }
    function onForward() {
        (audio.current as HTMLAudioElement).currentTime = (
            audio.current as HTMLAudioElement
        ).currentTime += 10;
        onPlaying();
    }

    function onPressForward(time = 1) {
        forwardInterval = setInterval(() => {
            (audio.current as HTMLAudioElement).currentTime += time;
        }, 100);
    }
    function onReleaseForward() {
        clearInterval(forwardInterval);
    }
    function onBackward() {
        (audio.current as HTMLAudioElement).currentTime = (
            audio.current as HTMLAudioElement
        ).currentTime -= 10;
        onPlaying();
    }
    function onPressBackward(time = 1) {
        forwardInterval = setInterval(() => {
            (audio.current as HTMLAudioElement).currentTime -= time;
        }, 100); // Repetir cada 100ms
    }
    function onReleaseBackward() {
        clearInterval(forwardInterval);
    }
    function onNext() {
        if (music.random) {
            onRandom();
        } else {
            if (music.currentSongIndex < tracks.length - 1) {
                setMusic({
                    ...music,
                    currentSongIndex: music.currentSongIndex++,
                });
            } else {
                setMusic({
                    ...music,
                    currentSongIndex: 0,
                });
            }
        }
        setTimeout(() => {
            onPlaying();
        }, 300);
    }

    function onReset() {
        (audio.current as HTMLAudioElement).currentTime = 0;
    }
    function onChangeVolume(value: number) {
        music.volume = value;
        (audio.current as HTMLAudioElement).volume = music.volume;
    }
    function onPausePlay() {
        if (music.isPlaying) {
            onPause();
            return;
        }
        onPlay();
    }

    function onBack() {
        if (music.currentSongIndex > 0) {
            setMusic({
                ...music,
                currentSongIndex: music.currentSongIndex--,
            });
        } else {
            setMusic({
                ...music,
                currentSongIndex: tracks.length - 1,
            });
        }
        setTimeout(() => {
            onPlaying();
        }, 300);
    }

    function onChangeRandom() {
        music.random = !music.random;
    }
    function onRandom() {
        const random = Math.floor(Math.random() * tracks.length - 1) + 1;
        if (random === music.currentSongIndex) {
            onRandom();
        } else {
            setMusic({
                ...music,
                currentSongIndex: random,
            });
        }
    }
    function onPlaying() {
        if (music.isPlaying) {
            onPlay();
        } else {
            onPause();
        }
    }
    return {
        song: music,
        track: song,
        refs: {
            audio,
            progress,
        },
        methods: {
            timer,
            onChangeLoop,
            onClickProgress,
            onForward,
            onPressForward,
            onReleaseForward,
            onBackward,
            onPressBackward,
            onReleaseBackward,
            onReset,
            onChangeVolume,
            onPausePlay,
            onBack,
            onChangeRandom,
            onNext,
            generateTime,
            onPlay,
            onPause,
        },
    };
}

export default useMusicPlayer;
