import { useEffect, useState } from 'react'

export const usePageVisible = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const onPageVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                requestAnimationFrame(() => setVisible(true))
            } else {
                setVisible(false)
            }
        }

        document.addEventListener('visibilitychange', onPageVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', onPageVisibilityChange)
        }
    }, [])

    return visible
}
