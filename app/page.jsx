"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import VoiceNavigator from "./global_components/VoiceNavigator";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Video,
  Brain,
  Clock,
  Mic,
  UserPlus,
  Calendar,
  Star,
  FileText,
  Stethoscope,
  ClipboardList,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.role === "patient") router.push("/dashboard/user");
    else if (user.role === "doctor") router.push("/dashboard/doctor");
    else if (user.role === "admin") router.push("/dashboard/admin");
  }, [user]);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "Services", href: "/#services" },
    { name: "Consultation", href: "/#consultation" },
    { name: "Best Doctors", href: "/#doctors" },
    { name: "About Us", href: "/#about-us" },
  ];

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/landing");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to load doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const testimonials = [
    {
      quote:
        "I was skeptical about telemedicine at first, but Telecure changed my mind. The doctors are knowledgeable, caring, and take their time with each consultation.",
      name: "Robert Thompson",
      since: "Patient since 2024",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As a busy mom of three, finding time to visit a doctor was always challenging. Telecure allows me to get quality healthcare for our family without disrupting our schedules.",
      name: "Jennifer Adams",
      since: "Patient since 2024",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "The voice navigation feature is a game-changer. As someone with limited mobility, being able to control the app with my voice makes healthcare truly accessible.",
      name: "David Martinez",
      since: "Patient since 2025",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Section */}
      <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Image src="/logos/default.png" alt="Logo" height={80} width={200} />
          <nav className="hidden space-x-6 md:flex !">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-medium text-gray-600 transition-colors hover:text-gray-900",
                  pathname === link.href.split("#")[0] &&
                    link.href.includes("#home")
                    ? "text-gray-900"
                    : pathname.includes(link.href.split("#")[1]) &&
                      link.href.includes("#")
                    ? "text-gray-900"
                    : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-1 items-center">
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                router.push("/auth/register");
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="flex min-h-screen items-center bg-gray-50  pt-24 md:py-32"
        >
          <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Healthcare at your fingertips
              </h1>
              <p className="max-w-[600px] text-lg text-gray-600 md:text-xl">
                Experience the future of healthcare with Telecure&apos;s virtual
                consultations, AI-powered diagnostics, and 24/7 medical support
                from the comfort of your home.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  className="px-8 py-3 text-lg"
                  onClick={() => {
                    router.push("/auth/register");
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-3 text-lg bg-transparent"
                >
                  Book Consultation
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gray-200 ">
              <Image
                src="/UI/banner.png"
                layout="fill"
                objectFit="cover"
                alt="Banner"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Telemedicine Platform Illustration
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Services
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Discover how Telecure is revolutionizing healthcare with
                cutting-edge technology and patient-centered solutions.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Video className="h-6 w-6" />
                  </div>
                  <CardTitle>Virtual Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connect with licensed medical professionals through secure
                    video calls anytime, anywhere.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Brain className="h-6 w-6" />
                  </div>
                  <CardTitle>AI Diagnosis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI-powered system provides preliminary diagnosis to help
                    doctors make informed decisions.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  <CardTitle>24/7 Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Healthcare doesn&apos;t sleep. Access medical help whenever
                    you need it, day or night.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mic className="h-6 w-6" />
                  </div>
                  <CardTitle>Voice Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Navigate our platform hands-free with our advanced voice
                    recognition technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="consultation" className="bg-gray-50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Book a consultation in three simple steps and get the care you
                need without leaving your home.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <UserPlus className="h-6 w-6" />
                  </div>
                  <CardTitle>Create an Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Sign up and complete your medical profile to help doctors
                    understand your history.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Book Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Choose a specialist and select a convenient time slot for
                    your virtual consultation.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Video className="h-6 w-6" />
                  </div>
                  <CardTitle>Start Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connect with your doctor via our secure platform and receive
                    personalized care.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mx-auto mt-16 max-w-3xl p-6 md:p-8">
              <CardContent className="flex flex-col items-center gap-6 md:flex-row md:items-start">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Sarah Johnson"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-lg italic text-gray-700">
                    &quot;Telecure has completely changed how I access
                    healthcare. I was able to consult with a specialist within
                    hours instead of waiting weeks for an in-person appointment.
                    The platform is intuitive and the doctors are
                    excellent.&quot;
                  </p>
                  <p className="mt-4 font-semibold text-gray-800">
                    Sarah Johnson
                  </p>
                  <div className="mt-1 flex justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section id="features" className="bg-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Advanced Features
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our platform is equipped with cutting-edge technology to provide
                you with the best telemedicine experience.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mic className="h-6 w-6" />
                  </div>
                  <CardTitle>Voice-Based Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Navigate through our platform using simple voice commands,
                    making healthcare accessible to everyone, including those
                    with mobility challenges.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FileText className="h-6 w-6" />
                  </div>
                  <CardTitle>Digital Prescriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receive prescriptions digitally and have medications
                    delivered to your doorstep or ready for pickup at your
                    preferred pharmacy.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <CardTitle>Doctor Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI system matches you with the most suitable healthcare
                    professionals based on your symptoms and medical history.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <CardTitle>Medical Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Access your complete medical history, test results, and
                    treatment plans in one secure location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Drop this toward the end or inside hero */}
        {user && <VoiceNavigator />}

        {/* Doctors Section */}
        <section id="doctors" className="bg-gray-50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Best Doctors
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Connect with top-rated healthcare professionals who are
                passionate about providing exceptional care.
              </p>
            </div>

            {loadingDoctors ? (
              <p className="text-center text-gray-500">
                <CircularProgress />
              </p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {doctors.map((doctor, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="flex flex-col items-center p-6">
                      <Image
                        src={doctor.avatar || "/placeholder.svg"}
                        alt={doctor.name}
                        width={100}
                        height={100}
                        className="mb-4 h-25 w-25 rounded-full object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                      <div className="mt-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {doctor.experience}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="bg-white py-20 md:py-32">
          <div className="container mx-auto grid items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gray-200 md:h-[400px] lg:h-[500px]">
              <Image
                src="/bg/about.png"
                alt="Telecure Team Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Telecure Team Image
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                About Telecure
              </h2>
              <p className="text-lg text-gray-600">
                Founded in 2023, Telecure is on a mission to make healthcare
                accessible to everyone, everywhere. We believe that quality
                healthcare is a right, not a privilege.
              </p>
              <p className="text-lg text-gray-600">
                Our team of dedicated healthcare professionals and technology
                experts work tirelessly to create a platform that connects
                patients with doctors seamlessly, breaking down geographical
                barriers and reducing wait times.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                  <p className="text-gray-600">Doctors</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">50,000+</h3>
                  <p className="text-gray-600">Patients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">30+</h3>
                  <p className="text-gray-600">Specialties</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">4.9/5</h3>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-gray-50 py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Hear from people who have transformed their healthcare
                experience with Telecure.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-lg italic text-gray-700">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimonial.since}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
    </div>
  );
}
