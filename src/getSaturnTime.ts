import { useEffect, useState } from "react";
import { setInterval } from "timers";
import Consts from "./consts";


interface StructSaturnTime {
    hours: number
    minutes: number
    seconds: number
}

const GetSaturnTime = (initTime = new Date()) => {
    const [time, setTime] = useState(initTime);

    useEffect(() => {
        const id = setInterval(() => setTime(() => new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const nowSecond = Math.floor(time.getTime() / 1000);
    const restime: StructSaturnTime = {
        hours: Math.floor(nowSecond / Consts.SECONDS_PER_MINUTE / Consts.MINUTES_PER_HOUR % Consts.HOURS_PER_DAY),
        minutes: Math.floor(nowSecond / Consts.SECONDS_PER_MINUTE % Consts.MINUTES_PER_HOUR),
        seconds: nowSecond % Consts.SECONDS_PER_MINUTE
    }

    return restime;
}

export default GetSaturnTime;