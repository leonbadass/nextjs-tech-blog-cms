import React from "react";
import type { Metadata } from "next";
import Banner from "../component/banner";
export const metadata: Metadata = {
  title: "Contact — Code in Ctrl",
  description:
    "Get in touch with the Code in Ctrl team. Whether you have collaboration ideas, questions, or feedback, we’d love to hear from you.",
};

export default function Contact() {
  return (
    <main className="w-full ">
        <Banner innerText="Contact Us" />
        <div className="flex flex-col max-w-4xl mx-auto p-6">
      <section className="mb-12">
       
        <p className="text-lg text-gray-700">
          Have questions, ideas, or want to collaborate on a project?  
          We’d love to hear from you.  connect with us directly through our social channels.
        </p>
      </section>

     

      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Ways to Connect</h2>
        <ul className="space-y-2 text-lg flex gap-4 ">
          <li>
            💼{" "}
            <a
              href="https://www.linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            🐙{" "}
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            ✉️{" "}
            <a
              href="mailto:your.email@example.com"
              className="text-blue-600 hover:underline"
            >
              your.email@example.com
            </a>
          </li>
        </ul>
      </section>
        </div>
    </main>
  );
}
