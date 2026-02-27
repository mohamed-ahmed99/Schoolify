import React from 'react';
import { motion } from 'framer-motion';
import schoolifyLogo from '../../assets/schoolify_logo_transparent (1).png';
import './Loader.css';

const LogoLoader = () => {
    return (
        <motion.div
            className="loader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="loader-content">
                <div className="logo-wrapper">
                    <div className="logo-glow"></div>

                    {/* The Logo with Piece-by-Piece Smooth Reveal */}
                    <div className="animated-logo-container">
                        {/* Background Logo (Dimmed/Static) */}
                        <img src={schoolifyLogo} alt="Schoolify" className="loader-logo-img logo-static-bg" />

                        {/* Animated Overlay (Fills up smoothly) */}
                        <motion.div
                            className="logo-fill-overlay"
                            animate={{
                                height: ['0%', '100%', '100%', '0%', '0%'],
                                bottom: ['0%', '0%', 'auto', 'auto', '0%'],
                                top: ['auto', 'auto', '0%', '0%', 'auto']
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.4, 0.5, 0.9, 1]
                            }}
                        >
                            <img src={schoolifyLogo} alt="Schoolify" className="loader-logo-img logo-actual-fill" />
                        </motion.div>

                        {/* Glow sweep line that follows the fill boundary */}
                        <motion.div
                            className="logo-boundary-glow"
                            animate={{
                                bottom: ['0%', '100%', '100%', '0%', '0%']
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                times: [0, 0.4, 0.5, 0.9, 1]
                            }}
                        />
                    </div>
                </div>

                <div className="loader-status">
                    <motion.div className="loader-bar-bg">
                        <motion.div
                            className="loader-bar-fill"
                            animate={{
                                width: ['0%', '70%', '100%'],
                                left: ['-100%', '0%', '100%']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Fetching your workspace...
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default LogoLoader;
