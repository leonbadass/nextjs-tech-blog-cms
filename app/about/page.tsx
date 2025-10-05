import React from "react";
import { Metadata } from "next";
import Banner from "../component/banner"

export const metadata: Metadata = {
  title: "About Code in Ctrl — Engineering, IoT, and Full-Stack Innovation Blog",
  description:
    "Learn more about Code in Ctrl, a tech and engineering blog founded by [Your Name], an Electronics and Computer Engineering student in Wrocław, Poland. Explore IoT, AI, web development, data analysis, and hands-on projects.",
};

export default function About() {
  return (
    <main className="w-full leading-relaxed">
        <Banner innerText="About Code in Ctrl"/>
        <div className="max-w-4xl mx-auto p-6">
      <section className="mb-16">
        
        <p className="text-lg ">
          Welcome to <strong>Code in Ctrl</strong> — a collaborative tech and engineering
          blog built by students, creators, and future innovators. I’m <strong>Godwin Azuka</strong>, an <em>Electronic and Computer Engineering student</em> at the 
          <strong> University of Science and Technology in Wrocław, Poland</strong>,
          and I founded Code in Ctrl to bridge the worlds of <strong>software, hardware, and innovation</strong> through hands-on learning.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          <strong>Code in Ctrl</strong> is more than a personal blog — it’s a platform for
          <strong> learning, experimentation, and collaboration</strong> in modern
          technology. Our mission is to document real engineering journeys, share
          practical tutorials, and showcase projects that combine code, circuits,
          and creativity.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Full-stack web development – Next.js, Supabase, APIs, testing, and architecture</li>
          <li>Hardware and IoT projects – embedded systems and smart devices</li>
          <li>Data analysis & AI – Python, machine learning, and automation</li>
          <li>Engineering tools – AutoCAD, KiCad, simulation, and prototyping</li>
          <li>Tech career growth – insights from students and young engineers</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">How Code in Ctrl Was Built</h2>
        <p className="mb-4">
          This site itself is a<strong> custom-built CMS</strong>, created as part of my
          portfolio and ongoing studies. Powered by<strong> Next.js</strong>, <strong>Supabase</strong>, and <strong>Vitest</strong>,
          it’s designed to scale as both a content platform and a project showcase.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Next.js for a high-performance, SEO-friendly frontend</li>
          <li>Supabase for authentication, database, and media storage</li>
          <li>Vitest for reliable testing</li>
          <li>MDX for flexible tutorials with embedded code and visuals</li>
        </ul>
        <p className="mt-4">
          Code in Ctrl evolves with every semester — adapting as we learn new tools,
          complete new projects, and explore new technologies.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Projects and Innovations</h2>
        <p className="mb-4">
          This blog also serves as a<strong> digital lab notebook</strong> for our
          engineering projects. From concept to prototype, we share the process,
          challenges, and lessons learned.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>🌿 <strong>IoT AI Greenhouse</strong> – sensors, AI models, and cloud connectivity</li>
          <li>⚡ <strong>Smart Device Prototypes</strong> – embedded systems and PCB design with KiCad</li>
          <li>📊 <strong>Python Data Tools</strong> – analytics, automation, and visualization</li>
          <li>💡 <strong>Course-Based Engineering Builds</strong> – merging academic work with innovation</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4"> Community and Collaboration</h2>
        <p className="mb-4">
          <strong>Code in Ctrl</strong> welcomes fellow students, developers, and
          engineers who want to share what they’re learning. Whether it’s a guide
          to database optimization, a tutorial in AutoCAD, or reflections on
          working in tech — this blog is a space to publish, grow, and inspire.
        </p>
        <p>
          If you’re a student or professional with something to share, you’re invited
          to<strong> write, collaborate, or mentor</strong> through Code in Ctrl.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Vision</h2>
        <p>
          Our long-term vision is to grow Code in Ctrl into a<strong> network of learning engineers</strong> — a platform that connects
          code, design, and hardware to push the boundaries of what students can
          build. It’s a space where engineering meets creativity — where each
          project, tutorial, and idea adds to a shared understanding of technology.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <ul className="space-y-2">
          <li>
            👉 <a href="/projects" className="text-blue-600 hover:underline">Explore Our Projects</a>
          </li>
          <li>
            👉 <a href="/blog" className="text-blue-600 hover:underline">Read the Latest Tutorials</a>
          </li>
          <li>
            👉 <a href="/join" className="text-blue-600 hover:underline">Join or Contribute</a>
          </li>
          <li>
            👉 <a href="/contact" className="text-blue-600 hover:underline">Contact Me</a>
          </li>
        </ul>
      </section>
      </div>
    </main>
  );
}
