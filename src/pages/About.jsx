import react from 'react'

const About = () => {

  return (

    <>
    <div
      className="pt-0 pb-4 sm:pt-2 sm:pb-12 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:pt-2 lg:pb-8"
    >
      <div className="max-w-3xl text-left">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
         Hey , we are tech
          <span style={{ color: 'var(--brand-primary)' }}> waglogy llp</span>
          
        </h1>

        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          Waglogy Tech LLP designs, develops, and ships high‑quality web applications and
          intelligent products powered by AI. From MVP to scale, we deliver fast.
        </p>

      
      </div>
  
      <div className="mx-auto hidden max-w-md md:block">
        <img src="/banner.png" alt="Waglogy banner" className="w-full h-auto object-contain" />
      </div>
        
         
        
    </div>
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="space-y-4 md:space-y-8">
      <div className="max-w-prose">
        <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>

        <p className="mt-4 text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
          architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas sequi.
        </p>
      </div>

      <img
        src="https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="rounded"
        alt=""
      />
    </div>
  </div>
</section>
<article class="flex bg-white transition hover:shadow-xl">
  <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
    <time
      datetime="2022-10-10"
      class="flex items-center justify-between gap-4 text-xs font-bold text-gray-900 uppercase"
    >
      <span>2022</span>
      <span class="w-px flex-1 bg-gray-900/10"></span>
      <span>Oct 10</span>
    </time>
  </div>

  <div class="hidden sm:block sm:basis-56">
    <img
      alt=""
      src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      class="aspect-square h-full w-full object-cover"
    />
  </div>

  <div class="flex flex-1 flex-col justify-between">
    <div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
      <a href="#">
        <h3 class="font-bold text-gray-900 uppercase">
          Finding the right guitar for your style - 5 tips
        </h3>
      </a>

      <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
        pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
        quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
        atque dignissimos. Molestias explicabo corporis voluptatem?
      </p>
    </div>

    <div class="sm:flex sm:items-end sm:justify-end">
      <a
        href="#"
        class="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold text-gray-900 uppercase transition hover:bg-yellow-400"
      >
        Read Blog
      </a>
    </div>
  </div>
</article>

    </>
  )

}

export default About;