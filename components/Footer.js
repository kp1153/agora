import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-teal-600 mt-16 bg-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-900">
        {/* डेवलपर क्रेडिट */}
        <p className="text-sm">
          Web Developer:{" "}
          <Link
            href="https://www.web-developer-kp.com/"
            target="_blank"
            className="underline hover:text-teal-600"
          >
            www.web-developer-kp.com
          </Link>
        </p>

        {/* कॉपीराइट */}
        <p className="mt-4 text-xs text-gray-700">
          © {new Date().getFullYear()} अगोरा प्रकाशन — सर्वाधिकार सुरक्षित
        </p>
      </div>
    </footer>
  );
}