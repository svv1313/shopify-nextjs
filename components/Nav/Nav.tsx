import Link from 'next/link'

export const Nav = () => {
  return (
   <header className="border-b sticky top-0 z-20 bg-white">
    <div className='flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl'>
        <Link href='/' >
            <p className='text-lg pt-1 font-bold'>
                Shopify + NextJS
            </p>
        </Link>
        <Link href='/cart'>
            <p className='text-md font-bold cursor-pointer'>
                Cart
            </p>
        </Link>
    </div>
   </header>
  )
}
