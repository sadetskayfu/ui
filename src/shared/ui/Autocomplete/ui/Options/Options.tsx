import { DropdownMenu } from "@/shared/ui/DropdownMenu"
import { ItemList } from "@/shared/ui/ItemList"
import { useCallback, useMemo } from "react"
import { classNames } from "@/shared/lib"
import { countriesIcons } from "@/shared/constans/countriesIcons"
import { Option } from "../Autocomplete/Autocomplete"
import { AutocompleteVariant } from "../Autocomplete/Autocomplete"
import styles from './style.module.scss'

interface OptionsProps {
    isVisible: boolean,
    options: Option[]
    selectedValue: string
    onClose: () => void
    onOpen: () => void
    onSelect: (id: string, value: string) => void
    parentRef: React.RefObject<HTMLInputElement>
    variant: AutocompleteVariant

}

export const Options = (props: OptionsProps) => {

    const {isVisible, options, selectedValue, onClose, onOpen, onSelect, parentRef, variant} = props

    const handleSelect = useCallback((id: string, label: string) => {
        onSelect(id, label)
        onClose()
    }, [onSelect, onClose])

    const renderOptions = useMemo(() => {

        return options.map((item) => {
            const mods: Record<string, boolean> = {
                [styles['selected']]: item.id === selectedValue
            }
            return (
                <button onClick={() => handleSelect(item.id, item.label)} className={classNames(styles['item'], [], mods)} key={item.id} tabIndex={-1}>
                    {variant === 'countries' && <img src={countriesIcons[item.id]} className={styles['icon']} alt="country flag"></img>}
                    <div className={styles['title']}>
                        <span>{item.label}</span>
                        {item.phone && <span>+{item.phone}</span>}
                    </div>
                    <span className={styles['check-mark']}></span>
                </button>
            )
        })
    }, [options, selectedValue, handleSelect, variant])

    return (
        <DropdownMenu className={styles['menu']} isVisible={isVisible} onClose={onClose} parentRef={parentRef}>
            <ItemList isVisible={isVisible} onClose={onClose} onOpen={onOpen} parentRef={parentRef}>
                {options.length > 0 ? renderOptions : <span className={classNames(styles['item'], [styles['no-options']])}>No options</span>}
            </ItemList>
        </DropdownMenu>
    )
}