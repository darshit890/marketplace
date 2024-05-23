'use client'

import { useFormState } from "react-dom"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { State, UpdateUserSettings } from "@/lib/action"
import { useEffect } from "react"
import { toast } from "sonner"
import { Submitbutton } from "../SubmitButton"

interface iAppProps {
    firstName: string;
    lastName: string;
    email: string
}

export const SettingsForm = ({ firstName, lastName, email }: iAppProps) => {
    const initialState: State = { message: "", status: undefined}
    const [state, formAction] = useFormState(UpdateUserSettings, initialState)

    useEffect(() => {
        if(state?.status === "error") {
            toast.error(state.message);
        } else if(state?.status === "success") {
            toast.success(state.message)
        }
     }, [state])
  return (
    <form action={formAction}>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Here you will find settings regarding your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
                <Label>First Name</Label>
                <Input name="firstName" type="text" defaultValue={firstName} />
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Last Name</Label>
                <Input name="lastName" type="text" defaultValue={lastName} />
            </div>

            <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" disabled defaultValue={email} />
            </div>
        </CardContent>
        <CardFooter>
            <Submitbutton title="Update your settings" />
        </CardFooter>
    </form>
  )
}
