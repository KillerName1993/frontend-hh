import { Pagination as MantinePagination } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setPage } from '../../store/vacanciesSlice';

interface PaginationProps {
   currentPage?: number;
   totalPages?: number;
}

export const Pagination = ({
   currentPage = 1,
   totalPages = 1,
}: PaginationProps) => {
   const dispatch = useDispatch();

   const handlePageChange = (page: number) => {
      dispatch(setPage(page));
   };

   return (
      <div style={{
         width: '410px',
         height: '32px',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center'
      }}>
         <MantinePagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
            size="sm"
            withEdges
            getControlProps={(control) => {
               if (control === 'first') return { children: '<<' };
               if (control === 'last') return { children: '>>' };
               if (control === 'previous') return { children: '<' };
               if (control === 'next') return { children: '>' };
               return {};
            }}
            styles={{
               root: {
                  width: '100%',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  fontWeight: 400,
               },
               control: {
                  width: '28px',
                  height: '28px',
                  minWidth: '26px',
                  minHeight: '26px',
                  borderRadius: '2px',
                  fontSize: '14px',
                  border: '1px solid #D5D6DC',
                  padding: 0,
                  '&[data-active]': {
                     backgroundColor: '#5E96FC',
                     borderColor: '#5E96FC',
                     color: 'white',
                     fontWeight: 600,
                  }
               }
            }}
         />
      </div>
   );
};