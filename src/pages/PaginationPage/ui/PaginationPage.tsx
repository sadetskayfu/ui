import { SectionTitle } from '@/shared/ui/SectionTitle'
import { Pagination } from '@/shared/ui/Pagination'
import { useCallback, useState } from 'react';
import { PreviewComponents } from '@/widgets/PreviewComponents';
import { Checkbox } from '@/shared/ui/Checkbox';

const PaginationPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [isInfinity, setIsInfinity] = useState<boolean>(false)

    const handleToggleInfinity = useCallback(() => {
        setIsInfinity((prev) => !prev)
    }, [])
  
    const handleChangePage = useCallback((page: number) => {
      setCurrentPage(page);
    }, []);

    return (
        <div className='page'>
            <section className='section'>
            <SectionTitle>Pagination</SectionTitle>
            <div className='filter'>
                <Checkbox label='Infinity' name='infinity' isChecked={isInfinity} onToggle={handleToggleInfinity}/>
            </div>
            <div className='subsections'>
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
            </section>
        </div>
    )
}

export default PaginationPage




