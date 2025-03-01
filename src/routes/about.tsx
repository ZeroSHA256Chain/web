import {
  Avatar,
  HStack,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

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
  {
    name: "Ivan",
    github: "https://github.com/Van4ooo",
  },
];

const About: React.FC = () => {
  return (
    <VStack
      gap={8}
      align="stretch"
      maxW="800px"
      mx="auto"
      p={6}
      bg="gray.900"
      color="white"
    >
      <Heading size="xl" textAlign="center">
        About Us
      </Heading>

      <Text fontSize="lg" color="gray.300">
        We, the <b>ZeroSHA256Chain</b> team, are dedicated to developing an
        innovative blockchain-based platform that enables students to validate
        their completed tasks while allowing educators and independent experts
        to efficiently verify these achievements. Our goal is to create a
        transparent, automated, and secure system for tracking educational
        success.
      </Text>

      <VStack gap={6} align="stretch">
        <Heading textAlign="center" size="xl">
          Our Mission
        </Heading>

        <VStack gap={4} align="stretch">
          <VStack
            border="1px solid"
            borderColor="gray.200"
            p={4}
            borderRadius="md"
          >
            <Heading textAlign="center" size="md" mb={2} fontWeight="bold">
              Transparency
            </Heading>

            <Text color="gray.300">
              Leveraging blockchain technology ensures that all records are
              immutable and fully accessible.
            </Text>
          </VStack>

          <VStack
            border="1px solid"
            borderColor="gray.200"
            p={4}
            borderRadius="md"
          >
            <Heading textAlign="center" size="md" mb={2} fontWeight="bold">
              Automation
            </Heading>

            <Text color="gray.300">
              Our solution automates the verification process, reducing
              administrative workload and minimizing the risk of errors.
            </Text>
          </VStack>

          <VStack
            border="1px solid"
            borderColor="gray.200"
            p={4}
            borderRadius="md"
          >
            <Heading textAlign="center" size="md" mb={2} fontWeight="bold">
              Security
            </Heading>

            <Text color="gray.300">
              We guarantee data integrity and protection from fraudulent
              activities, creating a reliable environment for all educational
              stakeholders.
            </Text>
          </VStack>
        </VStack>
      </VStack>

      <VStack gap={4} align="stretch">
        <Heading textAlign="center" size="xl">
          Our Team
        </Heading>
        <SimpleGrid columns={[2, 3, 4]} gap={4}>
          {teamInfo.map(({ name, github }) => (
            <HStack>
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
                borderColor="gray.300"
                _hover={{
                  textDecoration: "none",
                }}
                textAlign="center"
              >
                GitHub
              </Link>
            </HStack>
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export const Route = createFileRoute("/about")({
  component: About,
});
