import './Admin.css';
import Sidebar from './Sidebar';
import Home from './Home';

function Admin() {
 

  return (
    <div className='grid-admin'>     
      <Sidebar  />           
      <Home />
    </div>
  )
}

export default Admin 