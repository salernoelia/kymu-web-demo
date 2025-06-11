export default defineNuxtPlugin(() => {
    const router = useRouter()

    router.beforeEach((to, from) => {
        const routeOrder = [
            '/',
            '/editor',
            '/analyse',
            '/bericht',
            '/kommunikation'
        ]

        const fromIndex = routeOrder.indexOf(from.path)
        const toIndex = routeOrder.indexOf(to.path)

        let direction = 'forward'
        if (fromIndex !== -1 && toIndex !== -1) {
            direction = toIndex > fromIndex ? 'forward' : 'backward'
        }

        if (process.client) {
            document.documentElement.setAttribute('data-transition-direction', direction)
        }
    })
})