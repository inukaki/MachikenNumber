import Image from 'next/image'

export default function Top () {
  return (
    <>
    <div className="relative h-[50vh]">
      <div className="absolute w-full h-full bg-red-500 left-0">
        <div className="">
        <Image
          src="/logos/textonly/bg-no.svg"
          alt="マチケンナンバ"
          width={1280}
          height={256}
          layout="responsive"
          className='absolute top-1/2 -translate-y-1/2'
        />
        </div>
      </div>
    </div>
    </>
  )
}