import dynamic from 'next/dynamic';

const DynamicTraw = dynamic(() => import('@traw/traw').then((m) => m.Traw), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const TrawWrapper = () => {
  return <DynamicTraw />;
};

export default TrawWrapper;
