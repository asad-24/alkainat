import { create } from "zustand"

interface UserData {
    email?: string
    role?: string
}

interface AuthState {
    user: UserData | null
    isLoading: boolean
    error: string | null
    formData: {
        name: string
        email: string
        password: string
    }
    updateField: (field: keyof AuthState["formData"], value: string) => void
    signIn: () => Promise<void>
    signUp: () => Promise<void>
    fetchUserData: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,
    formData: {
        name: "",
        email: "",
        password: "",
    },
    updateField: (field, value) =>
        set((state) => ({
            formData: {
                ...state.formData,
                [field]: value,
            },
        })),
    signIn: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(get().formData),
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Sign in failed")
            }

            await get().fetchUserData()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({
                error: error.message || "An error occurred during sign in.",
                isLoading: false,
            })
        }
    },
    signUp: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(get().formData),
                credentials: "include",
            })

            if (!response.ok) {
                throw new Error("Sign up failed")
            }

            set({ isLoading: false })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({
                error: error.message || "An error occurred during sign up.",
                isLoading: false,
            })
        }
    },
    fetchUserData: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch("/api/auth/user", {
                credentials: "include",
            })

            if (response.ok) {
                const userData = await response.json()
                set({
                    user: userData,
                    isLoading: false
                })
            } else {
                set({
                    user: null,
                    isLoading: false
                })
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching user data:", error)
            set({
                user: null,
                error: "Failed to fetch user data.",
                isLoading: false,
            })
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            })

            const data = await response.json()

            if (data.success) {
                set({
                    user: null,
                    isLoading: false
                })
            } else {
                throw new Error(data.error || "Logout failed")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({
                error: error.message || "An error occurred during logout.",
                isLoading: false,
            })
        }
    },
}))

