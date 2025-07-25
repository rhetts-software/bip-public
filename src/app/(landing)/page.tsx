"use client";
import SecondaryLinkButton from "@/lib/components/SecondaryButton";
import PrimaryLinkButton from "@/lib/components/PrimaryButton";
import { motion } from "motion/react";
import Head from "next/head";
import InformationLottie from "@/lib/components/InformationLottie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faCoffee,
  faEnvelope,
  faLink,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ContactsComponent from "@/lib/components/ContactsComponent";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import CopyButton from "@/lib/components/CopyButton";
import Image from "next/image";
import {
  TbBrandFacebook,
  TbLink,
  TbLocation,
  TbLocationPin,
  TbMail,
} from "react-icons/tb";

export default function Landing() {
  return (
    <div className="w-screen dark:text-white text-black font-sans flex-col flex justify-center items-center">
      <div className="flex flex-col w-full h-dvh min-h-250">
        <div className="flex h-[100%]">
          <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="w-1/2 pr-[7vw pl-48 box-border flex justify-center items-start py-16  flex-col gap-6"
          >
            <span className="text-2xl opacity-55 font-bold">
              Sangguniang Kabataan ng Bagtas
            </span>

            <span className="text-5xl tracking-wider font-serif  font-bold">
              <span>
                <span className="dark:text-brand-green-400 text-brand-green-500">
                  B
                </span>
                agtas
              </span>{" "}
              <span>
                <span className="dark:text-teal-400 text-teal-500">I</span>
                nformation
              </span>{" "}
              <span>
                <span className="dark:text-brand-blue-400 text-brand-blue-500">
                  P
                </span>
                ortal
              </span>
            </span>
            <span className="text-xl py-8 opacity-70 text-justify">
              The official information portal of Barangay Bagtas. Stay up to
              date with BIP! Easily access resources from baranggay officials,
              stay informed on the latest updates, and find what you need
              through our streamlined, user-friendly platform.
            </span>
            <div className="flex gap-8">
              <PrimaryLinkButton
                text="Sign Up"
                href="/signup"
                fontSize={18}
              ></PrimaryLinkButton>
              <SecondaryLinkButton
                text="Explore"
                href="/#about"
                fontSize={18}
              ></SecondaryLinkButton>
            </div>
          </motion.div>
          <div className="w-1/2 flex justify-center items-center">
            <InformationLottie></InformationLottie>
          </div>
        </div>
      </div>
      <div className="p-16 pb-48 flex flex-col w-full justify-center items-center opacity-70 bg-blue-50 dark:bg-slate-900  ">
        <div
          id="about"
          className=" -translate-y-36 bg-blue-50 dark:bg-slate-900  pt-28 flex items-center justify-center rounded-2xl w-3/4 "
        >
          <span className="text-4xl font-serif font-bold text-center border-t-2 p-4">
            About{" "}
            <span className="dark:dark-gradient-text-full light-gradient-text-full">
              BIP
            </span>
          </span>
        </div>
        <div className="w-[60%] flex justify-start ">
          <div className="text-xl font-serif text-justify indent-12 flex flex-col gap-12 border-b-2 pb-24">
            <p>
              BIP or Bagtas Information Portal is a transparent approach to
              community. Developed by Rhett's, this project fulfills a core requirement
              for the course CSS152L under the guidance of Dr. Jefferson Costales. 
              We are 2nd year BS Computer Science students from Mapúa University, 
              and this portal aims to bridge communication between barangay officials 
              and their constituents through a centralized digital platform.
            </p>

            <p>
              This web application serves as an information portal for Barangay Bagtas,
              enabling constituents to access public documents, stay updated through announcements,
              and engage with one another via a dedicated forums page. The platform supports a more
              open and informed community by providing easy access to essential local government
              information and interactions.
            </p>

            <p>
              Beyond transparency, the portal assists barangay officials with profiling
              and tracking demographic data of their constituents. This functionality helps
              leaders understand the needs of their community better and enables them to
              disseminate information efficiently. With BIP, both officials and citizens
              are empowered to collaborate, communicate, and contribute to a more connected
              and responsive local governance experience.
            </p>
          </div>
        </div>
      </div>
      <div
        id="contact"
        className="w-full flex-col flex justify-center items-center p-16"
      >
        <span className="font-bold font-serif text-4xl border-t-2 p-4">
          Contact Us
        </span>
        <div className="w-[80%] flex gap-12 py-24">
          <div className="rounded-2xl flex flex-col gap-12 justify-center items-center dark:bg-slate-900 opacity-70 bg-blue-50 py-12 px-24 w-[40%]">
            <ContactsComponent
              icon={
                <TbLocationPin
                  size={64}
                  className="text-emerald-500"
                ></TbLocationPin>
              }
              title="Address"
            >
              <div className="flex gap-2">
                <a
                  href="https://maps.app.goo.gl/YBg9hLsnLQ98vD2g8"
                  target="_blank"
                  className="flex gap-2 items-center justify-center"
                >
                  <TbLink size={32}></TbLink>
                  New Barangay Bagtas Hall, Belleview Meadows, Tanza, Cavite,
                  Tanza, Philippines
                </a>
              </div>
            </ContactsComponent>
            <ContactsComponent
              icon={<TbMail size={64} className="text-emerald-500"></TbMail>}
              title="E-mail"
            >
              <div className="flex gap-2">
                <span>bagtasmagkaisa@gmail.com</span>{" "}
                <CopyButton clipboard="bagtasmagkaisa@gmail.com"></CopyButton>
              </div>
            </ContactsComponent>
            <ContactsComponent
              icon={
                <TbBrandFacebook
                  size={64}
                  className="text-emerald-500"
                ></TbBrandFacebook>
              }
              title="Facebook"
            >
              <a
                className="flex gap-2 items-center justify-center"
                href="https://web.facebook.com/BAGTASTANZACAVITEOfficial/"
                target="_blank"
              >
                <TbLink size={20}></TbLink>
                BAGTASTANZACAVITEOfficial
              </a>
            </ContactsComponent>
          </div>
          <div className="rounded-2xl flex-col flex gap-2 bg-blue-50 dark:bg-slate-900 opacity-70 p-12 w-[60%]">
            <span className="font-sans text-3xl font-bold">Find us!</span>
            <span className="opacity-70">
              You can find us on the map below. We are located at the New
              Barangay Bagtas Hall, Belleview Meadows, Tanza, Cavite, Tanza,
              Philippines.
            </span>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.603541406835!2d120.85227820000001!3d14.3344466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33962afed8b9a195%3A0x41a8738e819a6fd1!2sBagtas%20Barangay%20Hall!5e0!3m2!1sen!2sph!4v1750746756419!5m2!1sen!2sph"
              className="border-0 mt-12 w-full h-full rounded-xl shadow-2xl"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="p-12 opacity-70">
        © 2025 Barangay Government of Bagtas
      </div>
    </div>
  );
}
