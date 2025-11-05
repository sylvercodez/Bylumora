"use client";

import React from "react";

const LumoraEmbed = () => {
  const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lumora - Professional AI Website & Premium Hosting</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .lumora-container {
            width: 100%;
            background: #0a0a0a !important;
            color: #ffffff !important;
            position: relative;
            padding: 20px 0;
            font-family: 'Inter', sans-serif !important;
            box-sizing: border-box;
            min-height: 100vh;
        }

        .lumora-container * {
            color: #ffffff !important;
            font-family: 'Inter', sans-serif !important;
        }

        .lumora-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
            box-sizing: border-box;
        }

        .lumora-header {
            position: relative;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 215, 0, 0.1);
            margin-bottom: 40px;
            z-index: 100;
        }

        .lumora-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            opacity: 0;
            transform: translateY(-20px);
        }

        .animate-slideInDown {
            animation: slideInDown 0.8s ease-out forwards;
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .lumora-logo {
            font-family: 'Space Grotesk', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.8rem !important;
            background: linear-gradient(135deg, #FFD700, #FFA500) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            letter-spacing: -0.02em;
        }

        .lumora-nav-links {
            display: flex;
            list-style: none;
            gap: 3rem;
            align-items: center;
        }

        .lumora-nav-links a {
            color: rgba(255, 255, 255, 0.8) !important;
            text-decoration: none !important;
            font-weight: 500 !important;
            font-size: 0.95rem !important;
            transition: color 0.3s ease;
            position: relative;
        }

        .lumora-nav-links a:hover {
            color: #FFD700 !important;
        }

        .lumora-nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            transition: width 0.3s ease;
        }

        .lumora-nav-links a:hover::after {
            width: 100%;
        }

        .lumora-hero {
            position: relative;
            background: linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%) !important;
            padding: 80px 0 120px 0;
            width: 100%;
            box-sizing: border-box;
        }

        .lumora-hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at 30% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(255, 165, 0, 0.03) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        }

        .lumora-hero-main {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 60px;
            min-height: 600px;
            position: relative;
            z-index: 2;
            width: 100%;
            box-sizing: border-box;
        }

        .lumora-hero-content {
            position: relative;
            z-index: 3;
        }

        .lumora-hero-badge {
            display: inline-block;
            background: rgba(255, 215, 0, 0.15) !important;
            border: 1px solid rgba(255, 215, 0, 0.4) !important;
            color: #FFD700 !important;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            margin-bottom: 2.5rem;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(30px);
        }

        .lumora-hero-title {
            font-family: 'Space Grotesk', sans-serif !important;
            font-weight: 800 !important;
            font-size: clamp(3rem, 6vw, 5rem) !important;
            line-height: 1.1 !important;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.9) 100%) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            opacity: 0;
            transform: translateY(30px);
        }

        .lumora-hero-subtitle {
            font-size: 1.3rem !important;
            color: rgba(255, 255, 255, 0.8) !important;
            margin-bottom: 3.5rem;
            max-width: 550px;
            font-weight: 400 !important;
            line-height: 1.6;
            opacity: 0;
            transform: translateY(30px);
        }

        .lumora-hero-actions {
            display: flex;
            gap: 2rem;
            align-items: center;
            opacity: 0;
            transform: translateY(30px);
        }

        .lumora-hero-visual {
            position: relative;
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            opacity: 0;
            transform: translateX(50px);
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInRight {
            animation: slideInRight 1s ease-out forwards;
        }

        .lumora-tech-orbit {
            position: relative;
            width: 400px;
            height: 400px;
        }

        .lumora-center-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0.2) 40%, transparent 70%);
            border-radius: 50%;
            animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { 
                transform: translate(-50%, -50%) scale(1); 
                opacity: 0.8; 
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.2); 
                opacity: 1; 
            }
        }

        .lumora-orbit-ring {
            position: absolute;
            border: 2px solid rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            animation: rotate 20s linear infinite;
        }

        .lumora-orbit-1 {
            width: 240px;
            height: 240px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .lumora-orbit-2 {
            width: 340px;
            height: 340px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-direction: reverse;
        }

        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .lumora-tech-node {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 215, 0, 0.4);
            transition: all 0.4s ease;
            animation: counterRotate 20s linear infinite;
        }

        .lumora-orbit-2 .lumora-tech-node {
            animation-direction: reverse;
        }

        @keyframes counterRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }

        .lumora-node-google {
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(66, 133, 244, 0.3), rgba(52, 168, 83, 0.3));
        }

        .lumora-node-wordpress {
            top: 50%;
            right: -50px;
            transform: translateY(-50%);
            background: linear-gradient(135deg, rgba(33, 117, 155, 0.3), rgba(70, 70, 70, 0.3));
        }

        .lumora-tech-node:hover {
            transform: scale(1.1);
            border-color: rgba(255, 215, 0, 0.8);
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.4);
        }

        .lumora-tech-node img {
            width: 65%;
            height: 65%;
            object-fit: contain;
            transition: transform 0.4s ease;
        }

        .lumora-tech-node:hover img {
            transform: scale(1.15);
        }

        .lumora-btn {
            padding: 1.2rem 2.5rem;
            border: none;
            border-radius: 16px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .lumora-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.6s ease;
        }

        .lumora-btn:hover::before {
            left: 100%;
        }

        .lumora-btn-primary {
            background: linear-gradient(135deg, #FFD700, #FFA500) !important;
            color: #0a0a0a !important;
            box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4) !important;
        }

        .lumora-btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(255, 215, 0, 0.5) !important;
        }

        .lumora-btn-secondary {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
            backdrop-filter: blur(10px);
        }

        .lumora-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 215, 0, 0.6) !important;
            transform: translateY(-2px);
        }

        .lumora-whatsapp-widget {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
        }

        .lumora-whatsapp-btn {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            color: white !important;
            animation: bounce 2s infinite;
        }

        .lumora-whatsapp-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 40px rgba(37, 211, 102, 0.6);
        }

        .lumora-whatsapp-icon {
            width: 32px;
            height: 32px;
        }

        .lumora-whatsapp-icon path {
            fill: #ffffff !important;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-5px);
            }
            60% {
                transform: translateY(-3px);
            }
        }

        .cloud-section {
            background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
            padding: 120px 0;
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }

        .cloud-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at 20% 30%, rgba(66, 133, 244, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 70%, rgba(52, 168, 83, 0.06) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(251, 188, 5, 0.04) 0%, transparent 50%);
            pointer-events: none;
        }

        .cloud-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 2;
        }

        .cloud-header {
            text-align: center;
            margin-bottom: 80px;
            opacity: 0;
            transform: translateY(40px);
        }

        .cloud-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(52, 168, 83, 0.2));
            border: 1px solid rgba(66, 133, 244, 0.4);
            color: #4285F4;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 2rem;
            backdrop-filter: blur(10px);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cloud-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 800;
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .cloud-subtitle {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .cloud-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
            margin-top: 80px;
        }

        .cloud-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px 30px;
            backdrop-filter: blur(15px);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateY(50px);
        }

        .animate-slideInUp {
            animation: slideInUp 0.8s ease-out forwards;
        }

        .cloud-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .cloud-card:hover::before {
            opacity: 1;
        }

        .cloud-card:hover {
            transform: translateY(-10px);
            border-color: rgba(66, 133, 244, 0.4);
            box-shadow: 0 20px 60px rgba(66, 133, 244, 0.2);
        }

        .cloud-card-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(52, 168, 83, 0.2));
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
            position: relative;
        }

        .cloud-card-icon svg {
            width: 40px;
            height: 40px;
            fill: #4285F4;
            transition: transform 0.4s ease;
        }

        .cloud-card:hover .cloud-card-icon svg {
            transform: scale(1.1);
        }

        .cloud-card-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 1.4rem;
            color: #ffffff;
            margin-bottom: 16px;
        }

        .cloud-card-description {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.6;
            font-size: 0.95rem;
        }

        .cloud-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 40px;
            margin-top: 100px;
            padding: 60px 40px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 32px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            opacity: 0;
            transform: translateY(50px);
        }

        .cloud-stat {
            text-align: center;
        }

        .cloud-stat-number {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 800;
            font-size: clamp(2rem, 4vw, 3rem);
            background: linear-gradient(135deg, #4285F4, #34A853);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
            display: block;
        }

        .cloud-stat-label {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cloud-architecture {
            margin-top: 100px;
            text-align: center;
            position: relative;
            opacity: 0;
            transform: translateY(50px);
        }

        .cloud-architecture-visual {
            position: relative;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 60px;
        }

        .cloud-network {
            position: relative;
            width: 600px;
            height: 300px;
        }

        .cloud-node {
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(66, 133, 244, 0.1);
            border: 2px solid rgba(66, 133, 244, 0.4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            animation: float 6s ease-in-out infinite;
            opacity: 0;
        }

        .cloud-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, rgba(66, 133, 244, 0.3), rgba(52, 168, 83, 0.3));
            border: 3px solid rgba(66, 133, 244, 0.6);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(15px);
            animation: pulse 4s ease-in-out infinite;
            opacity: 0;
        }

        .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .cloud-connection {
            position: absolute;
            background: linear-gradient(90deg, rgba(66, 133, 244, 0.4), rgba(52, 168, 83, 0.4));
            height: 2px;
            animation: pulse-line 3s ease-in-out infinite;
            opacity: 0;
        }

        @keyframes pulse-line {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
        }

        .connection-1 {
            top: 75px;
            left: 50%;
            width: 100px;
            transform: translateX(-50%) rotate(45deg);
            transform-origin: left center;
        }

        .connection-2 {
            top: 50%;
            left: 125px;
            width: 150px;
            transform: translateY(-50%);
        }

        .connection-3 {
            top: 50%;
            right: 125px;
            width: 150px;
            transform: translateY(-50%);
        }

        .connection-4 {
            bottom: 75px;
            left: 50%;
            width: 100px;
            transform: translateX(-50%) rotate(-45deg);
            transform-origin: left center;
        }

        .pricing-section {
            background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 50%, #0a0a0a 100%);
            padding: 120px 0;
            position: relative;
            overflow: hidden;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
            color: #ffffff;
        }

        .pricing-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at 25% 20%, rgba(255, 215, 0, 0.06) 0%, transparent 50%),
                        radial-gradient(ellipse at 75% 80%, rgba(255, 165, 0, 0.04) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
            pointer-events: none;
        }

        .pricing-wrapper {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
            z-index: 2;
        }

        .pricing-header {
            text-align: center;
            margin-bottom: 80px;
            opacity: 0;
            transform: translateY(40px);
        }

        .pricing-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
            border: 1px solid rgba(255, 215, 0, 0.4);
            color: #FFD700;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 2rem;
            backdrop-filter: blur(10px);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .pricing-title {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 800;
            font-size: clamp(2.5rem, 5vw, 4rem);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .pricing-subtitle {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
            max-width: 700px;
            margin: 0 auto 3rem;
            line-height: 1.6;
        }

        .billing-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 60px;
            opacity: 0;
            transform: translateY(30px);
        }

        .toggle-wrapper {
            position: relative;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 60px;
            padding: 8px;
            backdrop-filter: blur(15px);
            display: flex;
        }

        .toggle-option {
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
            color: rgba(255, 255, 255, 0.7);
        }

        .toggle-option.active {
            color: #0a0a0a;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
        }

        .save-badge {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #0a0a0a;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: bounce 2s infinite;
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
            margin-top: 60px;
        }

        .pricing-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 32px;
            padding: 40px 35px;
            backdrop-filter: blur(15px);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
            height: fit-content;
            opacity: 0;
            transform: translateY(50px);
        }

        .pricing-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .pricing-card.featured::before {
            opacity: 1;
        }

        .pricing-card:hover {
            transform: translateY(-15px);
            border-color: rgba(255, 215, 0, 0.4);
            box-shadow: 0 30px 80px rgba(255, 215, 0, 0.15);
        }

        .pricing-card.featured {
            background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 165, 0, 0.05));
            border: 2px solid rgba(255, 215, 0, 0.3);
        }

        .pricing-card.featured:hover {
            transform: translateY(-15px) scale(1.02);
        }

        .card-header {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
        }

        .popular-badge {
            position: absolute;
            top: -15px;
            right: -15px;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #0a0a0a;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: pulse 2s infinite;
        }

        .plan-name {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            color: #ffffff;
            margin-bottom: 12px;
        }

        .plan-price {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 800;
            font-size: 3rem;
            background: linear-gradient(135deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
            line-height: 1;
        }

        .plan-period {
            color: rgba(255, 255, 255, 0.6);
            font-size: 1rem;
            font-weight: 500;
        }

        .plan-features {
            list-style: none;
            margin: 30px 0 40px 0;
            padding: 0;
        }

        .plan-features li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.95rem;
            line-height: 1.5;
            opacity: 0;
            transform: translateX(-20px);
        }

        .animate-slideInLeft {
            animation: slideInLeft 0.5s ease-out forwards;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .plan-features li:nth-child(1) { animation-delay: 0.2s; }
        .plan-features li:nth-child(2) { animation-delay: 0.3s; }
        .plan-features li:nth-child(3) { animation-delay: 0.4s; }
        .plan-features li:nth-child(4) { animation-delay: 0.5s; }
        .plan-features li:nth-child(5) { animation-delay: 0.6s; }
        .plan-features li:nth-child(6) { animation-delay: 0.7s; }
        .plan-features li:nth-child(7) { animation-delay: 0.8s; }
        .plan-features li:nth-child(8) { animation-delay: 0.9s; }
        .plan-features li:nth-child(9) { animation-delay: 1.0s; }
        .plan-features li:nth-child(10) { animation-delay: 1.1s; }
        .plan-features li:nth-child(11) { animation-delay: 1.2s; }
        .plan-features li:nth-child(12) { animation-delay: 1.3s; }

        .plan-features li::before {
            content: '✨';
            font-size: 1rem;
            margin-top: 2px;
            flex-shrink: 0;
        }

        .plan-cta {
            width: 100%;
            padding: 16px 24px;
            border: none;
            border-radius: 16px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0;
            transform: translateY(20px);
        }

        .plan-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.6s ease;
        }

        .plan-cta:hover::before {
            left: 100%;
        }

        .cta-primary {
            background: linear-gradient(135deg, #FFD700, #FFA500);
            color: #0a0a0a;
            box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
        }

        .cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(255, 215, 0, 0.5);
        }

        .cta-secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #ffffff;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 215, 0, 0.6);
            transform: translateY(-2px);
        }

        .cta-vip {
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.8), rgba(75, 0, 130, 0.8));
            color: #ffffff;
            border: 2px solid rgba(138, 43, 226, 0.6);
            box-shadow: 0 8px 30px rgba(138, 43, 226, 0.3);
        }

        .cta-vip:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 40px rgba(138, 43, 226, 0.4);
            border-color: rgba(138, 43, 226, 0.8);
        }

        .vip-card {
            background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.05));
            border: 2px solid rgba(138, 43, 226, 0.3);
        }

        .vip-card .plan-name {
            background: linear-gradient(135deg, #DA70D6, #9370DB);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .exclusive-badge {
            background: linear-gradient(135deg, #DA70D6, #9370DB);
            color: #ffffff;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1rem;
            display: inline-block;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .lumora-nav-links {
                display: none;
            }
            
            .lumora-hero {
                padding: 40px 0 80px 0;
            }
            
            .lumora-hero-main {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 40px;
                min-height: auto;
            }
            
            .lumora-hero-actions {
                flex-direction: column;
                align-items: stretch;
                gap: 1.5rem;
            }
            
            .lumora-btn {
                justify-content: center;
            }

            .lumora-hero-visual {
                height: 350px;
                order: -1;
            }

            .lumora-tech-orbit {
                width: 280px;
                height: 280px;
            }

            .lumora-orbit-1 {
                width: 180px;
                height: 180px;
            }

            .lumora-orbit-2 {
                width: 260px;
                height: 260px;
            }

            .lumora-tech-node {
                width: 70px;
                height: 70px;
            }

            .lumora-hero-subtitle {
                max-width: 100%;
                font-size: 1.1rem !important;
            }

            .cloud-section {
                padding: 80px 0;
            }

            .cloud-wrapper {
                padding: 0 15px;
            }

            .cloud-grid {
                grid-template-columns: 1fr;
                gap: 30px;
                margin-top: 60px;
            }

            .cloud-stats {
                grid-template-columns: repeat(2, 1fr);
                gap: 30px;
                margin-top: 60px;
                padding: 40px 20px;
            }

            .cloud-network {
                width: 300px;
                height: 200px;
            }

            .cloud-node {
                width: 60px;
                height: 60px;
            }

            .cloud-center {
                width: 80px;
                height: 80px;
            }

            .cloud-architecture-visual {
                height: 250px;
            }

            .pricing-section {
                padding: 80px 0;
            }

            .pricing-wrapper {
                padding: 0 15px;
            }

            .pricing-grid {
                grid-template-columns: 1fr;
                gap: 30px;
            }

            .pricing-card.featured {
                transform: none;
            }

            .billing-toggle {
                flex-direction: column;
                gap: 1rem;
            }

            .popular-badge {
                position: static;
                margin-bottom: 1rem;
            }

            .plan-price {
                font-size: 2.5rem;
            }
        }

        @media (max-width: 480px) {
            .lumora-wrapper {
                padding: 0 15px;
            }
            
            .lumora-hero {
                padding: 20px 0 60px 0;
            }
            
            .lumora-hero-content {
                padding: 20px 0;
            }

            .lumora-tech-orbit {
                width: 200px;
                height: 200px;
            }

            .lumora-orbit-1 {
                width: 120px;
                height: 120px;
            }

            .lumora-orbit-2 {
                width: 180px;
                height: 180px;
            }

            .lumora-tech-node {
                width: 50px;
                height: 50px;
            }

            .lumora-hero-badge {
                padding: 0.6rem 1.5rem;
                font-size: 0.8rem !important;
            }

            .lumora-btn {
                padding: 1rem 2rem;
                font-size: 0.9rem;
            }

            .lumora-whatsapp-btn {
                width: 60px;
                height: 60px;
            }

            .lumora-whatsapp-icon {
                width: 26px;
                height: 26px;
            }

            .cloud-stats {
                grid-template-columns: 1fr;
            }

            .pricing-card {
                padding: 30px 25px;
            }

            .plan-price {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="lumora-container">
        <header class="lumora-header">
            <nav class="lumora-nav">
                <div class="lumora-logo">Lumora</div>
                <ul class="lumora-nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#cloud">Cloud</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="https://wa.me/19546360200" target="_blank" aria-label="Contact us via WhatsApp">Contact</a></li>
                </ul>
            </nav>
        </header>

        <section class="lumora-hero">
            <div class="lumora-wrapper">
                <div class="lumora-hero-main">
                    <div class="lumora-hero-content">
                        <div class="lumora-hero-badge">AI-Powered Website Creation</div>
                        <h1 class="lumora-hero-title">Professional Websites.<br>Zero Complexity.</h1>
                        <p class="lumora-hero-subtitle">Transform your business with AI-generated websites hosted on enterprise-grade Google Cloud infrastructure. Professional results in minutes, not months.</p>
                        <div class="lumora-hero-actions">
                            <a href="#pricing" class="lumora-btn lumora-btn-primary">Start Your Project</a>
                            <a href="https://calendly.com/bylumora-info/30min" class="lumora-btn lumora-btn-secondary" target="_blank">Schedule Consultation</a>
                        </div>
                    </div>
                    <div class="lumora-hero-visual">
                        <div class="lumora-tech-orbit">
                            <div class="lumora-center-glow"></div>
                            <div class="lumora-orbit-ring lumora-orbit-1">
                                <div class="lumora-tech-node lumora-node-google">
                                    <img src="https://bylumora.com/wp-content/uploads/2025/08/google-cloud-image.jpg" alt="Google Cloud">
                                </div>
                            </div>
                            <div class="lumora-orbit-ring lumora-orbit-2">
                                <div class="lumora-tech-node lumora-node-wordpress">
                                    <img src="https://bylumora.com/wp-content/uploads/2025/08/Wordpress-Logo.png" alt="WordPress">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cloud-section" id="cloud">
            <div class="cloud-wrapper">
                <div class="cloud-header">
                    <div class="cloud-badge">Powered by Google Cloud</div>
                    <h2 class="cloud-title">Enterprise-Grade Infrastructure</h2>
                    <p class="cloud-subtitle">Your websites are built on Google's global network, ensuring lightning-fast performance, unbreakable security, and 99.9% uptime guarantee.</p>
                </div>
                <div class="cloud-grid">
                    <div class="cloud-card">
                        <div class="cloud-card-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                            </svg>
                        </div>
                        <h3 class="cloud-card-title">Advanced Security</h3>
                        <p class="cloud-card-description">Multi-layered security protocols, SSL certificates, and DDoS protection keep your website safe from threats 24/7.</p>
                    </div>
                    <div class="cloud-card">
                        <div class="cloud-card-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0013 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/>
                            </svg>
                        </div>
                        <h3 class="cloud-card-title">Lightning Performance</h3>
                        <p class="cloud-card-description">Global CDN distribution ensures your website loads in under 2 seconds anywhere in the world, boosting SEO and user experience.</p>
                    </div>
                    <div class="cloud-card">
                        <div class="cloud-card-icon">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83L9.17 10.7C9.06 11.13 9 11.57 9 12c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.43 0-.87.06-1.3.17L7.17 5.64C8.51 4.62 10.18 4 12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
                            </svg>
                        </div>
                        <h3 class="cloud-card-title">99.9% Uptime</h3>
                        <p class="cloud-card-description">Built on Google's reliable infrastructure with automatic failover and redundant systems ensuring your site never goes down.</p>
                    </div>
                </div>
                <div class="cloud-stats">
                    <div class="cloud-stat">
                        <span class="cloud-stat-number">99.9%</span>
                        <span class="cloud-stat-label">Uptime SLA</span>
                    </div>
                    <div class="cloud-stat">
                        <span class="cloud-stat-number">&lt;2s</span>
                        <span class="cloud-stat-label">Load Time</span>
                    </div>
                    <div class="cloud-stat">
                        <span class="cloud-stat-number">200+</span>
                        <span class="cloud-stat-label">Global Locations</span>
                    </div>
                    <div class="cloud-stat">
                        <span class="cloud-stat-number">24/7</span>
                        <span class="cloud-stat-label">Monitoring</span>
                    </div>
                </div>
                <div class="cloud-architecture">
                    <h3 class="cloud-title" style="font-size: 2rem; margin-bottom: 1rem;">Global Network Architecture</h3>
                    <p class="cloud-subtitle" style="margin-bottom: 0;">Your website distributed across Google's worldwide infrastructure</p>
                    <div class="cloud-architecture-visual">
                        <div class="cloud-network">
                            <div class="cloud-connection connection-1"></div>
                            <div class="cloud-connection connection-2"></div>
                            <div class="cloud-connection connection-3"></div>
                            <div class="cloud-connection connection-4"></div>
                            <div class="cloud-node">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#4285F4" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" fill="#4285F4"/>
                                </svg>
                            </div>
                            <div class="cloud-node">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#34A853" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" fill="#34A853"/>
                                </svg>
                            </div>
                            <div class="cloud-node">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#FBBC05" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" fill="#FBBC05"/>
                                </svg>
                            </div>
                            <div class="cloud-node">
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#EA4335" stroke-width="2"/>
                                    <circle cx="12" cy="12" r="3" fill="#EA4335"/>
                                </svg>
                            </div>
                            <div class="cloud-center">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" opacity="0.8"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Greeting and Info Section -->
<section class="dashboard-intro" style="background:#0a0a0a; color:#fff; padding:80px 20px; text-align:center; font-family:'Inter',sans-serif;">
  <div class="lumora-wrapper">
    
    
    <div style="max-width:900px; margin:0 auto; text-align:left; background:rgba(255,255,255,0.05); border-radius:20px; padding:40px; border:1px solid rgba(255,255,255,0.1);">
      <h2 style="font-family:'Space Grotesk',sans-serif; font-size:2rem; margin-bottom:1rem;">🚀 Stop losing clients when you can have an AI that answers every call.</h2>
      <p style="font-size:1.1rem; color:rgba(255,255,255,0.8); margin-bottom:2rem; line-height:1.6;">
        Whether you run a spa, clinic, or service business — our Voice Agent books appointments,
        answers questions, and follows up automatically. No missed calls. No lost sales.
        Just more clients, 24/7.
      </p>

      <div style="display:flex; align-items:center; gap:2rem; flex-wrap:wrap;">
        <a href="#" class="lumora-btn lumora-btn-primary" style="text-decoration:none;">
          🎯 Book a call and see how it works in real time
        </a>
        <img src="https://bylumora.com/wp-content/uploads/2025/05/abstract-meeting-widescreen.webp" alt="AI Voice Agent Dashboard Preview"
             style="border-radius:16px; max-width:100%; height:auto; border:1px solid rgba(255,255,255,0.1);">
      </div>
    </div>
  </div>
</section>


        <section class="pricing-section" id="pricing">
            <div class="pricing-wrapper">
                <div class="pricing-header">
                    <div class="pricing-badge">Premium Hosting Plans</div>
                    <h2 class="pricing-title">Choose Your Hosting Plan</h2>
                    <p class="pricing-subtitle">Power your AI-crafted website with our premium hosting solutions. Switch to <strong>annual billing</strong> and save up to 60%! Fast, secure, and scalable.</p>
                </div>
                <div class="billing-toggle">
                    <div class="toggle-wrapper">
                        <div class="toggle-option active">Monthly</div>
                        <div class="toggle-option">Annual</div>
                    </div>
                </div>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <div class="card-header">
                            <div class="limited-offer-badge" style="display: none; position: absolute; top: -20px; right: -20px; background: linear-gradient(135deg, #FFD700, #FFA500); color: #0a0a0a; padding: 8px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; animation: pulse 2s infinite;">Limited 60% Off!</div>
                            <h3 class="plan-name">Strong Hosting</h3>
                            <div class="plan-price">$50</div>
                            <div class="plan-period">/mo</div>
                        </div>
                        <ul class="plan-features">
                            <li>Speed & performance optimization</li>
                            <li>Secure premium servers optimized for WordPress</li>
                            <li>Standard optimization + JavaScript Delay</li>
                            <li>Basic Global CDN & free SSL certificate</li>
                            <li>Daily backups & 24/7 uptime monitoring</li>
                            <li>Advanced malware protection & enhanced security</li>
                            <li>1 website per plan</li>
                            <li>Free domain with annual subscription</li>
                            <li>99.9% uptime guarantee</li>
                            <li>Basic maintenance (plugin updates included)</li>
                        </ul>
                        <a href="https://wa.me/19546360200?text=Hi! I'm interested in the Strong Hosting plan ($50/mo). Can you help me get started?" class="plan-cta cta-secondary" target="_blank">Choose Strong</a>
                    </div>
                    <div class="pricing-card featured">
                        <div class="popular-badge">Most Popular</div>
                        <div class="card-header">
                            <h3 class="plan-name">Extreme Hosting</h3>
                            <div class="plan-price">$100</div>
                            <div class="plan-period">/mo</div>
                        </div>
                        <ul class="plan-features">
                            <li>Everything in Strong Hosting</li>
                            <li>Premium Global CDN with 330+ edge locations</li>
                            <li>Up to 50% faster load times worldwide</li>
                            <li>Argo Smart Routing for traffic optimization</li>
                            <li>Advanced DDoS protection</li>
                            <li>Web Application Firewall security</li>
                            <li>Performance-focused maintenance</li>
                            <li>Visual adjustments & brand alignment</li>
                            <li>Free domain with any subscription</li>
                            <li>1 website per plan</li>
                            <li>99.9% uptime guarantee</li>
                        </ul>
                        <a href="https://wa.me/19546360200?text=Hi! I'm interested in the Extreme Hosting plan ($100/mo). Can you tell me more about the features?" class="plan-cta cta-primary" target="_blank">Choose Extreme</a>
                    </div>
                    <div class="pricing-card vip-card">
                        <div class="card-header">
                            <div class="exclusive-badge">Exclusive</div>
                            <h3 class="plan-name">VIP Hosting</h3>
                            <div class="plan-price" style="background: linear-gradient(135deg, #DA70D6, #9370DB); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; font-size: 2rem;">Text Us</div>
                        </div>
                        <ul class="plan-features">
                            <li>Everything in Extreme Hosting</li>
                            <li>Enterprise-level Global CDN</li>
                            <li>Advanced caching technology</li>
                            <li>Unlimited edge locations worldwide</li>
                            <li>Maximum performance tuning</li>
                            <li>AI-driven uptime & performance monitoring</li>
                            <li>Dedicated account manager</li>
                            <li>Priority support channel</li>
                            <li>Extended maintenance (content & layout updates)</li>
                            <li>Free domain with any subscription</li>
                            <li>1 website per plan</li>
                            <li>99.99% uptime guarantee</li>
                        </ul>
                        <a href="https://wa.me/19546360200?text=Hi! I'm interested in the VIP Hosting plan. Can you provide more details about the exclusive features and pricing?" class="plan-cta cta-vip" target="_blank">Text Us</a>
                    </div>
                </div>
            </div>
        </section>

        <div class="lumora-whatsapp-widget">
            <a href="https://wa.me/19546360200" class="lumora-whatsapp-btn" target="_blank" title="Chat on WhatsApp">
                <svg class="lumora-whatsapp-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.868-2.031-.967-.273-.099-.471-.148-.669.149-.198.297-.768.967-.942 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.501-.173-.001-.372-.05-.571-.05-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.099-.297-.347-.595-.495z" fill="white"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.559 4.139 1.535 5.905L0 24l6.274-1.645A11.966 11.966 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.927 18.152c-.305.611-1.01 1.082-1.671 1.229-.509.113-1.185.141-1.891-.118-.916-.33-1.84-.898-2.627-1.611-2.208-1.998-3.604-4.496-3.822-4.874-.218-.378-1.743-2.496-1.743-4.748 0-1.948.868-2.906 1.213-3.096.305-.168.669-.189.891-.189.223 0 .446.022.669.067.223.045.401.156.573.401.173.245.693 1.349.941 2.207.099.356.074.734-.074.982-.149.248-.297.446-.446.595-.149.149-.347.297-.545.471-.198.173-.396.372-.297.669.297.891 1.413 2.906 2.906 4.104 1.493 1.198 2.776 1.611 3.673 1.909.297.099.471-.025.669-.223.198-.198.446-.446.693-.669.248-.223.495-.297.669-.198.173.099 1.091.545 1.711.891.611.347 1.01.396 1.185.611.173.218.149.669-.156 1.082z" fill="white"/>
                </svg>
            </a>
        </div>
    </div>

    <script>
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('lumora-nav')) {
                        entry.target.classList.add('animate-slideInDown');
                    } else if (entry.target.classList.contains('lumora-hero-badge') ||
                               entry.target.classList.contains('lumora-hero-title') ||
                               entry.target.classList.contains('lumora-hero-subtitle') ||
                               entry.target.classList.contains('lumora-hero-actions') ||
                               entry.target.classList.contains('cloud-header') ||
                               entry.target.classList.contains('cloud-stats') ||
                               entry.target.classList.contains('cloud-architecture') ||
                               entry.target.classList.contains('pricing-header') ||
                               entry.target.classList.contains('billing-toggle') ||
                               entry.target.classList.contains('plan-cta')) {
                        entry.target.classList.add('animate-fadeInUp');
                    } else if (entry.target.classList.contains('lumora-hero-visual')) {
                        entry.target.classList.add('animate-slideInRight');
                    } else if (entry.target.classList.contains('cloud-card') ||
                               entry.target.classList.contains('pricing-card')) {
                        entry.target.classList.add('animate-slideInUp');
                    } else if (entry.target.classList.contains('cloud-node') ||
                               entry.target.classList.contains('cloud-center') ||
                               entry.target.classList.contains('cloud-connection')) {
                        entry.target.classList.add('animate-fadeIn');
                    } else if (entry.target.classList.contains('plan-features')) {
                        entry.target.querySelectorAll('li').forEach((li, index) => {
                            setTimeout(() => {
                                li.classList.add('animate-slideInLeft');
                            }, index * 100);
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.lumora-nav, .lumora-hero-badge, .lumora-hero-title, .lumora-hero-subtitle, .lumora-hero-actions, .lumora-hero-visual, .cloud-header, .cloud-card, .cloud-stats, .cloud-architecture, .cloud-node, .cloud-center, .cloud-connection, .pricing-header, .billing-toggle, .pricing-card, .plan-features, .plan-cta').forEach(el => {
            observer.observe(el);
        });

        const toggleOptions = document.querySelectorAll('.toggle-option');
        const priceElements = document.querySelectorAll('.plan-price');
        const periodElements = document.querySelectorAll('.plan-period');
        const limitedOfferBadge = document.querySelector('.limited-offer-badge');
        
        const monthlyPrices = ['$50', '$100'];
        const annualPrices = ['$20', '$80'];
        const annualTotal = ['$240', '$960'];
        
        toggleOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                toggleOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                if (option.textContent === 'Annual') {
                    priceElements[0].textContent = annualPrices[0];
                    priceElements[1].textContent = annualPrices[1];
                    periodElements[0].textContent = '/mo (billed annually at ' + annualTotal[0] + ')';
                    periodElements[1].textContent = '/mo (billed annually at ' + annualTotal[1] + ')';
                    
                    // Show the Limited 60% Off badge for Strong Hosting
                    if (limitedOfferBadge) {
                        limitedOfferBadge.style.display = 'block';
                    }
                } else {
                    priceElements[0].textContent = monthlyPrices[0];
                    priceElements[1].textContent = monthlyPrices[1];
                    periodElements[0].textContent = '/mo';
                    periodElements[1].textContent = '/mo';
                    
                    // Hide the Limited 60% Off badge for monthly
                    if (limitedOfferBadge) {
                        limitedOfferBadge.style.display = 'none';
                    }
                }
            });
        });

        const cards = document.querySelectorAll('.pricing-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = card.classList.contains('featured') ? 
                    'translateY(-15px) scale(1.02)' : 'translateY(-15px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
            });
        });
    </script>
</body>
</html>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default LumoraEmbed;