import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header } from './components/Header/Header';
import { VacancyList } from './components/VacancyList/VacancyList';


function App() {
  return (
    <Provider store={store}>
      <MantineProvider>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '3000px',
          backgroundColor: '#F7F7F8',

        }}>
          <Header />
          <VacancyList />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            position: 'absolute',
            bottom: '20px',
            width: '100%'
          }}>

          </div>
        </div>
      </MantineProvider>
    </Provider>
  );
}

export default App;