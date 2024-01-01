import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    Paper,
    PasswordInput,
    TextInput,
    Title,
    rem,
} from "@mantine/core";
import classes from "./css/Auth.module.css";
import { AppLogo } from "@/Components/AppLogo";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className={classes.wrapper}>
                <Paper className={classes.form} radius={0} p={30}>
                    <div className="flex justify-center">
                        <AppLogo style={{ width: rem(120) }} />
                    </div>
                    <form onSubmit={submit}>
                        <Title
                            order={2}
                            className={classes.title}
                            ta="center"
                            mt="md"
                            mb={50}
                        >
                            Welcome back!
                        </Title>

                        <TextInput
                            label="Email address"
                            placeholder="your@email.com"
                            size="md"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            error={errors.email}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            mt="md"
                            size="md"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            error={errors.password}
                        />

                        <Checkbox
                            label="Keep me logged in"
                            mt="xl"
                            size="md"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />

                        <Button
                            type="submit"
                            fullWidth
                            mt="xl"
                            size="md"
                            disabled={processing}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </div>
        </GuestLayout>
    );
}
