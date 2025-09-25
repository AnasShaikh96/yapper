'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useEffect } from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { profileFormSchema } from '@/lib/validation-schemas'
import { GalleryVerticalEnd } from 'lucide-react'
import { getProfile, updateProfile } from '@/lib/api'

const formSchema = profileFormSchema

export default function RegisterPreview() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: undefined,
            confirmPassword: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { confirmPassword, ...payload } = values
            await updateProfile(payload)
            toast.success('Profile updated successfully')
        } catch (error) {
            console.error('Form submission error', error)
            toast.error('Failed to submit the form. Please try again.')
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getProfile()
                const user = Array.isArray(res.data) ? res.data[0] : res.data
                if (user) {
                    form.reset({
                        username: user.username || '',
                        email: user.email || '',
                        password: undefined,
                        confirmPassword: undefined,
                    })
                }
            } catch (error) {
                // swallow; user might be unauthenticated
            }
        })()
    }, [])

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </a>
                <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader className=' text-center'>
                            <CardTitle className="text-2xl">Profile</CardTitle>
                            <CardDescription>
                                Update profile details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid gap-4">
                                        {/* Username Field */}
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="username">Username</FormLabel>
                                                    <FormControl>
                                                        <Input id="username" placeholder="johndoe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Email Field */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id="email"
                                                            placeholder="johndoe@mail.com"
                                                            type="email"
                                                            autoComplete="email"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Removed phone field: not in backend schema */}

                                        {/* Password Field */}
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="password">Password</FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            id="password"
                                                            placeholder="******"
                                                            autoComplete="new-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Confirm Password Field */}
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem className="grid gap-2">
                                                    <FormLabel htmlFor="confirmPassword">
                                                        Confirm Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <PasswordInput
                                                            id="confirmPassword"
                                                            placeholder="******"
                                                            autoComplete="new-password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                            {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                            <div className="mt-4 text-center text-sm">
                                <Link href="/notes" className="underline">
                                    Back to app
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
