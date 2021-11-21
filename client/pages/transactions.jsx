import TransactionPanel from '../components/TransactionPanel';
import SideNav from '../components/SideNav';

export default function Home() {
  return (
    <div className='flex'>
      <SideNav />
      <TransactionPanel />
    </div>
  );
}
