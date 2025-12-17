import styles from './Header.module.css';

export const Header = () => {
   const hhLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/HeadHunter_logo.png/240px-HeadHunter_logo.png';

   return (
      <header className={styles.header}>
         <div className={styles.container}>
            {/* Левая часть */}
            <div className={styles.leftSection}>
               <img src={hhLogoUrl} alt="HH" className={styles.logo} />
               <div className={styles.title}>.FrontEnd</div>
            </div>

            {/* Центрированная навигация */}
            <div className={styles.navContainer}>
               {/* Блок "Вакансии FE" */}
               <div className={styles.navItem}>
                  <div className={styles.navText}>Вакансии FE</div>
                  <div className={styles.dot} />
               </div>

               {/* Блок "Обо мне" */}
               <div className={styles.navItem}>
                  <div className={styles.userIcon}>
                     <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                     >
                        {/* Голова */}
                        <circle
                           cx="7"
                           cy="4.2"
                           r="2.2"
                           stroke="rgba(15, 15, 16, 0.5)"
                           strokeWidth="1"
                           fill="none"
                        />

                        {/* Плечи до границы */}
                        <path
                           d="M3 13.8C3 10.9249 5.02494 8.9 7 8.9C8.97506 8.9 11 10.9249 11 13.8"
                           stroke="rgba(15, 15, 16, 0.5)"
                           strokeWidth="1"
                           strokeLinecap="round"
                        />
                     </svg>
                  </div>
                  <div className={styles.navTextLight}>
                     Обо мне
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};