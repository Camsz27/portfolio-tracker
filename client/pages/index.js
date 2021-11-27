import MainPanel from '../components/MainPanel';
import SideNav from '../components/SideNav';

export default function Home() {
  return (
    <div className='flex'>
      <SideNav active='dashboard' />
      <MainPanel />
    </div>
  );
}
