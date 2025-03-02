import {
  Avatar,
  Badge,
  For,
  Grid,
  HStack,
  Heading,
  Link,
  VStack,
} from "@chakra-ui/react";

import { Icon } from "@/components/ui";

const teamInfo = [
  {
    name: "Roman",
    github: "https://github.com/chechmek",
  },
  {
    name: "Bohdan",
    github: "https://github.com/bohdan-mykhailenko",
  },
  {
    name: "Dmytro",
    github: "https://github.com/gokuseii/",
  },
];

const missions = [
  {
    title: "Transparency",
    description:
      "Leveraging blockchain technology ensures that all records are immutable and fully accessible.",
  },
  {
    title: "Automation",
    description:
      "Our solution automates the verification process, reducing administrative workload and minimizing the risk of errors.",
  },
  {
    title: "Security",
    description:
      "We guarantee data integrity and protection from fraudulent activities, creating a reliable environment for all educational stakeholders.",
  },
];

export const AboutUsSection = () => {
  return (
    <VStack gap={8} align="stretch" mx="auto" p={6} color="white">
      <VStack gap={6} align="center">
        <Badge textAlign="center" colorPalette="teal" w="fit-content">
          <Heading textAlign="center" size="xl">
            Our Mission
          </Heading>
        </Badge>

        <VStack gap={4} align="stretch">
          <For each={missions}>
            {(item) => (
              <VStack
                border="1px solid"
                borderColor="border.muted"
                p={4}
                borderRadius="md"
                align="center"
              >
                <Heading
                  as="h4"
                  size="lg"
                  textAlign="center"
                  mb={2}
                  fontWeight="bold"
                >
                  {item.title}
                </Heading>

                <HStack gap={2} color="text.muted">
                  <Icon name="Star" color="gray" />
                  {item.description}
                </HStack>
              </VStack>
            )}
          </For>
        </VStack>
      </VStack>

      <VStack gap={4} align="center">
        <Badge textAlign="center" colorPalette="teal" w="fit-content">
          <Heading textAlign="center" size="xl">
            Our Team
          </Heading>
        </Badge>

        <Grid
          gridTemplateColumns={{
            base: "1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={4}
          w="full"
          justifyItems="space-between"
        >
          {teamInfo.map(({ name, github }) => (
            <HStack align="center" justify="center">
              <Avatar.Root>
                <Avatar.Fallback name={name} />
              </Avatar.Root>

              <Link
                key={name}
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                p={1}
                borderRadius="md"
                border="1px solid"
                borderColor="border.muted"
                _hover={{
                  textDecoration: "none",
                }}
                cursor="grab"
                textAlign="center"
              >
                {name}
              </Link>
            </HStack>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
};
