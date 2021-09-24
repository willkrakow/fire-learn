import React from 'react'


interface ImageProps {
    src: string
    alt: string
    className?: string
    orientation?: 'portrait' | 'landscape'
}


const imageSizes = {
    tiny: "128x128",
    small: "256x256",
    medium: "600x800",
    large: "1000x800"
}

const Image = ({ src, alt, className }: ImageProps) => {
    const [ size, setSize ] = React.useState('')

    React.useEffect(() => {
        const windowWidth = window.innerWidth

        if (windowWidth < 400) {
            setSize(imageSizes.tiny)
            return
        }

        if (windowWidth < 800) {
            setSize(imageSizes.small)
            return
        }

        if (windowWidth < 1200) {
            setSize(imageSizes.medium)
            return
        }

        setSize(imageSizes.large)

    }, [])

    return (
        <img src={`${src}_${size}`} alt={alt} className={className} />
    )
}

export default Image