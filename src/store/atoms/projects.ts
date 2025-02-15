import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

import { ProjectView } from "@/services";

export const projectsAtom = atomWithImmer<ProjectView[]>([]);

export const addProjectAtom = atom(null, (_, set, newProject: ProjectView) => {
  set(projectsAtom, (draft) => {
    draft.push(newProject);
  });
});

// check this
// export const addProjectAtom = atom(
//   null,
//   (get, set, newProject: ProjectView) => {
//     const currentProjects = get(projectsAtom);

//     set(projectsAtom, [...currentProjects, newProject]);
//   }
// );
