'use client';

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#006680]">
      
      {/* About Us Section */}
      <div className="bg-gradient-to-b from-[#005570] to-[#006680] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">अगोरा प्रकाशन: कलम जब प्रतिरोध का हथियार बने</h2>
          
          <div className="text-gray-100 leading-relaxed space-y-6 mb-8">
            <p className="text-center text-base">
              अगोरा प्रकाशन केवल किताबों का मुद्रक नहीं है, बल्कि यह उन असहमतियों का संग्रह है जिन्हें मुख्यधारा के विमर्श ने हाशिए पर धकेल दिया है। हमारा फलसफा शब्दों की स्याही से सामाजिक परिवर्तन की इबारत लिखना है।
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">१. सामाजिक न्याय</h3>
                <p className="text-sm">
                  अगोरा का जन्म ही इस विचार के साथ हुआ है कि साहित्य केवल मनोरंजन नहीं, बल्कि सामाजिक न्याय की लड़ाई का एक मोर्चा है। हम उन आवाजों को पन्ने मुहैया कराते हैं जो जातिवाद, सांप्रदायिकता और वर्ग-भेद की दीवारों को ढहाने का माद्दा रखती हैं।
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">२. बगावती स्वर</h3>
                <p className="text-sm">
                  हमारा समाज सदियों से स्त्री-द्वेषी और पितृसत्तात्मक ढांचों में जकड़ा रहा है। अगोरा इन बेड़ियों को तोड़ने वाले 'बगावती स्वरों' का मंच है। हम उन लेखिकाओं को प्राथमिकता देते हैं जो घरेलू हिंसा, पितृसत्ता और यौनिकता के संघर्ष को बिना झिझक स्वर देती हैं।
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
                <h3 className="text-xl font-bold mb-3 text-yellow-300">३. पर्यावरण-लोकतंत्र</h3>
                <p className="text-sm">
                  आज के दौर में सबसे बड़ा संकट प्रकृति पर कब्जा करने की पूंजीवादी होड़ है। अगोरा पर्यावरण-लोकतंत्र का हिमायती है। हम ऐसी किताबों को प्रकाशित करते हैं जो विकास के विनाशकारी मॉडल पर सवाल उठाती हैं।
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-6">
              <h3 className="text-2xl font-bold mb-4 text-yellow-300 text-center">अगोरा से ही किताब क्यों छपवाएं?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-2"><span className="font-bold text-yellow-200">• वैचारिक स्पष्टता:</span> यदि आपका लेखन सत्ता, समाज या रूढ़ियों से टकराता है, तो अगोरा आपका नैसर्गिक घर है।</p>
                  <p className="text-sm mb-2"><span className="font-bold text-yellow-200">• समावेशी मंच:</span> हम स्थापित नामों के बजाय उन नए कलमकारों को खोजते हैं जिनके पास कहने के लिए कुछ मौलिक है।</p>
                </div>
                <div>
                  <p className="text-sm mb-2"><span className="font-bold text-yellow-200">• गुणवत्ता और सरोकार:</span> हमारी किताबों का संपादन केवल व्यावसायिक नहीं होता, बल्कि उसमें विषय की गंभीरता झलकती है।</p>
                  <p className="text-sm mb-2"><span className="font-bold text-yellow-200">• साझा संघर्ष:</span> हम लेखक को केवल एक वेंडर नहीं, बल्कि सामाजिक बदलाव का साथी मानते हैं।</p>
                </div>
              </div>
              <p className="text-center mt-6 text-lg italic text-yellow-100 font-semibold">
                "किताबें सिर्फ शेल्फ की शोभा बढ़ाने के लिए नहीं, बल्कि सोए हुए जमीर को जगाने और यथास्थिति को चुनौती देने के लिए होनी चाहिए।"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="border-t border-[#004d5c]">
        <div className="max-w-6xl mx-auto px-4 py-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            
            <div>
              <h3 className="font-bold mb-3 text-base">संपर्क</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <FaPhone className="mt-1 flex-shrink-0" />
                  <span>094790 60031</span>
                </div>
                <div className="flex items-start gap-2">
                  <FaEnvelope className="mt-1 flex-shrink-0" />
                  <span>agoraprakashan001@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-bold mb-3 text-base">पता</h3>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>ग्राम अहिरान, पोस्ट चमांव, शिवपुर, वाराणसी-221003, उत्तर प्रदेश, भारत</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 text-base">सोशल मीडिया</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/agoraprakashan12" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <FaFacebook className="text-2xl" />
                </a>
                <a href="https://www.instagram.com/agoraprakashan" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <FaInstagram className="text-2xl" />
                </a>
                <a href="https://twitter.com/AgoraPrakashan" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <FaTwitter className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policies Link */}
      <div className="border-t border-[#004d5c] pt-4 text-center">
        <Link href="/policies" className="text-white hover:text-yellow-300 transition-colors underline text-sm font-semibold">
          View Our Policies / हमारी नीतियाँ देखें
        </Link>
      </div>

      <div className="border-t border-[#004d5c] mt-4 pt-3 text-center text-xs">
        <p className="text-gray-200">
          © {new Date().getFullYear()} अगोरा प्रकाशन • वेबसाइट:{" "}
          <a href="https://www.web-developer-kp.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
            web-developer-kp.com
          </a>
        </p>
      </div>
    </footer>
  );
}