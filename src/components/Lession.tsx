import { PlayCircle, Video } from "lucide-react";

interface LessionProps {
    title: string;
    duration: string;
    iscurrent?: boolean;
    onPlay: () => void;
}
export function Lession({ title, duration, onPlay, iscurrent = false }: LessionProps) {
    return (
        <button
            onClick={onPlay}
            data-active={iscurrent}
            disabled={iscurrent}
            className=" flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
        >
            {iscurrent ? (
                <PlayCircle className="w-4 h-4 text-emerald-400" />
            ) : (
                <Video className="w-4 h-4 text-zinc-500" />
            )}
            <span>{title}</span>
            <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
        </button>
    );
}
