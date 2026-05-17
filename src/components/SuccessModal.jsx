import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdCheckCircle, MdClose, MdMail, MdPhone, MdBusiness, MdPerson,
  MdCurrencyRupee, MdChatBubbleOutline
} from 'react-icons/md';

const SuccessModal = ({ isOpen, onClose, submittedData }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg bg-white rounded-2xl border border-[#E5E2DC] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6E6B67] hover:bg-[#F0EDE8] transition-colors z-10"
            >
              <MdClose size={20} />
            </button>

            {/* Header */}
            <div className="px-8 pt-10 pb-6 text-center border-b border-[#E5E2DC]">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-5">
                <MdCheckCircle size={36} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#0C0C0C] mb-2">Message Sent</h2>
              <p className="text-sm text-[#6E6B67] leading-relaxed max-w-sm mx-auto">
                We've received your inquiry and will get back to you shortly.
              </p>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {submittedData && (
                <div className="border border-[#E5E2DC] rounded-xl p-5 mb-5 bg-[#FAFAF8]">
                  <h3 className="text-xs font-semibold text-[#6E6B67] uppercase tracking-widest mb-4 pb-3 border-b border-[#E5E2DC]">
                    Submission Summary
                  </h3>
                  <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">

                    {submittedData.fullName && (
                      <Row icon={MdPerson} label="Name" value={submittedData.fullName} />
                    )}
                    {submittedData.email && (
                      <Row icon={MdMail} label="Email" value={submittedData.email} breakAll />
                    )}
                    {submittedData.phone && (
                      <Row icon={MdPhone} label="Phone" value={submittedData.phone} />
                    )}
                    {submittedData.organizationName && (
                      <Row icon={MdBusiness} label="Company" value={submittedData.organizationName} />
                    )}
                    {submittedData.budgetRange && (
                      <Row icon={MdCurrencyRupee} label="Budget" value={submittedData.budgetRange} />
                    )}
                    {submittedData.projectDetails && (
                      <Row icon={MdChatBubbleOutline} label="Message" value={submittedData.projectDetails} multiline />
                    )}
                  </div>
                </div>
              )}

              {/* Response info */}
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" aria-hidden />
                <p className="text-sm text-[#0C0C0C]">
                  <span className="font-semibold">Expected response:</span>{' '}
                  <span className="text-[#3D3A36]">Within 24–48 hours</span>
                </p>
              </div>

              <button
                onClick={onClose}
                className="btn-primary w-full justify-center py-3.5 text-sm"
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

const Row = ({ icon: Icon, label, value, breakAll, multiline }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
      <Icon size={15} />
    </div>
    <div className="min-w-0 flex-1">
      <div className="text-[11px] font-semibold text-[#A09A90] uppercase tracking-wider mb-0.5">{label}</div>
      <div
        className={`text-sm text-[#0C0C0C] ${breakAll ? 'break-all' : ''} ${multiline ? 'whitespace-pre-wrap leading-relaxed' : ''}`}
      >
        {value}
      </div>
    </div>
  </div>
);

export default SuccessModal;
