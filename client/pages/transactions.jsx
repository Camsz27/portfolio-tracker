import TransactionPanel from '../components/TransactionPanel';
import SideNav from '../components/SideNav';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='flex'>
      <Head>
        <title>Transactions</title>
      </Head>
      <SideNav active='transactions' />
      <TransactionPanel />
    </div>
  );
}
