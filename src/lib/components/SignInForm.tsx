"use client";
import { useActionState } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SignInFormState } from "@/lib/modules/forms";
import { signIn } from "../modules/auth";
import { TermsOfServiceModal, PrivacyPolicyModal } from "@/lib/components/TermsPrivacyModals";

const initialState: SignInFormState = {
  values: {
    email: "",
    password: "",
  },
  errors: undefined,
  success: false,
};

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, initialState);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-brand-blue-500 dark:bg-brand-blue-800 shadow-lg"
          >
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mt-4 text-[1.05rem] text-gray-700 dark:text-gray-300"
          >
            Welcome back! Please sign in to your account
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white dark:bg-brand-blue-950 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-brand-blue-800 backdrop-blur-sm text-[1.05rem]"
        >
          <form action={action} className="space-y-6">
            {/* Email */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-brand-blue-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-brand-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-brand-blue-600"
                placeholder="Enter your email"
              />
              {state?.errors?.properties?.email?.errors?.map((error, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-base text-red-600 dark:text-red-400 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.p>
              ))}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <label htmlFor="password" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-brand-blue-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-brand-blue-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-brand-blue-600"
                placeholder="Enter your password"
              />
              {state?.errors?.properties?.password?.errors?.map((error, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-base text-red-600 dark:text-red-400 flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </motion.p>
              ))}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.button
                type="submit"
                disabled={pending}
                whileHover={{ scale: pending ? 1 : 1.02 }}
                whileTap={{ scale: pending ? 1 : 0.98 }}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 ${
                  pending
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-brand-blue-500 dark:bg-brand-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="relative flex items-center justify-center gap-2">
                  <div className="h-5 w-5">
                    {pending && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <span className="flex items-center gap-1">
                    {pending ? "Signing In..." : "Sign In"}
                    {!pending && (
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    )}
                  </span>
                </div>
              </motion.button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="pt-4 text-center"
            >
              <p className="text-base text-gray-700 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <a href="signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                  Sign up
                </a>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer (Terms/Privacy) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </p>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <TermsOfServiceModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  );
}
