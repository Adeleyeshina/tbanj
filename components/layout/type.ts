export interface Navlink {
    name: string,
    href: string
}


export interface MobileNavProps {
    isOpen: boolean
    onClose: () => void
}