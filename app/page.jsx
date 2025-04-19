import Image from "next/image";
import { BriefcaseMedical } from "lucide-react";
import { Baby } from "lucide-react";
import { Venus } from "lucide-react";
import { Hand } from "lucide-react";
import { Pill } from "lucide-react";
import { ThermometerSun } from "lucide-react";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { AudioLines } from "lucide-react";

export default function Home() {
  return (
    <main className="pt-[80px] ">
      <section id="hero" className="py-[80px]">
        <div className="grid grid-cols-2 container items-center">
          <div>
            <h6 className="text-[22px] text-gray-600 font-medium pb-5">
              A TRUSTED HEALTHCARE PLATFORM
            </h6>
            <h1 className="text-[48px] text-foreground font-semibold">
              Your Health, Our Priority <br /> 24/7 Telemedicine Support
            </h1>
            <button className="btn btn-primary mt-[30px]">Find a doctor</button>
          </div>
          <div>
            <img src="/UI/banner2.png" className="rounded-lg" alt="" />
          </div>
        </div>
      </section>
      <section id="features" className="py-[80px]">
        <h2 className="title uppercase text-center">features</h2>
        <p className="subtitle mx-auto text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
          reiciendis.
        </p>
        <div className="container grid-cols-3 grid gap-5">
          <div className="feature-card ">
            <div className="feature-box">
              <AudioLines className="feature-icon" />
            </div>
            <h3 className="feature-title">Voice Navigation</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              totam, suscipit ex accusantium repudiandae doloribus beatae quia
              assumenda nihil aliquam?
            </p>
          </div>
          <div className="feature-card ">
            <div className="feature-box">
              <AudioLines className="feature-icon" />
            </div>
            <h3 className="feature-title">Voice Navigation</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              totam, suscipit ex accusantium repudiandae doloribus beatae quia
              assumenda nihil aliquam?
            </p>
          </div>
          <div className="feature-card ">
            <div className="feature-box">
              <AudioLines className="feature-icon" />
            </div>
            <h3 className="feature-title">Voice Navigation</h3>
            <p className="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
              totam, suscipit ex accusantium repudiandae doloribus beatae quia
              assumenda nihil aliquam?
            </p>
          </div>
        </div>
      </section>
      <section id="achivments" className="py-[80px]">
        <div className="container">
          <h2 className="title text-center uppercase">Search Doctors</h2>

          <div className="flex items-center gap-5">
            <input
              placeholder="Search for doctors"
              className="bg-background   px-4 py-2 rounded-sm w-1/2 mx-auto border-1 placeholder:text-gray-600 text-[16px] font-normal text-foreground border-gray-600 hover:border-primary focus:border-primary focus:outline-primary focus:ring-none"
              required
            ></input>
          </div>
        </div>
      </section>
      <section id="clinicalAreas" className="py-[80px]">
        <div className="container">
          <h2 className="title text-center uppercase">Clinical Areas</h2>
          <p className="subtitle mx-auto text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Cupiditate, natus?
          </p>
          <div className="grid grid-cols-4 gap-10 mt-[30px]">
            <div className="card">
              <div className="card-body">
                <BriefcaseMedical className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">General Physician</h3>
                <p className="card-text">
                  Cold, flu, fever, vomiting, infections, headaches
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Baby className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">Pedoatrocs</h3>
                <p className="card-text">
                  Any children's health related issues including physical,
                  behavio...
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Venus className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">Gynae & Obs</h3>
                <p className="card-text">
                  Any women's health related issues including pregnancy,
                  menstruat...
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Hand className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">Dermatology</h3>
                <p className="card-text">
                  Treatment of diseases related to skin, hair and nails and some
                  c...
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Pill className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">Internal Medicine</h3>
                <p className="card-text">
                  Prevention, diagnosis, and treatment of adults across the
                  spectr...
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <ThermometerSun className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">Endocrinology</h3>
                <p className="card-text">
                  Treatment of diseases related to problems with hormone.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <Ellipsis className="h-30 w-30 mx-auto text-primary" />
                <h3 className="card-title">More</h3>
                <p className="card-text">Explore many more...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="pt-[100px] mt-[80px] pb-[35px] bg-primary">
        <div className="container ">
          <div className="grid grid-cols-4 text-gray-300 gap-x-20">
            <div>
              <img src="/logos/white.png" className="mb-[30px]" alt="logo" />
              <p className="mb-[30px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                fugit fugiat totam sunt obcaecati
              </p>
              <img src="./social.png" alt="" />
            </div>
            <div className="mx-auto">
              <h5 className="text-[22px]  text-white font-medium leading-1.5 mb-[30px]">
                Resources
              </h5>

              <ul className="flex flex-col font-normal text-[18px] gap-y-[10px] text-gray-300">
                <li>
                  <Link href="/">Services</Link>
                </li>
                <li>
                  <Link href="/">Pricing</Link>
                </li>
                <li>
                  <Link href="/">Testimonials</Link>
                </li>
                <li>
                  <Link href="/">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="mx-auto">
              <h5 className="text-[22px]  text-white font-medium leading-1.5 mb-[30px]">
                Usefull links
              </h5>
              <ul className="flex flex-col font-normal text-[18px] gap-y-[10px] text-gray-300">
                <li>
                  <Link href="/">Terms of Services</Link>
                </li>
                <li>
                  <Link href="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/">Cookie Policy</Link>
                </li>
                <li>
                  <Link href="/">Contact us </Link>
                </li>
              </ul>
            </div>
            <div className="mx-auto">
              <h5 className="text-[22px]  text-white font-medium leading-1.5 mb-[30px]">
                Newsletter
              </h5>
              <p>Sign up and receive the lastest news via email.</p>
              <div className="relative flex mt-[25px]">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="bg-transparent text-white px-[30px] border-r-0 py-[15px] rounded-l-[5px] rounded-r-0 border-1 border-gray-500 placeholder:text-[16px] placeholder:text-gray-300"
                />
                <button className="btn rounded-l-[0px]">Send</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
