import { TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../store/vacanciesSlice';

export const SearchBar = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const dispatch = useDispatch();

   const handleSearch = () => {
      dispatch(setSearch(searchQuery));
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         handleSearch();
      }
   };

   return (
      <div style={{
         position: 'absolute',
         width: '508px',
         height: '42px',
         top: '96px',
         left: '712px',
         display: 'flex',
         gap: '12px',
         alignItems: 'center'
      }}>
         {/* Поле поиска */}
         <TextInput
            placeholder="Должность или название компании"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyDown={handleKeyPress}
            variant="default"
            size="md"
            radius="md"
            style={{
               width: '403px',
               height: '42px'
            }}
            leftSection={
               <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: '8px' }}
               >
                  <circle
                     cx="7"
                     cy="7"
                     r="5.5"
                     stroke="#ACADB9"
                     strokeWidth="1.5"
                     fill="none"
                  />
                  <path
                     d="M11 11L14.5 14.5"
                     stroke="#ACADB9"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                  />
               </svg>
            }
            styles={{
               root: {
                  width: '403px'
               },
               input: {
                  width: '403px',
                  height: '42px',
                  fontSize: '14px',
                  paddingLeft: '48px',
                  '&::placeholder': {
                     color: '#ACADB9',
                     fontSize: '14px'
                  }
               },
               section: {
                  marginLeft: '12px',
                  width: '40px'
               }
            }}
         />

         {/* Кнопка "Найти" */}
         <Button
            onClick={handleSearch}
            variant="filled"
            color="blue"
            size="md"
            radius="sm"
            style={{
               width: '93px',
               height: '42px',
               padding: '0',
               backgroundColor: '#3c7bf0ff',
               fontSize: '14px',
               fontWeight: 500,
               borderRadius: '8px'
            }}
         >
            Найти
         </Button>
      </div>
   );
};