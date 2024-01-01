import { Code, Group, ScrollArea, rem } from "@mantine/core";
import { AppLogo } from "@/Components/AppLogo";
import LinksGroup from "@/Components/LinksGroup";
import UserButton from "@/Components/UserButton";
import {
    IconAffiliate,
    IconDeviceDesktop,
    IconHome,
    IconReport,
} from "@tabler/icons-react";
import classes from "./css/Authenticated.module.css";

const navigation = [
    {
        label: "Dashboard",
        icon: IconHome,
        url: "dashboard",
        active: "dashboard",
    },
    {
        label: "Organization",
        icon: IconAffiliate,
        url: "organization.index",
        active: "organization.*"
    },
    {
        label: "Device",
        icon: IconDeviceDesktop,
        url: "device.index",
        active: "device.*"
    },
    {
        label: "Report",
        icon: IconReport,
        url: "dashboard",
        active: "dashboard"
    },
];

export default function Authenticated({ user, children }) {
    const links = navigation.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <>
            <nav className={classes.navbar}>
                <div className={classes.header}>
                    <Group justify="space-between">
                        <AppLogo style={{ width: rem(120) }} />
                        <Code fw={700}>v1.0.0</Code>
                    </Group>
                </div>

                <ScrollArea className={classes.links}>
                    <div className={classes.linksInner}>{links}</div>
                </ScrollArea>

                <div className={classes.footer}>
                    <UserButton user={user} />
                </div>
            </nav>

            <main className="pl-80 bg-slate-200 min-h-screen">{children}</main>
        </>
    );
}
