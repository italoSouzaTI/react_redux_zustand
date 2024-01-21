import { Loader, MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useAppDispatch, useAppSelector } from "../store";
import { loadCourse, useCurrentLesson } from "../store/slices/player";
import { useEffect } from "react";
export function Player() {
    const dispatch = useAppDispatch();
    const modules = useAppSelector((state) => {
        return state.player.course?.modules;
    });
    const isCourseLoading = useAppSelector((state) => state.player.isLoading);
    const { currentLesson } = useCurrentLesson();

    useEffect(() => {
        dispatch(loadCourse());
    }, []);

    useEffect(() => {
        if (currentLesson) {
            document.title = `Assistindo: ${currentLesson.title}`;
        }
    }, [currentLesson]);
    if (isCourseLoading) {
        return (
            <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
                <div className="flex h-full items-center justify-center">
                    <Loader className="w-10 h-10 text-zinc-400 animate-spin" />
                </div>
            </div>
        );
    }
    return (
        <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
            <div className=" flex w-[1100px] flex-col gap-6">
                <div className="flex items-center justify-between">
                    {/* Header */}
                    <Header />
                    <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
                        <MessageCircle className="w-4 h-4" />
                        Deixar feedback
                    </button>
                </div>
                <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
                    <div className="flex-1">
                        <Video />
                    </div>
                    <aside className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
                        {modules &&
                            modules.map((module, index) => {
                                return (
                                    <Module
                                        key={module.id}
                                        moduleIndex={index}
                                        title={module.title}
                                        amountOfLessions={module.lessons.length}
                                    />
                                );
                            })}
                    </aside>
                </main>
            </div>
        </div>
    );
}
