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
                <Checkbox label='Infinity' name='infinity' isChecked={isInfinity} onToggle={handleToggleInfinity}/>
            <div className='subsections'>
                <PreviewComponents title='Pagination Square' direction='vertical'>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='small-l' isInfinity={isInfinity} form='square'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='medium' isInfinity={isInfinity} form='square'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='large' isInfinity={isInfinity} form='square'/>
                </PreviewComponents>
                <PreviewComponents title='Pagination Round' direction='vertical'>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='small-l' isInfinity={isInfinity} form='round'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='medium' isInfinity={isInfinity} form='round'/>
                <Pagination totalItemsOnPage={10} totalItems={200} currentPage={currentPage} onChangePage={handleChangePage} maxDisplayedPages={5} size='large' isInfinity={isInfinity} form='round'/>
                </PreviewComponents>
            </div>
            </section>
        </div>
    )
}

export default PaginationPage




