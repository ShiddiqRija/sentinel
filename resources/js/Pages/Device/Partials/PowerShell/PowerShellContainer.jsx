import { Box, ScrollArea } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import classes from "../../css/powershell.module.css";
import PowerShellInput from "./PowerShellInput";

export default function PoweShellContainer({ currentCommand, socket, user }) {
    const [commands, setCommands] = useState([]);
    const scrollRef = useRef();

    const handleSendCmd = async (command) => {
        socket.current.emit("send-cmd", {
            recipient: currentCommand.id,
            sender: user.id,
            message: command,
            shell: "powershell",
            type: "run-shell",
        });
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("response", (message) => {
                if (message == "") {
                    message = "<br />";
                }
                setCommands((prev) => [
                    ...prev,
                    { command: message.toString() },
                ]);
            });
        }
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [commands]);

    return (
        <>
            <ScrollArea bg="#0808A5" className={classes.box}>
                <div className={classes.terminal}>
                    {commands.map((command) => (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={classes.terminal}
                                dangerouslySetInnerHTML={{
                                    __html: command.command,
                                }}
                            />
                            {/* {command.command}
                            </div> */}
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <PowerShellInput handleSendCmd={handleSendCmd} />
        </>
    );
}
