import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import { IconChevronRight, IconLogout, IconUser } from "@tabler/icons-react";
import classes from "./css/UserButton.module.css";
import { router } from "@inertiajs/react";

export default function UserButton({ user }) {
    return (
        <Menu withArrow position="right">
            <Menu.Target>
                <UnstyledButton className={classes.user}>
                    <Group>
                        <Avatar
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                            radius="xl"
                        />

                        <div style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                                {user.name}
                            </Text>

                            <Text c="dimmed" size="xs">
                                {user.email}
                            </Text>
                        </div>

                        <IconChevronRight
                            style={{ width: rem(14), height: rem(14) }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    onClick={() => router.visit(route("profile.edit"))}
                    leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                >
                    Profile
                </Menu.Item>
                <Menu.Item
                    onClick={() =>
                        router.visit(route("logout"), { method: "POST" })
                    }
                    color="red"
                    leftSection={
                        <IconLogout style={{ width: rem(14), height: rem(14) }} />
                    }
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
