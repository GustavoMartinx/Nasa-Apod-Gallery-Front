import { React } from 'react'; // useEffect,
import AppRouter from './routes/AppRouter.jsx';
// import { getToken } from './utils';

function App() {
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const token = await getToken();
  //     console.log('Token App:', token);
  //     localStorage.setItem('authToken', token);
  //   };

  //   fetchToken();
  // }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
