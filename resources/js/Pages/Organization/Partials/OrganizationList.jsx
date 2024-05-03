import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import {
    Alert,
    Button,
    Container,
    Image,
    SimpleGrid,
    Text,
    TextInput,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
    IconAffiliate,
    IconInfoCircle,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import classes from "./css/OrgaizationList.module.css";

export default function OrganizationList({ data }) {
    const theme = useMantineTheme();
    const [search, setSearch] = useState("");
    const [debounced] = useDebouncedValue(search, 1000);

    useEffect(() => {
        router.visit(
            route(route().current(), {
                search: search,
            }),
            {
                preserveState: true,
                replace: true,
            }
        );
    }, [debounced]);

    const items = data
        ? data.map((item) => (
              <UnstyledButton
                  key={item.id}
                  className={classes.item}
                  onClick={(event) => {
                      router.visit(route("organization.show", { id: item.id }));
                  }}
              >
                  {item.logo ? (
                      <Image h="5rem" src={item.logo} />
                  ) : (
                      <IconAffiliate
                          color={theme.colors["blue"][6]}
                          size="5rem"
                      />
                  )}
                  <Text size="sm" mt={7}>
                      {item.name}
                  </Text>
              </UnstyledButton>
          ))
        : [];

    return (
        <Container my="sm" fluid>
            <div className="space-y-2 lg:flex lg:justify-between lg:space-y-0">
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={() => router.visit(route("organization.create"))}
                >
                    Add Organization
                </Button>

                <TextInput
                    placeholder="Search..."
                    leftSectionPointerEvents="none"
                    leftSection={
                        <IconSearch
                            style={{ width: rem(16), height: rem(16) }}
                        />
                    }
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
            </div>

            <SimpleGrid cols={{ base: 1, sm: 3, lg: 4, xl: 6 }} mt="md">
                {items}
            </SimpleGrid>

            {items.length === 0 && (
                <Alert
                    color="blue"
                    title="Organization"
                    icon={<IconInfoCircle />}
                >
                    No organization data found
                </Alert>
            )}
        </Container>
    );
}
