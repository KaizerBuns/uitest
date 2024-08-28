import Link from 'next/link';

const Header = ({
  buttonTitle,
  buttonLink,
}: {
  buttonTitle: string;
  buttonLink: string;
}) => {
  return (
    <div className='flex flex-col p-6 border-b md:relative'>
      <div className='md:absolute md:right-2 order-last'>
        <Link href={buttonLink}>
          <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition'>
            {buttonTitle}
          </button>
        </Link>
      </div>
      <h1 className='text-2xl font-semibold'>Transport.ly</h1>
      <p className='text-gray-500'>
        An automated air freight scheduling service.
      </p>
    </div>
  );
};

export default Header;
