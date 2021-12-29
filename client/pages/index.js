import MainPanel from '../components/MainPanel';
import SideNav from '../components/SideNav';
import Head from 'next/head';

export default function Home() {
  return (
    <div className='flex'>
      <Head>
        <title>Dashboard</title>
      </Head>
      <SideNav active='dashboard' />
      <MainPanel />
    </div>
  );
}
