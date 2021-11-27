import TransactionPanel from '../components/TransactionPanel';
import SideNav from '../components/SideNav';

export default function Home() {
  return (
    <div className='flex'>
      <SideNav active='transactions' />
      <TransactionPanel />
    </div>
  );
}
