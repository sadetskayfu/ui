import { SectionTitle } from '@/shared/ui/SectionTitle'
import { Pagination } from '@/shared/ui/Pagination'
import styles from './style.module.scss'
import { useCallback, useState } from 'react';
import { PreviewComponents } from '@/widgets/PreviewComponents';
import { Checkbox } from '@/shared/ui/Checkbox';

const PaginationPage = () => {

    const [minimalismCurrentPage, setMinimalismCurrentPage] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [isInfinity, setIsInfinity] = useState<boolean>(false)

    const handleToggleInfinity = useCallback(() => {
        setIsInfinity((prev) => !prev)
    }, [])
  
    const handleChangePage = useCallback((page: number) => {
      setCurrentPage(page);
    }, []);
    const handleMinimalismChangePage = useCallback((page: number) => {
        setMinimalismCurrentPage(page);
      }, []);

    return (
        <div className={styles['page']}>
            <SectionTitle>Pagination</SectionTitle>
            <div className={styles['mods']}>
                <Checkbox label='Infinity' name='infinity' isChecked={isInfinity} onToggle={handleToggleInfinity}/>
            </div>
            <div className={styles['subsections']}>
                <PreviewComponents title='Minimalism' direction='vertical' isCentering>
                <Pagination totalItemsOnPage={10} totalItems={50} currentPage={minimalismCurrentPage} onChangePage={handleMinimalismChangePage} maxDisplayedPages={10} size='small' isInfinity={isInfinity}/>
                <Pagination totalItemsOnPage={10} totalItems={50} currentPage={minimalismCurrentPage} onChangePage={handleMinimalismChangePage} maxDisplayedPages={10} size='medium' isInfinity={isInfinity}/>
                <Pagination totalItemsOnPage={10} totalItems={50} currentPage={minimalismCurrentPage} onChangePage={handleMinimalismChangePage} maxDisplayedPages={100} size='large' isInfinity={isInfinity}/>
                </PreviewComponents>
                <PreviewComponents title='Pagination Square' direction='vertical' isCentering>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='small' isInfinity={isInfinity} variant='square'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='medium' isInfinity={isInfinity} variant='square'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='large' isInfinity={isInfinity} variant='square'/>
                </PreviewComponents>
                <PreviewComponents title='Pagination Round' direction='vertical' isCentering>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='small' isInfinity={isInfinity} variant='round'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='medium' isInfinity={isInfinity} variant='round'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='large' isInfinity={isInfinity} variant='round'/>
                </PreviewComponents>
            </div>
        </div>
    )
}

export default PaginationPage




