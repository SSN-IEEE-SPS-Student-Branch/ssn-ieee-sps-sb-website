'use client';

import { useState, useRef, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setShowPopup(false);
    }
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPopup]);

  return (
    <footer
      style={{
        width: "100%",
        marginTop: "4rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        // --- CHANGE 1: Updated Background Color ---
        background: "rgba(5, 20, 35, 0.8)",
        // ------------------------------------------
        backdropFilter: "blur(10px)",
        padding: "1.5rem 0",
        position: "relative",
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* --- LEFT SECTION: Developer Button | Separator | Icons --- */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>

          {/* Developed By Button with Popup */}
          <div style={{ position: "relative" }} ref={popupRef}>
            <motion.button
              type="button"
              onClick={() => setShowPopup((v) => !v)}
              aria-label="About the website developers"
              aria-expanded={showPopup}
              aria-controls="developer-credits"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "#78BE20", // IEEE SPS Green
                color: "#000",         // Black text for contrast
                border: "none",
                fontWeight: 700,
                fontSize: "1.5rem",
                borderRadius: "20px",
                padding: "3px 10px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              {"♥"}
            </motion.button>

            {/* Popup Bubble */}
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  id="developer-credits"
                  role="status"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    bottom: "130%", // Pushes it above the button
                    left: "0",
                    background: "#ffffff",
                    color: "#333",
                    borderRadius: "12px",
                    padding: "16px",
                    minWidth: "200px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    zIndex: 20,
                    textAlign: "left"
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      color: "#78BE20",
                      marginBottom: "2px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px"
                    }}
                  >
                    Developed with love by
                  </div>

                  {/* --- UPDATED NAMES WITH HOVER EFFECT --- */}
                  <motion.div
                    whileHover={{ x: 5, color: "#78BE20" }}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      marginBottom: "4px",
                      cursor: "default" // or "pointer" if you add links later
                    }}
                  >
                    Mugilkrishna D U
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5, color: "#78BE20" }}
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      cursor: "default"
                    }}
                  >
                    Prawin Kumar S
                  </motion.div>
                  {/* -------------------------------------- */}

                  {/* Little Triangle Arrow pointing down */}
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "20px",
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid #ffffff",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical Separator Line */}
          <div style={{
            width: "1px",
            height: "24px",
            background: "rgba(255,255,255,0.3)",
            display: "block" // Ensures it shows up
          }}></div>

          {/* Social Icons Container */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "2rem" }}>

            {/* --- CHANGE 2: IEEE SPS Logo now has hover effect --- */}
            <motion.a
              href="https://signalprocessingsociety.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IEEE Signal Processing Society website"
              whileHover={{ scale: 1.15 }} // Added scale effect
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                background: "white",
                borderRadius: "50%",
                overflow: "hidden",
                // removed transition: transform 0.2s as motion handles it
              }}
            >
              <Image
                src="/IEEE_SPS_LOGO.png"
                alt="IEEE SPS"
                width={32}
                height={32}
              />
            </motion.a>
            {/* -------------------------------------------------- */}

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/company/ssn-ieee-signal-processing-society/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SSN IEEE SPS on LinkedIn"
              whileHover={{ y: -3, color: "#0A66C2" }}
              style={{ color: "rgba(255,255,255,0.9)", display: "flex" }}
            >
              <FaLinkedin aria-hidden="true" />
            </motion.a>

            {/* YouTube */}
            <motion.a
              href="https://www.youtube.com/@IEEESSNSPSSB"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SSN IEEE SPS on YouTube"
              whileHover={{ y: -3, color: "#FF0000" }}
              style={{ color: "rgba(255,255,255,0.9)", display: "flex" }}
            >
              <FaYoutube aria-hidden="true" />
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/ieee_sps_ssn/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SSN IEEE SPS on Instagram"
              whileHover={{ y: -3, color: "#E1306C" }}
              style={{ color: "rgba(255,255,255,0.9)", display: "flex" }}
            >
              <FaInstagram aria-hidden="true" />
            </motion.a>
          </div>
        </div>

        {/* --- RIGHT SECTION: Copyright --- */}
        <div style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.6)", textAlign: "right" }}>
          © {new Date().getFullYear()} SSN IEEE Signal Processing Society
        </div>

      </div>
    </footer>
  );
}
