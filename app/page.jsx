"use Client";
import {
  Star,
  Phone,
  Download,
  Users,
  Mic,
  Brain,
  UserCheck,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function TelemedicineLanding() {
  return (
    <div className="min-h-screen pt-[80px] bg-white">
      {/* Hero Section */}
      <section className="py-20  bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Healthcare at Your{" "}
                <span className="text-primary">Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the future of medicine with AI-powered diagnosis,
                voice navigation, and instant access to qualified doctors. Your
                health, simplified.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full ">
              <Image
                src="/UI/banner.png"
                className="rounded-[10px]"
                alt="Banner"
                fill
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Healthcare Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Healthcare Features
            </h2>
            <p className="text-xl text-primary">
              Cutting-edge technology meets compassionate care
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Voice Navigation</h3>
                <p className="text-gray-600">
                  Navigate effortlessly through our platform using simple voice
                  commands
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  AI Disease Detection
                </h3>
                <p className="text-gray-600">
                  Advanced AI algorithms provide preliminary diagnosis and
                  health insights
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Doctor Recommendations
                </h3>
                <p className="text-gray-600">
                  Get matched with the perfect specialist based on your specific
                  needs
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  24/7 Healthcare Access
                </h3>
                <p className="text-gray-600">
                  Round-the-clock medical support whenever and wherever you need
                  it
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-primary">
              Simple steps to better health
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Speak Your Symptoms
              </h3>
              <p className="text-gray-600">
                Use voice commands or type to describe your health concerns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Get AI Diagnosis</h3>
              <p className="text-gray-600">
                Our AI analyzes your symptoms and provides preliminary health
                insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Consult Doctor</h3>
              <p className="text-gray-600">
                Connect instantly with qualified doctors for professional care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Doctors
            </h2>
            <p className="text-xl text-primary">
              Qualified professionals ready to help
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-primary mb-3">Cardiologist</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                </div>
                <p className="text-sm text-gray-600">15+ years experience</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>MO</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">Dr. Michael Chen</h3>
                <p className="text-primary mb-3">Neurologist</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                </div>
                <p className="text-sm text-gray-600">12+ years experience</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">Dr. Emily Davis</h3>
                <p className="text-primary mb-3">Pediatrician</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                </div>
                <p className="text-sm text-gray-600">10+ years experience</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>RW</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-2">
                  Dr. Robert Wilson
                </h3>
                <p className="text-primary mb-3">Dermatologist</p>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.7)</span>
                </div>
                <p className="text-sm text-gray-600">18+ years experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-xl text-primary">
              Real stories from real people
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "The AI diagnosis was incredibly accurate and saved me hours
                  of waiting. The voice navigation made everything so easy to
                  use."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Maria Rodriguez</p>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "Having 24/7 access to healthcare professionals gave me peace
                  of mind. The doctors are professional and caring."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>JT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">James Thompson</p>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">
                  "The doctor recommendations were spot on. I found the perfect
                  specialist for my condition within minutes."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>LC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Lisa Chen</p>
                    <p className="text-sm text-gray-600">Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied patients who trust Telecure for their
            health needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Download className="w-5 h-5 mr-2" />
              Download App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <Users className="w-5 h-5 mr-2" />
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
