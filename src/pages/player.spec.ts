import { describe, expect, it } from "vitest";
import { player as reducer, play, next } from "../store/slices/player";
// test('reducers', () => {
//     let state;
//     state = reducers({player:{course:{modules:[{id:'1',title:'Iniciando com React',lessons:[{id:'Jai8w6K_GnY',title:'CSS Modules',duration:'13:45'},{id:'w-DW4DhDfcw',title:'Estilização do Post',duration:'10:05'},{id:'D83-55LUdKE',title:'Componente: Header',duration:'06:33'},{id:'W_ATsETujaY',title:'Componente: Sidebar',duration:'09:12'},{id:'Pj8dPeameYo',title:'CSS Global',duration:'03:23'},{id:'8KBq2vhwbac',title:'Form de comentários',duration:'11:34'}]},{id:'2',title:'Estrutura da aplicação',lessons:[{id:'gE48FQXRZ_o',title:'Componente: Comment',duration:'13:45'},{id:'Ng_Vk4tBl0g',title:'Responsividade',duration:'10:05'},{id:'h5JA3wfuW1k',title:'Interações no JSX',duration:'06:33'},{id:'1G0vSTqWELg',title:'Utilizando estado',duration:'09:12'}]}]},currentModuleIndex:0,currentLessonIndex:5}}, {type:'player/next',payload:'teste'});
//     expect(state).toEqual({player:{course:{modules:[{id:'1',title:'Iniciando com React',lessons:[{id:'Jai8w6K_GnY',title:'CSS Modules',duration:'13:45'},{id:'w-DW4DhDfcw',title:'Estilização do Post',duration:'10:05'},{id:'D83-55LUdKE',title:'Componente: Header',duration:'06:33'},{id:'W_ATsETujaY',title:'Componente: Sidebar',duration:'09:12'},{id:'Pj8dPeameYo',title:'CSS Global',duration:'03:23'},{id:'8KBq2vhwbac',title:'Form de comentários',duration:'11:34'}]},{id:'2',title:'Estrutura da aplicação',lessons:[{id:'gE48FQXRZ_o',title:'Componente: Comment',duration:'13:45'},{id:'Ng_Vk4tBl0g',title:'Responsividade',duration:'10:05'},{id:'h5JA3wfuW1k',title:'Interações no JSX',duration:'06:33'},{id:'1G0vSTqWELg',title:'Utilizando estado',duration:'09:12'}]}]},currentModuleIndex:0,currentLessonIndex:5}});
//   });

const exampleState = {
    course: {
        modules: [
            {
                id: "1",
                title: "Iniciando com React",
                lessons: [
                    { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
                    { id: "w-DW4DhDfcw", title: "Estilização do Post", duration: "10:05" },
                ],
            },
            {
                id: "2",
                title: "Estrutura da aplicação",
                lessons: [
                    { id: "gE48FQXRZ_o", title: "Componente: Comment", duration: "13:45" },
                    { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
                ],
            },
        ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
};
describe("player slice", () => {
    it("shold be able to play", () => {
        const state = reducer(exampleState, play([1, 2]));
        expect(state.currentModuleIndex).toEqual(1);
        expect(state.currentLessonIndex).toEqual(2);
    });

    it("shold be able to play next automatically", () => {
        const state = reducer(exampleState, next());
        expect(state.currentModuleIndex).toEqual(0);
        expect(state.currentLessonIndex).toEqual(1);
    });
    it("shold be able to jump to the next module automatically", () => {
        const state = reducer(
            {
                ...exampleState,
                currentLessonIndex: 1,
            },
            next()
        );
        expect(state.currentModuleIndex).toEqual(1);
        expect(state.currentLessonIndex).toEqual(0);
    });
    it("shold not update the current module and lesson index if there is no next lesson available", () => {
        const state = reducer(
            {
                ...exampleState,
                currentModuleIndex: 1,
                currentLessonIndex: 1,
            },
            next()
        );
        expect(state.currentModuleIndex).toEqual(1);
        expect(state.currentLessonIndex).toEqual(1);
    });
});
