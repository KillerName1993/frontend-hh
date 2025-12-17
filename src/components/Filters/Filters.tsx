import { TextInput, Select, Button, Text, Pill, Group } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCity, addSkill, removeSkill } from '../../store/vacanciesSlice';
import type { RootState } from '../../store';
import styles from './Filters.module.css';

const cities = [
   { value: '', label: 'Все города' },
   { value: '1', label: 'Москва' },
   { value: '2', label: 'Санкт-Петербург' },
];

export const Filters = () => {
   const dispatch = useDispatch();
   const { skills, city } = useSelector((state: RootState) => state.vacancies.filters);
   const [newSkill, setNewSkill] = useState('');

   const handleAddSkill = () => {
      const trimmedSkill = newSkill.trim();
      if (trimmedSkill && !skills.includes(trimmedSkill)) {
         dispatch(addSkill(trimmedSkill));
         setNewSkill('');
      }
   };

   const handleRemoveSkill = (skillToRemove: string) => {
      dispatch(removeSkill(skillToRemove));
   };

   const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         handleAddSkill();
      }
   };

   const handleCityChange = (value: string | null) => {
      dispatch(setCity(value || ''));
   };

   return (
      <div className={styles.container}>
         {/* БЛОК 1: Фильтр навыков */}
         <div className={styles.skillsBlock}>
            <Text className={styles.skillsTitle}>
               Ключевые навыки
            </Text>

            <div className={styles.skillInputContainer}>
               <TextInput
                  placeholder="Навык"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.currentTarget.value)}
                  onKeyDown={handleKeyPress}
                  size="xs"
                  radius="md"
                  className={styles.skillInput}
               />

               <Button
                  onClick={handleAddSkill}
                  variant="filled"
                  color="primary"
                  size="lg"
                  radius="md"
                  className={styles.addSkillButton}
               >
                  <svg
                     width="15.17"
                     height="15.17"
                     viewBox="0 0 16 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     className={styles.addSkillIcon}
                  >
                     <path
                        d="M8 1V15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                     <path
                        d="M1 8H15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </Button>
            </div>

            <Group gap="4px" className={styles.skillsGroup}>
               {skills.map((skill) => (
                  <Pill
                     key={skill}
                     size="md"
                     withRemoveButton
                     onRemove={() => handleRemoveSkill(skill)}
                     styles={{
                        root: {
                           backgroundColor: '#F6F6F7',
                           color: '#141414',
                           height: '24px',
                           borderRadius: '99px',
                        },
                        label: {
                           fontSize: '14px',
                           lineHeight: '24px',
                           padding: '0 12px',
                        },
                        remove: {
                           color: '#ACADB9',
                           width: '16px',
                           height: '16px',
                           marginLeft: '4px',
                           '&:hover': {
                              backgroundColor: 'transparent',
                           }
                        }
                     }}
                  >
                     {skill}
                  </Pill>
               ))}
            </Group>
         </div>

         {/* БЛОК 2: Фильтр города */}
         <div className={styles.cityBlock}>
            <Select
               placeholder="Все города"
               data={cities}
               value={city}
               onChange={handleCityChange}
               clearable
               allowDeselect
               searchable={false}
               nothingFoundMessage="Ничего не найдено"
               className={styles.citySelect}
               leftSection={
                  <div className={styles.locationIcon}>
                     <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M8 1C4.7 1 2 3.7 2 7C2 10 8 15 8 15C8 15 14 10 14 7C14 3.7 11.3 1 8 1Z"
                           stroke="#ACADB9"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           fill="none"
                        />
                        <circle cx="8" cy="7" r="2" fill="#ACADB9" />
                     </svg>
                  </div>
               }
               styles={{
                  root: {
                     width: '100%'
                  },
                  input: {
                     color: city ? '#141414' : '#ACADB9'
                  }
               }}
            />
         </div>
      </div>
   );
};