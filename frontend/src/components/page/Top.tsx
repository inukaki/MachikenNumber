import Image from 'next/image'

export default function Top () {
  return (
    <>
    <div className="relative h-[50vh]">
      <div className="absolute w-full h-full left-0 overflow-hidden">
        <div>
          <Image
            src="/top.webp"
            alt="マチケンナンバ"
            layout="fill"
            className='absolute top-0 left-0 object-cover blur-sm'
          />
          <div className='absolute top-1/2 -translate-y-1/2 w-full h-full bg-white bg-opacity-50'></div>
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