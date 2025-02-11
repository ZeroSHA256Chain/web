import { VStack } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { Header } from "@/components/features";
import { projectsAtom, smartContractServiceAtom } from "@/store/atoms";

const Root: React.FC = () => {
  const service = useAtomValue(smartContractServiceAtom);
  const setProjects = useSetAtom(projectsAtom);

  const fetchProjects = useCallback(async () => {
    if (!service) return;

    const projectItems = await service.getAllProjects();

    setProjects(projectItems);
  }, [service, setProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <VStack background="teal.100" minHeight="100vh" width="100vw">
      <Header />

      <VStack as="main" spaceX={4} padding={4}>
        <Outlet />
      </VStack>
    </VStack>
  );
};

export const Route = createRootRoute({
  component: Root,
});
