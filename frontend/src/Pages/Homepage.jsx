
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Users, BookOpen, BarChart3, Code, Shield, Zap, CheckCircle, Star, Menu, X, ArrowRight, TrendingUp, Award, Target, Activity, Eye, Trophy, Layers, GraduationCap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaInstagram,FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";



// export default function CodeLyticsLanding() {

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);

 
  
 



//   const features = [
//     {
//       icon: <Activity className="w-6 h-6" />,
//       title: "Real-Time Student Progress Tracking",
//       description: "Monitor every student's progress across platforms like LeetCode, Codeforces, and GFG—no manual work or spreadsheets."
//     },
//     {
//       icon: <Eye className="w-6 h-6" />,
//       title: "Suspicious Activity Flagging",
//       description: "Detect anomalies like bulk submissions or sudden spikes in activity—helps maintain academic integrity."
//     },
//     {
//       icon: <Layers className="w-6 h-6" />,
//       title: "Cross-Platform Assignment Integration",
//       description: "Seamlessly add questions from LeetCode, GeeksforGeeks, and other popular coding platforms."
//     },
//     {
//       icon: <BarChart3 className="w-6 h-6" />,
//       title: "Performance Analytics & Dashboards",
//       description: "Track every student's progress with detailed analytics and performance insights."
//     },
//     {
//       icon: <Trophy className="w-6 h-6" />,
//       title: "Leaderboards & Gamification",
//       description: "Motivate students with weekly leaderboards and recognize top performers institution-wide."
//     }
//   ];


//   useEffect(() => {
//   if (activeFeature < features.length - 1) {
//     const timer = setTimeout(() => {
//       setActiveFeature((prev) => prev + 1);
//     }, 700); 
//     return () => clearTimeout(timer);
//   }
// }, [activeFeature]);




//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="relative z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
//                 <Code className="w-6 h-6 text-black" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                 CodeLytics
//               </span>
//             </div>
            
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Home</a>
//               <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Features</a>
//               <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">ContactUs</a>
              
//             </div>

//             <button 
//               className="md:hidden text-white"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
//             <div className="px-4 py-6 space-y-4">
//               <a href="#analytics" className="block text-gray-300 hover:text-cyan-400">Home</a>
//               <a href="#testimonials" className="block text-gray-300 hover:text-cyan-400">Contact Us</a>
//               <a href="#features" className="block text-gray-300 hover:text-cyan-400">Features</a>
              
//             </div>
//           </div>
//         )}
//       </nav>
    


//       {/* Hero Section */}
//       <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-gray-900 to-black">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className="inline-flex items-center bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-2 mb-8">
//               <Zap className="w-4 h-4 text-cyan-400 mr-2" />
//               <span className="text-sm text-cyan-300">Track. Analyze. Excel.</span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               Unlock Your
//               <br />
//               <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
//                 Coding Potential
//               </span>
//             </h1>
            
//             <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Empower your institution with comprehensive code tracking. Manage students, 
//               create batches, integrate with top coding platforms, and unlock powerful analytics.
//             </p>
            
//             <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
//               <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25">
//                <a href='#navigation'>Get Started</a> 
//                 <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
//               </button>
              
//             </div> 
//           </div>
//         </div>

//         Floating Elements
//         <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
//       </section>
     

//       {/* Features Section */}
      

//         <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
//   <div className="flex flex-col items-center gap-6 relative">
//   {features.map((feature, index) => {
//     const fromLeft = index % 2 === 0;
//     return (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: index * 0.2 }}
//         className={`
//           w-full max-w-[520px] h-[180px]
//           bg-gradient-to-r from-gray-900/80 to-gray-800/90
//           border border-cyan-500/30
//           rounded-xl p-6 shadow-xl text-center
//           flex items-center justify-start gap-4
//           relative z-10
//           ${fromLeft ? "ml-12" : "mr-12"}
//         `}
//       >
//         <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
//           {feature.icon}
//         </div>
//         <div className="text-left">
//           <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
//           <p className="text-gray-300 text-sm">{feature.description}</p>
//         </div>
//       </motion.div>
//     );
//   })}
// </div>

// </section>





        
    

  

//       {/* Login ROutes */}

//       <section id="navigation" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
//   <div className="max-w-7xl mx-auto">
//     <div className="text-center mb-16">
//       <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Login As</h2>
//       <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//         Get started in minutes with our simple three-step process
//       </p>
//     </div>

//     <div className="grid md:grid-cols-3 gap-8">
//       {[
//   {
//     step: "Student",
//     title: "Join & Start Learning",
//     description:
//       "Sign up, access assignments, and track your coding journey with ease.",
//     icon: <GraduationCap className="w-8 h-8" />
//   },
//   {
//     step: "Teacher",
//     title: "Manage & Monitor",
//     description:
//       "Create assignments, track student progress, and view insights.",
//     icon: <BookOpen className="w-8 h-8" />
//   },
//   {
//     step: "Institution",
//     title: "Setup & Oversee",
//     description:
//       "Register your college, manage batches, and monitor performance.",
//     icon: <Building2 className="w-8 h-8" />
//   }
// ]
// .map((item, index) => (
//             <Link key={index} to={`/${item.step}/login`}>
//               <div className="relative">
//                 <div className="bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 text-center hover:border-cyan-500/30 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl">
//                   <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
//                     {item.step}
//                   </div>
//                   <div className="flex justify-center mb-4">
//                     <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
//                       {item.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
//                   <p className="text-gray-300">{item.description}</p>
//                 </div>
//               </div>
//             </Link>
//       ))}
//     </div>
//   </div>
// </section>


//       {/* Footer */}
//       <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full px-4 sm:px-6 lg:px-20">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-3 mb-4">
//                 <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
//                   <Code className="w-5 h-5 text-black" />
//                 </div>
//                 <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
//                   CodeLytics
//                 </span>
//               </div>
//               <p className="text-gray-400">
//                 Empowering educational institutions with comprehensive code tracking and analytics.
//               </p>
//             </div>
            
//             <div>
//               <h3 className="text-white font-semibold mb-4">Product</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Analytics</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrations</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-white font-semibold mb-4">Company</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-white font-semibold mb-4">Support</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">API Reference</a></li>
//                 <li><a href="#" className="hover:text-cyan-400 transition-colors">Status</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//             <p>&copy; 2025 CodeLytics. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// } 

export default function CodeLyticsLanding() {
  const videoRef = useRef(null);

  return(
    <div className='min-h-screen w-full flex flex-col gap-24'>
      {/* hero-section */}
      <section id="hero-section" className='relative w-full h-screen '>
      <div className='absolute inset-0 flex items-center align-center justify-center mt-45'>
          <button className="text-black font-bold px-12 py-4  bg-white border-2 border-black border-dotted ">Get Started</button>
       </div> 
        <video ref={videoRef} className='w-full h-full object-fill' autoPlay muted playsInline>
          <source src="https://res.cloudinary.com/deanuec4t/video/upload/v1755877146/HeroVideo_mh82yd.mp4" type='video/mp4' />
        </video>
      </section>


     
      <section id='features-section ' className='relative  px-20 '>
        <h1 className='relative font-extrabold text-5xl z-10  mb-9'>What We Offer ?</h1>
        <div className='absolute inset-0 min-h-screen w-full z-0'>
                <img src="../public/images/homepage-feature-section.png" className='w-full h-full object-cover' alt="" />
        </div>
        <div className='relative grid grid-cols-[7fr_5fr] z-10 ' >
              <div className='grid grid-cols-2 gap-2'>
                <div  className=' rounded-xl bg-red-50  p-8'>
                  <div className='grid grid-cols-[3fr_9fr] '>
                    <div><img src="https://www.vedantu.com/cdn/images/new-home-page/B2/summer-camp.svg" alt="" /></div>
                    <div className='text-base/5'>
                      <div className='mb-8'>
                          <h4 className='text-purple-500 font-medium'>We Provide</h4>
                          <h3 className='font-bold'>Real-Time Student Progress Tracking</h3>
                          <h3 className='font-light '>Monitor every student's progress across platforms —no manual work or spreadsheets.</h3>

                      </div>
                      {/* <div>
                          <button className='bg-gray-800 text-white px-7 py-2 rounded-md '>Explore</button>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div  className=' rounded-xl bg-orange-200  p-8'>
                  <div className='grid grid-cols-[3fr_9fr] '>
                    <div><img src="https://www.vedantu.com/cdn/images/new-home-page/B2/vsk-spoken-english.svg" alt="" /></div>
                    <div className='text-base/5'>
                      <div className='mb-8'>
                          <h4 className='text-blue-900 font-medium'>We Provide</h4>
                          <h3 className='font-bold'>Cross-Platform Assignment Integration</h3>
                          <h3 className='font-light '>Seamlessly add questions from LeetCode, GeeksforGeeks, and other popular coding platforms.</h3>

                      </div>
                      {/* <div>
                          <button className='bg-gray-800 text-white px-7 py-2 rounded-md '>Explore</button>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div  className=' rounded-xl bg-green-100  p-8'>
                  <div className='grid grid-cols-[3fr_9fr] '>
                    <div><img src="https://www.vedantu.com/cdn/images/new-home-page/B2/vsk-math.svg" alt="" /></div>
                    <div className='text-base/5'>
                      <div className='mb-8'>
                          <h4 className='text-orange-500 font-medium'>We Provide</h4>
                          <h3 className='font-bold'>Performance Analytics & Dashboards</h3>
                          <h3 className='font-light '>Track every student's progress with detailed analytics and performance insights.</h3>

                      </div>
                      {/* <div>
                          <button className='bg-gray-800 text-white px-7 py-2 rounded-md '>Explore</button>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div  className=' rounded-xl bg-blue-100  p-8'>
                  <div className='grid grid-cols-[3fr_9fr] '>
                    <div><img src="https://www.vedantu.com/cdn/images/new-home-page/B2/coding-classes.svg" alt="" /></div>
                    <div className='text-base/5'>
                      <div className='mb-8'>
                          <h4 className='text-blue-500 font-medium'>We Provide</h4>
                          <h3 className='font-bold'>Leaderboards & Gamification</h3>
                          <h3 className='font-light '>Motivate students with weekly leaderboards and recognize top performers institution-wide.</h3>

                      </div>
                      {/* <div>
                          <button className='bg-gray-800 text-white px-7 py-2 rounded-md '>Explore</button>
                      </div> */}
                    </div>
                  </div>
                </div>
                
                

                

              </div>
              
        </div>

      </section>


      

      <section className='min-h-screen border-shadow-sky-500 px-10  '>
        <h1 className='font-extrabold text-5xl  mb-20'>Login As</h1>
        <div className='grid grid-cols-3 gap-10 '>
          <div className='bg-gray-100 border-2 border-dotted rounded grid grid-row-[10fr_2fr] p-9 '>
            <div className=''>
              <img src="./public/images/landingStudent.png" alt="" className='rounded-full' />
            </div>
            <div className='font-bold text-2xl text-center'>Student</div>

          </div>
          <div className='bg-yellow-100 border-2 border-dotted rounded grid grid-row-[9fr_3fr]  p-9 '>
            <div className=''>
              <img src="./public/images/landingTeacher.png" alt="" className='rounded-full' />
            </div>
            <div className='font-bold text-2xl text-center'>Teacher</div>

          </div>
          <div className='bg-red-100 border-2 border-dotted rounded grid grid-row-[9fr_3fr]  p-9 '>
            <div className=''>
              <img src="./public/images/landingInstitution.png" alt="" className='rounded-full' />
            </div>
            <div className='font-bold text-2xl text-center'>Institution</div>

          </div>

          
          
        </div>
      </section>


      <section className='h-80 '>
        <div className='w-full h-full border-1 grid grid-cols-[4fr_8fr] '>
          <div className='flex items-center justify-center'>
            <h1 className='font-bold text-4xl text-center border-t border-l p-2'>Weekly Active Coders</h1>
          </div>
          <div className='flex justify-center gap-4 items-center' >

            <div className='border h-40 w-40 flex flex-col justify-between'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#3</div>
                <div className=''> deepali</div>
              </div>
            </div>

            <div className='border h-60 w-60'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#1</div>
                <div className=''> deepali</div>
              </div>
            </div>

            <div className='border h-50 w-50 flex flex-col justify-between'>
              <div className='h-[80%] flex justify-center items-center'>
                <img src="../footerLogo.png" alt="" className='rounded-full h-[70%] w-[70%] border' />
              </div>
              <div className='text-center'> 
                <div className=''>#2</div>
                <div className=''> deepali</div>
              </div>
            </div>
            

          </div>
        </div>
        
      </section>


      {/* Footer */}
      <footer className='bg-black w-full h-56 flex items-center'>
        <div className='text-white w-full grid grid-cols-[3fr_6fr_2fr]'>
          <div className='flex justify-center items-center'>
            <img src="./footerLogo.png" alt="" height={300} width={300} />

          </div>
          <div className='flex justify-around items-center'>
            <a href='#' >Terms & Conditions</a>
            <a href='#'>Privacy Policy</a>
            <a href='#'>Contact Us</a>

          </div>
          <div className="flex items-center gap-3 text-3xl text-gray-600">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition duration-300"
            >
              <FaInstagram />
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition duration-300"
            >
              <FaFacebook />
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition duration-300"
            >
              <FaXTwitter />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition duration-300"
            >
              <FaWhatsapp />
            </a>
         </div>

        </div>
        <div>

        </div>

      </footer>
    </div>
  )






}