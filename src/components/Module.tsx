import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lession } from "./Lession";
import { useStore } from "../zustand-store";

interface ModuleProps {
    moduleIndex: number;
    title: string;
    amountOfLessions: number;
}
export function Module({ moduleIndex, title, amountOfLessions }: ModuleProps) {
    const { currentLessonIndex, currentModuleIndex, play, lessions } = useStore((store) => {
        return {
            lessions: store.course?.modules[moduleIndex].lessons,
            currentLessonIndex: store.currentLessonIndex,
            currentModuleIndex: store.currentModuleIndex,
            play: store.play,
        };
    });
    return (
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                    {moduleIndex + 1}
                </div>
                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xs text-zinc-400">{amountOfLessions} aulas</span>
                </div>
                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <nav className=" relative flex flex-col gap-4 p-6">
                    {lessions &&
                        lessions.map((lession, lessionIndex) => {
                            const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessionIndex;
                            return (
                                <Lession
                                    key={lession.id}
                                    title={lession.title}
                                    duration={lession.duration}
                                    onPlay={() => play([moduleIndex, lessionIndex])}
                                    iscurrent={isCurrent}
                                />
                            );
                        })}
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}
