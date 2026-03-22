import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/student/Navbar";
import Footer from "../../components/common/Footer";

const CertificateView = () => {
  const { courseId } = useParams();
  const token = localStorage.getItem("token");

  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl;

    const fetchCertificate = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/certificate/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          const data = await res.json();
          setError(data.message);
          setLoading(false);
          return;
        }

        const blob = await res.blob();
        objectUrl = window.URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (err) {
        setError("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();

    return () => {
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
    };
  }, [courseId, token]);

  const downloadCertificate = () => {
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "certificate.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading certificate...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <Navbar />

      {/* Content Wrapper */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-10 py-12">
        {/* Premium Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🎉 Congratulations!
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            You’ve successfully completed this course. Your dedication and hard
            work have earned you this certificate of achievement.
          </p>
        </div>

        {pdfUrl && (
          <>
            {/* PDF Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-yellow-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <iframe
                src={pdfUrl}
                title="Certificate Preview"
                className="w-full h-[380px] sm:h-[450px] md:h-[500px]"
              />
            </div>

            {/* Download Section */}
            <div className="flex flex-col items-center mt-10 space-y-4">
              <button
                onClick={downloadCertificate}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-10 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                Download Certificate
              </button>

              <p className="text-sm text-gray-500">
                Add this certificate to your portfolio or LinkedIn profile 🚀
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CertificateView;
