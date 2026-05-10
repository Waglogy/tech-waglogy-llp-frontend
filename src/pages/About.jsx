import React from 'react'
import { motion } from 'framer-motion'
import {
  MdArrowForward, MdCheckCircle
} from 'react-icons/md'
import {
  FaHandshake, FaCode, FaComments, FaChartBar
} from 'react-icons/fa'
import SEO from '../components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
  })
}

const values = [
  {
    icon: FaComments,
    title: 'Honesty over hype',
    desc: 'We tell you what is possible, what it will cost, and how long it will take — before you commit to anything. No inflated promises, no fine print.',
  },
  {
    icon: FaCode,
    title: 'Built to last',
    desc: 'We do not cut corners. Every project is built properly so it does not break six months after launch and come back to haunt you.',
  },
  {
    icon: FaHandshake,
    title: 'You are not alone',
    desc: 'Technology is only useful if you can actually use it. We stay available after delivery — for training, updates, questions, and growth.',
  },
  {
    icon: FaChartBar,
    title: 'Results, not reports',
    desc: 'We measure our success by what changes for your business. Not by what looks good in a presentation.',
  },
]

const stats = [
  { value: '50+', label: 'Projects delivered' },
  { value: '5+', label: 'Years in business' },
  { value: 'Pan-India', label: 'Client reach' },
  { value: '4', label: 'Languages we work in' },
]

const About = () => {
  return (
    <>
      <SEO page="about" />

      <div className="bg-[#FAFAF8] text-[#0C0C0C]">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="section-label mb-6"
              >
                About Us
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl sm:text-6xl font-bold leading-[1.08] mb-6"
              >
                We're the technology company your business has been looking for.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-lg text-[#6E6B67] leading-relaxed mb-8 max-w-lg"
              >
                Based in Gangtok, Sikkim. Building digital products for businesses across India — and beyond — since 2020.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-wrap gap-10 pt-8 border-t border-[#E5E2DC]"
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-[#0C0C0C]" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
                    <div className="text-sm text-[#6E6B67] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              <div className="rounded-xl overflow-hidden border border-[#E5E2DC] shadow-sm col-span-2">
                <img src="/daraghar.png" alt="Daraghar Maila — homestay & glamping, client project" className="w-full object-cover object-top h-44" />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E5E2DC] shadow-sm">
                <img src="/sbvidlaya.png" alt="Saraswati Bal Vidyalaya — client project" className="w-full object-cover object-top h-36" />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#E5E2DC] shadow-sm">
                <img src="/dhenterprise.png" alt="DH Enterprises — client project" className="w-full object-cover object-top h-36" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── OUR STORY ────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-28">
                <div className="section-label mb-4">Our Story</div>
                <h2 className="text-4xl font-bold text-[#0C0C0C] mb-4">Why we exist.</h2>
                <p className="text-[#6E6B67] leading-relaxed">
                  Not a funding story. Not a pivot story. Just an honest reason we started building.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="lg:col-span-8 space-y-6 text-[#3D3A36] text-lg leading-relaxed"
            >
              <p className="text-xl font-medium text-[#0C0C0C] border-l-4 border-blue-500 pl-5">
                Most technology companies make things more complicated than they need to be.
              </p>

              <p>
                They use jargon you don't understand, send proposals that go on forever, make promises they quietly walk back, and then disappear once the invoice is paid. Finding a technology partner you can actually trust is harder than it should be.
              </p>

              <p>
                We started Waglogy because we saw this problem firsthand. Businesses across India — from Gangtok to Gurgaon — were struggling to find technology partners who were honest, reliable, and actually delivered. Not just in the beginning, but all the way through.
              </p>

              <p>
                So we built the company we wished existed. One where you know exactly what something costs before work begins. One where the person who sold you the project is the same person building it. One where you can pick up the phone and someone actually answers.
              </p>

              <p>
                We are based in Gangtok, Sikkim — and that is not a limitation. It is who we are. We work with businesses of every size, in every industry, across India and internationally. What does not change is how we work: directly, honestly, and with full accountability for what we deliver.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="section-label mb-4">What We Believe</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] max-w-xl">
                Four things we don't compromise on.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, idx) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="card p-8"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-5">
                    <v.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C0C0C] mb-3">{v.title}</h3>
                  <p className="text-[#6E6B67] leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE TEAM ─────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5E2DC]">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="section-label mb-4">The Team</div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#0C0C0C] mb-6">
                Small enough to care.<br />Capable enough to deliver.
              </h2>
              <div className="space-y-5 text-[#3D3A36] text-lg leading-relaxed">
                <p>
                  We are a focused team of developers, designers, and consultants. Not a massive company with hundreds of people you'll never speak to. Not a one-man operation that disappears when things get complex.
                </p>
                <p>
                  We are the right size to know your name, understand your business, and build technology that actually fits — while having the depth to handle everything from a simple website to a complex custom system.
                </p>
                <p>
                  When you work with Waglogy, you get direct access to the people doing the work. No account managers in the middle. No ticket queues. Just a team that is genuinely invested in getting it right.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  'Web Development',
                  'Mobile Apps',
                  'UI / UX Design',
                  'Custom Software',
                  'AI Integration',
                  'IT Consulting',
                ].map((skill) => (
                  <span key={skill} className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="space-y-4"
            >
              {[
                { check: 'Full-stack development team — front end, back end, mobile' },
                { check: 'Designers who care about usability, not just aesthetics' },
                { check: 'Direct communication — you talk to who is building' },
                { check: 'English, Hindi, Nepali and Bengali — no language barriers' },
                { check: 'Monday to Sunday support, 9am to 7pm' },
                { check: 'Remote-first — we work with clients anywhere in India and internationally' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFAF8] border border-[#E5E2DC]"
                >
                  <MdCheckCircle size={20} className="text-blue-500 mt-0.5 shrink-0" />
                  <span className="text-[#3D3A36] text-sm leading-relaxed">{item.check}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0F1E]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Still deciding? Let's just talk.
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                No pressure, no pitch. Tell us what you're working on and we'll give you an honest opinion — whether that means working with us or not.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-primary px-8 py-4 text-base justify-center">
                  Start a Conversation
                  <MdArrowForward size={18} />
                </a>
                <a href="/projects" className="btn-outline px-8 py-4 text-base justify-center border-white/20 text-white hover:border-white/50 hover:bg-white/5">
                  See Our Work
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}

export default About
