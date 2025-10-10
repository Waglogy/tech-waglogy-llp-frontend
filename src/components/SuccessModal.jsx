import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const SuccessModal = ({ isOpen, onClose, submittedData }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto animate-scale-in my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1"
          aria-label="Close modal"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 clear-both">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce-in">
              <FaCheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Thank You!
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 text-center mb-6">
            Your message has been successfully submitted. We will contact you soon!
          </p>

          {/* Submitted Details */}
          {submittedData && (
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 overflow-hidden">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Submitted Details:</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E0 #F7FAFC'
                }}
              >
              
              {submittedData.fullName && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Name:</span>
                  <span className="text-gray-900 text-sm break-words flex-1">{submittedData.fullName}</span>
                </div>
              )}
              
              {submittedData.email && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Email:</span>
                  <span className="text-gray-900 text-sm break-all flex-1">{submittedData.email}</span>
                </div>
              )}
              
              {submittedData.phone && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Phone:</span>
                  <span className="text-gray-900 text-sm break-words flex-1">{submittedData.phone}</span>
                </div>
              )}
              
              {submittedData.organizationName && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Company:</span>
                  <span className="text-gray-900 text-sm break-words flex-1">{submittedData.organizationName}</span>
                </div>
              )}
              
              {submittedData.budgetRange && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Budget:</span>
                  <span className="text-gray-900 text-sm break-words flex-1">{submittedData.budgetRange}</span>
                </div>
              )}
              
              {submittedData.projectDetails && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 text-sm font-medium min-w-[70px] sm:min-w-[80px] flex-shrink-0">Message:</span>
                  <span className="text-gray-900 text-sm break-words flex-1 whitespace-pre-wrap">{submittedData.projectDetails}</span>
                </div>
              )}
              </div>
            </div>
          )}

          {/* Response Time Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm text-center">
              <strong>Expected Response Time:</strong> Within 24 hours
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full rounded-lg px-6 py-3 font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Add animations and custom scrollbar styles */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        /* Custom scrollbar for webkit browsers */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #F7FAFC;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #CBD5E0;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #A0AEC0;
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;

