import { SectionTitle } from '@/shared/ui/SectionTitle'
import styles from './style.module.scss'
import { PreviewComponents } from '@/widgets/PreviewComponents'
import { fieldSizes, fieldVariants, labelVariants } from '../model/TextField'
import { Input } from '@/shared/ui/Input'
import { capitalizeFirstLetter } from '@/shared/lib'
import { useCallback, useMemo, useState } from 'react'

const TextFieldPage = () => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string[]>([])

    const handleChangeValue = useCallback((value: string) => {
        setValue(value)
    }, [])

    const renderFieldVariants = useMemo(() => {
        return fieldVariants.map((item) => {
            return (
                <Input label={capitalizeFirstLetter(item) as string} variant={item} name={item} value={value} onChange={handleChangeValue} placeholder='Input value...'/>
            )
        })
    }, [value, handleChangeValue])

    const renderSizes = useMemo(() => {
        return fieldSizes.map((item) => {
            return (
                <Input label={capitalizeFirstLetter(item) as string} variant='transparent' size={item} name={item} value={value} onChange={handleChangeValue} placeholder='Input value...'/>
            )
        }) 
    }, [value, handleChangeValue])

    const renderLabelVariants = useMemo(() => {
        return labelVariants.map((item) => {
            return (
                <Input label={capitalizeFirstLetter(item) as string} variant='transparent' labelVariant={item} name={item} value={value} onChange={handleChangeValue} placeholder={`${item}...`}/>
            )
        }) 
    }, [value, handleChangeValue])

    return (
        <div className={styles['page']}>
            <SectionTitle>Text Filed</SectionTitle>
            <div className={styles['subsections']}>
                <PreviewComponents title='Field variants'>
                    {renderFieldVariants}
                </PreviewComponents>
                <PreviewComponents title='Sizes'>
                    {renderSizes}
                </PreviewComponents>
                <PreviewComponents title='Label variants'>
                    {renderLabelVariants}
                </PreviewComponents>
            </div>
        </div>
    )
}

export default TextFieldPage