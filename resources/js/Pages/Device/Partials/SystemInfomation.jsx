import { calculation_percent, convert_size } from "@/Utils/ConvertSize";
import {
    Grid,
    GridCol,
    Paper,
    Progress,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import { IconServer } from "@tabler/icons-react";
import UsageChart from "./UsageChart";

export default function SystemInformation({ device, disks, usages }) {
    const capacityColor = (value) => {
        if (value < 50) {
            return "default";
        } else if (value <= 85) {
            return "orange";
        } else {
            return "red";
        }
    };
    return (
        <>
            <Grid mt="sm">
                <Grid.Col span={{ base: 12 }}>
                    <Paper
                        radius="sm"
                        pt="sm"
                        pb="sm"
                        style={{ height: 400 }}
                        withBorder
                    >
                        <UsageChart data={usages} />
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    <Paper
                        p="sm"
                        radius="sm"
                        mt="sm"
                        // style={{ height: "100%" }}
                        withBorder
                    >
                        <Title order={5}>Software</Title>

                        <Grid mt="xs">
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    OS Edition
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.os_edition}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    OS Version
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.os_version}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    OS Build
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.os_build}</Text>
                            </Grid.Col>
                        </Grid>

                        <Title order={5} mt="lg">
                            Security
                        </Title>

                        <Grid mt="xs">
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Antivirus
                                </Text>
                            </Grid.Col>
                            {/* name, version, publisher, enabled, is_up_to_date, type */}
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                {device.antivirus.map((item) => (
                                    <div key={item.name}>
                                        <Text fz="sm">{item.name}</Text>
                                        <Text fz="sm" c="dimmed">
                                            {item.enabled
                                                ? "Active"
                                                : "Inactive"}{" "}
                                            and{" "}
                                            {item.is_up_to_date
                                                ? "Updated"
                                                : "Version : " + item.version}
                                        </Text>
                                    </div>
                                ))}
                            </Grid.Col>
                        </Grid>
                        {device.firewall ? (
                            <Grid mt={{ base: 0, xl: -15 }}>
                                <Grid.Col span={{ base: 12, lg: 3 }}>
                                    <Text fz="sm" fw={700}>
                                        Firewall
                                    </Text>
                                </Grid.Col>
                                <Grid.Col
                                    mt={{ base: -15, md: 0 }}
                                    span={{ base: 12, lg: 9 }}
                                >
                                    <Text fz="sm">Windows Firewall</Text>
                                    <Text fz="sm" c="dimmed">
                                        Active and Updated
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        ) : (
                            ""
                        )}
                    </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, xl: 6 }}>
                    <Paper p="sm" radius="sm" withBorder>
                        <Title order={5}>Hardware</Title>

                        <Grid mt="xs">
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Vendor
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.vendor}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Model
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.model}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Serial Number
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.serial_number}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Motherboard
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.motherboard}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    BIOS Manufacturer
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.bios_vendor}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    BIOS Version
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.bios_version}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    BIOS Version Date
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.bios_release_date}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Processor
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.processor}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Memory
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.memory}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Video Card
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.video_card}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    Sound
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.sound}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    System Drive
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                <Text fz="sm">{device.system_drive}</Text>
                            </Grid.Col>
                        </Grid>
                        <Grid mt={{ base: 0, xl: -15 }}>
                            <Grid.Col span={{ base: 12, lg: 3 }}>
                                <Text fz="sm" fw={700}>
                                    MAC Address
                                </Text>
                            </Grid.Col>
                            <Grid.Col
                                mt={{ base: -15, md: 0 }}
                                span={{ base: 12, lg: 9 }}
                            >
                                {device.network.map((item) => (
                                    <Text fz="sm" key={item.mac_address}>
                                        {item.mac_address}{" "}
                                        {item.is_primary !== ""
                                            ? `( ${item.is_primary} )`
                                            : ""}
                                    </Text>
                                ))}
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    {disks.map((disk) => (
                        <Paper
                            key={disk.disk}
                            p="sm"
                            mt="sm"
                            radius="sm"
                            withBorder
                        >
                            <Title order={5}>Disks</Title>

                            <Text mt="xs" fz="sm" fw={700}>
                                Total Capacity (
                                {calculation_percent(disk.size, disk.free)}%)
                            </Text>
                            <Progress
                                color={capacityColor(
                                    calculation_percent(disk.size, disk.free)
                                )}
                                value={90}
                            />

                            <Paper p="sm" mt="sm" withBorder>
                                <Grid>
                                    <Grid.Col span={2}>
                                        <IconServer size={50} />
                                    </Grid.Col>
                                    <Grid.Col span={10}>
                                        <Grid mt="xs">
                                            <Grid.Col
                                                span={{ base: 12, lg: 3 }}
                                            >
                                                <Text fz="sm" fw={700}>
                                                    Disk
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col
                                                mt={{ base: -15, md: 0 }}
                                                span={{ base: 12, lg: 9 }}
                                            >
                                                <Text fz="sm">{disk.disk}</Text>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid mt={{ base: 0, xl: -15 }}>
                                            <Grid.Col
                                                span={{ base: 12, lg: 3 }}
                                            >
                                                <Text fz="sm" fw={700}>
                                                    Media Type
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col
                                                mt={{ base: -15, md: 0 }}
                                                span={{ base: 12, lg: 9 }}
                                            >
                                                <Text fz="sm">
                                                    {disk.media_type}
                                                </Text>
                                            </Grid.Col>
                                        </Grid>
                                        <Grid mt={{ base: 0, xl: -15 }}>
                                            <Grid.Col
                                                span={{ base: 12, lg: 3 }}
                                            >
                                                <Text fz="sm" fw={700}>
                                                    Model
                                                </Text>
                                            </Grid.Col>
                                            <Grid.Col
                                                mt={{ base: -15, md: 0 }}
                                                span={{ base: 12, lg: 9 }}
                                            >
                                                <Text fz="sm">
                                                    {disk.model}
                                                </Text>
                                            </Grid.Col>
                                        </Grid>

                                        {disk.drives.map((drive, index) => (
                                            <div key={index}>
                                                <Grid mt="md">
                                                    <Grid.Col
                                                        span={{
                                                            base: 12,
                                                            lg: 3,
                                                        }}
                                                    >
                                                        <Text fz="sm" fw={700}>
                                                            Drive
                                                        </Text>
                                                    </Grid.Col>
                                                    <Grid.Col
                                                        mt={{
                                                            base: -15,
                                                            md: 0,
                                                        }}
                                                        span={{
                                                            base: 12,
                                                            lg: 9,
                                                        }}
                                                    >
                                                        <Text fz="sm">
                                                            {drive.drive}
                                                        </Text>
                                                    </Grid.Col>
                                                </Grid>
                                                <Grid mt={{ base: 0, xl: -15 }}>
                                                    <Grid.Col
                                                        span={{
                                                            base: 12,
                                                            lg: 3,
                                                        }}
                                                    >
                                                        <Text fz="sm" fw={700}>
                                                            Free
                                                        </Text>
                                                    </Grid.Col>
                                                    <Grid.Col
                                                        mt={{
                                                            base: -15,
                                                            md: 0,
                                                        }}
                                                        span={{
                                                            base: 12,
                                                            lg: 9,
                                                        }}
                                                    >
                                                        <Text fz="sm">
                                                            {convert_size(
                                                                drive.free
                                                            )}
                                                        </Text>
                                                    </Grid.Col>
                                                </Grid>
                                                <Grid mt={{ base: 0, xl: -15 }}>
                                                    <Grid.Col
                                                        span={{
                                                            base: 12,
                                                            lg: 3,
                                                        }}
                                                    >
                                                        <Text fz="sm" fw={700}>
                                                            Used
                                                        </Text>
                                                    </Grid.Col>
                                                    <Grid.Col
                                                        mt={{
                                                            base: -15,
                                                            md: 0,
                                                        }}
                                                        span={{
                                                            base: 12,
                                                            lg: 9,
                                                        }}
                                                    >
                                                        <Text fz="sm">
                                                            {convert_size(
                                                                drive.size -
                                                                    drive.free
                                                            )}
                                                        </Text>
                                                    </Grid.Col>
                                                </Grid>
                                                <Grid mt={{ base: 0, xl: -15 }}>
                                                    <Grid.Col
                                                        span={{
                                                            base: 12,
                                                            lg: 3,
                                                        }}
                                                    >
                                                        <Text fz="sm" fw={700}>
                                                            Total
                                                        </Text>
                                                    </Grid.Col>
                                                    <Grid.Col
                                                        mt={{
                                                            base: -15,
                                                            md: 0,
                                                        }}
                                                        span={{
                                                            base: 12,
                                                            lg: 9,
                                                        }}
                                                    >
                                                        <Text fz="sm">
                                                            {convert_size(
                                                                drive.size
                                                            )}
                                                        </Text>
                                                    </Grid.Col>
                                                </Grid>

                                                <Progress
                                                    color={capacityColor(
                                                        calculation_percent(
                                                            drive.size,
                                                            drive.free
                                                        )
                                                    )}
                                                    value={calculation_percent(
                                                        drive.size,
                                                        drive.free
                                                    )}
                                                    mt="sm"
                                                />
                                            </div>
                                        ))}
                                    </Grid.Col>
                                </Grid>
                            </Paper>
                        </Paper>
                    ))}
                </Grid.Col>
            </Grid>
        </>
    );
}
