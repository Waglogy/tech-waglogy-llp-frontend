import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimes, FaEnvelope, FaPhone, FaBuilding, FaUser, FaMoneyBillWave, FaCommentAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Header / Success Icon */}
            <div className="bg-gradient-to-b from-blue-600/20 to-transparent p-8 text-center border-b border-white/5">
              <div className="w-20 h-20 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <FaCheckCircle className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Message Sent!</h2>
              <p className="text-slate-400">We've received your inquiry and will get back to you shortly.</p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {submittedData && (
                <div className="bg-white/5 rounded-xl border border-white/10 p-5 mb-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Submission Summary</h3>
                  <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                    {submittedData.fullName && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaUser className="mt-1 text-blue-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Name</span>
                          <span className="text-slate-200">{submittedData.fullName}</span>
                        </div>
                      </div>
                    )}

                    {submittedData.email && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaEnvelope className="mt-1 text-sky-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Email</span>
                          <span className="text-slate-200 break-all">{submittedData.email}</span>
                        </div>
                      </div>
                    )}

                    {submittedData.phone && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaPhone className="mt-1 text-indigo-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Phone</span>
                          <span className="text-slate-200">{submittedData.phone}</span>
                        </div>
                      </div>
                    )}

                    {submittedData.organizationName && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaBuilding className="mt-1 text-slate-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Company</span>
                          <span className="text-slate-200">{submittedData.organizationName}</span>
                        </div>
                      </div>
                    )}

                    {submittedData.budgetRange && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaMoneyBillWave className="mt-1 text-green-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Budget</span>
                          <span className="text-slate-200">{submittedData.budgetRange}</span>
                        </div>
                      </div>
                    )}

                    {submittedData.projectDetails && (
                      <div className="flex items-start gap-3 text-sm">
                        <FaCommentAlt className="mt-1 text-slate-400 flex-shrink-0" />
                        <div>
                          <span className="block text-xs text-slate-500">Message</span>
                          <span className="text-slate-200 whitespace-pre-wrap">{submittedData.projectDetails}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Response Time Info */}
              <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <p className="text-blue-300 text-sm">
                  <strong>Expected Response:</strong> Within 24-48 hours
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={onClose}
                className="w-full rounded-xl px-6 py-4 font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
