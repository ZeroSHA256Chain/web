import { For, Text, createListCollection } from "@chakra-ui/react";
import { useMemo } from "react";

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui";
import { ProjectView } from "@/services";

interface ProjectSelectProps {
  projects: ProjectView[];
  value: string[];
  onChange: (value: string[]) => void;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  value,
  onChange,
}) => {
  const projectsCollection = useMemo(
    () =>
      createListCollection({
        items: projects.map((project) => ({
          label: project.name,
          value: project.id?.toString() || "",
        })),
      }),
    [projects]
  );

  return (
    <SelectRoot
      _placeholder={{
        color: "white",
      }}
      color="white"
      colorPalette="teal"
      bg="gray.700"
      size="sm"
      collection={projectsCollection}
      value={value}
      onValueChange={(event) => onChange(event.value)}
    >
      <SelectTrigger>
        <SelectValueText
          placeholder="Select project"
          fontWeight="semibold"
          color="white"
        />
      </SelectTrigger>

      <SelectContent>
        <For
          each={projectsCollection.items}
          fallback={<Text>No projects found</Text>}
        >
          {(project) => (
            <SelectItem item={project} key={project.value}>
              {project.label}
            </SelectItem>
          )}
        </For>
      </SelectContent>
    </SelectRoot>
  );
};
