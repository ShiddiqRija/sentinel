import { Button, Grid, Group, TextInput } from "@mantine/core";
import { useState } from "react";

export default function PowerShellInput({ handleSendCmd }) {
    const [cmd, setCmd] = useState("");

    const sendCommand = (event) => {
        event.preventDefault();

        if (cmd.length > 0) {
            handleSendCmd(cmd);
            setCmd("");
        }
    };

    return (
        <form onSubmit={(event) => sendCommand(event)} className="mt-2">
            <Grid>
                <Grid.Col span={{ base: 12, lg: 11 }}>
                    <TextInput
                        type="text"
                        placeholder="type your command here"
                        onChange={(event) => setCmd(event.target.value)}
                        value={cmd}
                        autoFocus={true}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 1 }}>
                    <Button type="submit" >
                        Send
                    </Button>
                </Grid.Col>
            </Grid>
        </form>
    );
}
