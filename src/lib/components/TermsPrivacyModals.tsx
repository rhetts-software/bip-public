"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TermsOfServiceModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-brand-blue-950 rounded-2xl shadow-xl border border-gray-200 dark:border-brand-blue-800 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-h-[60vh] overflow-y-auto space-y-3">
                  <p><strong>Last Updated:</strong> [24/06/2025]</p>
                  <p>Welcome to the Bagtas Information Portal (BIP). By accessing or using this platform, you agree to comply with the following terms:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Eligibility:</strong> The BIP is available to all residents, barangay officials, and authorized personnel of Barangay Bagtas.</li>
                    <li><strong>Use of Services:</strong> You agree to use the platform only for lawful and intended purposes such as accessing announcements, submitting requests, participating in community discussions, and viewing official documents.</li>
                    <li><strong>User Responsibilities:</strong> Do not submit false information. Respect others. Keep your credentials secure. You are responsible for activity under your account.</li>
                    <li><strong>Account Suspension:</strong> We reserve the right to suspend or terminate accounts that violate these terms or disrupt community use.</li>
                    <li><strong>Content Ownership:</strong> You retain ownership of your content. However, BIP may display it for transparency and records.</li>
                    <li><strong>Modifications:</strong> We may update these terms anytime. Continued use means you agree to the changes.</li>
                  </ol>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-100 dark:bg-brand-blue-800 text-blue-900 dark:text-blue-100 rounded-md hover:bg-blue-200 dark:hover:bg-brand-blue-700"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function PrivacyPolicyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-brand-blue-950 rounded-2xl shadow-xl border border-gray-200 dark:border-brand-blue-800 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Privacy Policy
                </h3>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-h-[60vh] overflow-y-auto space-y-3">
                  <p><strong>Last Updated:</strong> [24/06/2025]</p>
                  <p>Your privacy is important to us. This Privacy Policy explains how we handle your personal data:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li><strong>Information We Collect:</strong> Name, address, contact info, uploaded documents, forum posts, and system usage logs.</li>
                    <li><strong>How We Use Your Data:</strong> To verify your identity, improve services, provide alerts, and enhance usability and security.</li>
                    <li><strong>Data Security:</strong> We protect your data using encryption and access control. Only authorized staff can access sensitive records.</li>
                    <li><strong>Third-Party Sharing:</strong> We do not share your personal information with third parties unless required by law.</li>
                    <li><strong>Data Retention:</strong> Your data is kept only as long as necessary to operate the platform or as mandated by law.</li>
                    <li><strong>Your Rights:</strong> You may request access, correction, or deletion of your information through the barangay office.</li>
                  </ol>
                  <p>We are committed to keeping your data safe while providing a transparent and helpful platform for Barangay Bagtas.</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-100 dark:bg-brand-blue-800 text-blue-900 dark:text-blue-100 rounded-md hover:bg-blue-200 dark:hover:bg-brand-blue-700"
                  >
                    I Understand
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
