import websocket, { type Socket } from "socket.io-client";
import { useEffect, useState } from "preact/hooks";
import { signal } from "@preact/signals";

const socket = websocket({ transports: ["websocket"] });
const io = signal<null | Socket>(null);
function useSocket() {
    const [isConnect, setIsConnect] = useState<boolean>(false);

    useEffect(() => {
        io.value = socket;
    }, []);

    useEffect(() => {
        io.value?.on("connect", () => {
            setIsConnect(true);
        });
    }, [io.value]);

    useEffect(() => {
        io.value?.on("disconnect", () => {
            setIsConnect(false);
        });
    }, [io.value]);

    return { io: io.value, isConnect };
}

export default useSocket;
