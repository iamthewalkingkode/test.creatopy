import { useSelector } from 'react-redux';

import Auth from 'components/Auth';
import List from 'components/List';


const App = () => {
  const isLoggedIn = useSelector((state) => state.store.auth.isLoggedIn);

  return (
    <div className="px-5c">
      {isLoggedIn ? <List /> : <Auth />}
    </div>
  );
}

export default App;
